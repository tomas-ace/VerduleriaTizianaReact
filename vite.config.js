import fs from 'node:fs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const dbFileUrl = new URL('./db.json', import.meta.url);

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function dbJsonApiPlugin() {
  let queue = Promise.resolve();

  return {
    name: 'tiziana-db-json-api',
    configureServer(server) {
      server.middlewares.use('/db-api', (req, res) => {
        const handleRequest = async () => {
          const parsedUrl = new URL(req.url || '/', 'http://localhost');
          const segments = parsedUrl.pathname.split('/').filter(Boolean);
          const collection = segments[0];
          const itemId = segments[1];

          if (!collection) {
            const db = JSON.parse(fs.readFileSync(dbFileUrl, 'utf8'));
            sendJson(res, 200, db);
            return;
          }

          const db = JSON.parse(fs.readFileSync(dbFileUrl, 'utf8'));
          if (!Array.isArray(db[collection])) {
            sendJson(res, 404, { error: `Colección "${collection}" no encontrada` });
            return;
          }

          if (req.method === 'GET') {
            if (itemId !== undefined) {
              const found = db[collection].find(
                (item) => String(item.id) === String(itemId)
              );
              if (!found) {
                sendJson(res, 404, { error: 'Registro no encontrado' });
                return;
              }
              sendJson(res, 200, found);
              return;
            }

            let list = [...db[collection]];
            for (const [key, value] of parsedUrl.searchParams.entries()) {
              if (key === '_limit') continue;
              list = list.filter((item) => String(item?.[key]) === String(value));
            }
            const limitParam = parsedUrl.searchParams.get('_limit');
            if (limitParam) {
              const limitNum = Number(limitParam);
              if (limitNum > 0) {
                list = list.slice(0, limitNum);
              }
            }
            sendJson(res, 200, list);
            return;
          }

          if (req.method === 'POST') {
            const body = await readJsonBody(req);
            const list = db[collection];
            let nextId = body.id;
            if (nextId === undefined || nextId === null) {
              const maxId = list.reduce(
                (max, item) => Math.max(max, Number(item.id) || 0),
                0
              );
              nextId = maxId + 1;
            }
            const nuevoRegistro = { id: nextId, ...body };
            list.push(nuevoRegistro);
            fs.writeFileSync(dbFileUrl, `${JSON.stringify(db, null, 2)}\n`, 'utf8');
            sendJson(res, 201, nuevoRegistro);
            return;
          }

          if (req.method === 'PATCH' || req.method === 'PUT') {
            if (itemId === undefined) {
              sendJson(res, 400, { error: 'Falta el ID del registro' });
              return;
            }
            const body = await readJsonBody(req);
            const idx = db[collection].findIndex(
              (item) => String(item.id) === String(itemId)
            );
            if (idx === -1) {
              sendJson(res, 404, { error: 'Registro no encontrado' });
              return;
            }
            db[collection][idx] = {
              ...db[collection][idx],
              ...body,
              id: db[collection][idx].id,
            };
            fs.writeFileSync(dbFileUrl, `${JSON.stringify(db, null, 2)}\n`, 'utf8');
            sendJson(res, 200, db[collection][idx]);
            return;
          }

          if (req.method === 'DELETE') {
            if (itemId === undefined) {
              sendJson(res, 400, { error: 'Falta el ID del registro' });
              return;
            }
            const idx = db[collection].findIndex(
              (item) => String(item.id) === String(itemId)
            );
            if (idx === -1) {
              sendJson(res, 404, { error: 'Registro no encontrado' });
              return;
            }
            const [eliminado] = db[collection].splice(idx, 1);
            if (collection === 'usuarios' && Array.isArray(db.usuarioDireccion)) {
              db.usuarioDireccion = db.usuarioDireccion.filter(
                (dir) => Number(dir.idUsuario) !== Number(itemId)
              );
            }
            if (collection === 'usuarios' && Array.isArray(db.recetasFavoritas)) {
              db.recetasFavoritas = db.recetasFavoritas.filter(
                (fav) => Number(fav.idUsuario) !== Number(itemId)
              );
            }
            fs.writeFileSync(dbFileUrl, `${JSON.stringify(db, null, 2)}\n`, 'utf8');
            sendJson(res, 200, eliminado || { ok: true });
            return;
          }

          sendJson(res, 405, { error: 'Método no soportado' });
        };

        queue = queue
          .then(handleRequest)
          .catch((err) => {
            sendJson(res, 500, { error: String(err?.message || err) });
          });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dbJsonApiPlugin()],
  server: {
    watch: {
      ignored: ['**/db.json'],
    },
  },
});
