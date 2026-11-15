import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  eliminarUsuario,
  fetchWithFallback,
  patchWithFallback,
} from '../data/mockData.js';
import '../styles/Perfil.css';

function Perfil({ usuarioId, onLogout }) {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(usuarioId !== null);

  const [editando, setEditando] = useState(false);
  const [cambiandoPassword, setCambiandoPassword] = useState(false);

  const [mail, setMail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const [nuevaPassword, setNuevaPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  useEffect(() => {
    if (usuarioId === null) {
      return;
    }

    let activo = true;

    const cargarUsuario = async () => {
      try {
        const usuarios = await fetchWithFallback('/usuarios', 'usuarios');
        if (!activo) return;

        const usuarioEncontrado = usuarios.find(
          (u) => Number(u.id) === Number(usuarioId)
        );

        if (usuarioEncontrado) {
          setUsuario(usuarioEncontrado);
          setMail(usuarioEncontrado.mail || '');
          setTelefono(usuarioEncontrado.telefono || '');
          setDireccion(usuarioEncontrado.direccion || '');
        } else {
          setUsuario(null);
        }
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
      } finally {
        if (activo) setCargando(false);
      }
    };

    cargarUsuario();

    return () => {
      activo = false;
    };
  }, [usuarioId]);

  const handleLogout = () => {
    const confirmar = window.confirm(
      '¿Estás seguro de que querés cerrar sesión?'
    );

    if (confirmar) {
      onLogout();
      navigate('/');
    }
  };

  const handleEliminarCuenta = async () => {
    const confirmar = window.confirm(
      '¿Estás seguro de que querés eliminar tu cuenta permanentemente? Esta acción eliminará tu usuario de db.json y no se puede deshacer.'
    );

    if (!confirmar) return;

    try {
      await eliminarUsuario(usuarioId);
      onLogout('Tu cuenta fue eliminada correctamente.');
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
      alert('Ocurrió un error al eliminar la cuenta.');
    }
  };

  const handleEditarPerfil = async (e) => {
    e.preventDefault();

    if (!mail.trim() || !telefono.trim() || !direccion.trim()) {
      alert('Completá todos los campos.');
      return;
    }

    const confirmar = window.confirm(
      '¿Estás seguro de que querés guardar los cambios de tu perfil?'
    );

    if (!confirmar) return;

    try {
      const usuarioActualizado = await patchWithFallback(
        '/usuarios',
        'usuarios',
        usuarioId,
        {
          mail,
          telefono,
          direccion,
        }
      );

      setUsuario(usuarioActualizado);
      setEditando(false);
      alert('¡Los datos del perfil se actualizaron correctamente!');
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al actualizar el perfil.');
    }
  };

  const handleCambiarPassword = async (e) => {
    e.preventDefault();

    if (!nuevaPassword.trim() || !repetirPassword.trim()) {
      alert('Completá ambos campos.');
      return;
    }

    if (nuevaPassword !== repetirPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const confirmar = window.confirm(
      '¿Estás seguro de que querés cambiar tu contraseña?'
    );

    if (!confirmar) return;

    try {
      const usuarioActualizado = await patchWithFallback(
        '/usuarios',
        'usuarios',
        usuarioId,
        {
          contrasena: nuevaPassword,
        }
      );

      setUsuario(usuarioActualizado);
      setNuevaPassword('');
      setRepetirPassword('');
      setCambiandoPassword(false);
      alert('¡La contraseña se cambió correctamente!');
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al cambiar la contraseña.');
    }
  };

  if (cargando) {
    return <p>Cargando perfil...</p>;
  }

  if (!usuario) {
    return <p>No se encontraron los datos del usuario.</p>;
  }

  return (
    <div className="perfil-container">
      <h1>Mi perfil</h1>

      <section className="perfil-card">
        <section className="perfil-header">
          <div className="perfil-usuario">
            <div className="avatar">
              {usuario.nombre.charAt(0).toUpperCase()}
            </div>

            <div className="usuario-info">
              <h2>{usuario.nombre}</h2>
              <p>{usuario.mail}</p>
            </div>
          </div>

          <button
            className="btn-editar"
            type="button"
            onClick={() => {
              setMail(usuario.mail || '');
              setTelefono(usuario.telefono || '');
              setDireccion(usuario.direccion || '');
              setEditando(!editando);
              setCambiandoPassword(false);
            }}
          >
            {editando ? 'Cancelar edición' : 'Editar perfil'}
          </button>
          <button
          className="cambiar-pass"
          type="button"
          onClick={() => {
            setCambiandoPassword(!cambiandoPassword);
            setEditando(false);
          }}
        >
            {cambiandoPassword ? 'Cancelar' : 'Cambiar contraseña'}
          </button>

          <button
            className="btn-logout"
            type="button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </section>

        <section className="datos-perfil">
          <div className="dato">
            <p className="dato-titulo">NOMBRE COMPLETO</p>
            <div className="dato-valor">
              {usuario.nombre} {usuario.apellido}
            </div>
          </div>

          <div className="dato">
            <p className="dato-titulo">CORREO ELECTRÓNICO</p>
            <div className="dato-valor">{usuario.mail}</div>
          </div>

          <div className="dato">
            <p className="dato-titulo">DIRECCIÓN DE ENTREGA</p>
            <div className="dato-valor">
              {usuario.direccion || 'No registrada'}
            </div>
          </div>

          <div className="dato">
            <p className="dato-titulo">TELÉFONO</p>
            <div className="dato-valor">{usuario.telefono}</div>
          </div>
        </section>

        {editando && (
          <form className="form-perfil" onSubmit={handleEditarPerfil}>
            <h3>Editar datos personales</h3>

            <label>Correo electrónico</label>
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />

            <label>Dirección de entrega</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />

            <label>Teléfono</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />

            <button type="submit" className="btn-guardar">
              Guardar cambios
            </button>
          </form>
        )}
      


      {cambiandoPassword && (
        <form className="form-perfil" onSubmit={handleCambiarPassword}>
          <h3>Cambiar contraseña</h3>

          <label>Nueva contraseña</label>
          <input
            type="password"
            value={nuevaPassword}
            onChange={(e) => setNuevaPassword(e.target.value)}
            required
          />

          <label>Repetir nueva contraseña</label>
          <input
            type="password"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-guardar">
            Confirmar cambio
          </button>
        </form>
      )}

        <div className="perfil-danger-zone">
          <div className="perfil-danger-info">
            <strong>Zona de peligro</strong>
            <p>Eliminá tu usuario de forma permanente de la base de datos.</p>
          </div>
          <button
            type="button"
            className="btn-eliminar-cuenta"
            onClick={handleEliminarCuenta}
          >
            Eliminar cuenta
          </button>
        </div>
      </section>
    </div>
  );
}

export default Perfil;