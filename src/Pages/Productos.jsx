import { useEffect, useState } from 'react';
import {
  fetchWithFallback,
  getCartStepForUnit,
  getDefaultQtyForUnit,
  getDisplayPriceForUnit,
  getProductUnitMeta,
  getUnitShortLabel,
  normalizeCartUnit,
} from '../data/mockData';
import '../styles/Productos.css';

const esUnidadEntera = (u) => {
  const n = normalizeCartUnit(u);
  return n === 'unidad' || n === 'atado' || n === 'planta' || n === 'dientes';
};

function Productos({ onAddProduct }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [ofertas, setOfertas] = useState([]);
  const [detallesPedidos, setDetallesPedidos] = useState([]);
  const [unidadesElegidas, setUnidadesElegidas] = useState({});
  const [cantidades, setCantidades] = useState({});

  const getUnidadActual = (producto) => {
    if (unidadesElegidas[producto.id]) return unidadesElegidas[producto.id];
    return getProductUnitMeta(producto).unidadDefault;
  };

  const getQtyString = (producto) => {
    const u = getUnidadActual(producto);
    if (cantidades[producto.id] !== undefined) {
      return String(cantidades[producto.id]);
    }
    return String(getDefaultQtyForUnit(u, producto.id));
  };

  const getNumericQty = (producto) => {
    const u = getUnidadActual(producto);
    const def = getDefaultQtyForUnit(u, producto.id);
    const raw = cantidades[producto.id];
    const parsed = parseFloat(String(raw ?? def).replace(',', '.'));
    if (Number.isNaN(parsed) || parsed <= 0) return def;
    return esUnidadEntera(u) ? Math.max(1, Math.round(parsed)) : parsed;
  };

  const handleSelectUnidad = (producto, nuevaUnidad) => {
    setUnidadesElegidas((prev) => ({ ...prev, [producto.id]: nuevaUnidad }));
    setCantidades((prev) => ({
      ...prev,
      [producto.id]: String(getDefaultQtyForUnit(nuevaUnidad, producto.id)),
    }));
  };

  const handleStepQty = (producto, direction) => {
    const u = getUnidadActual(producto);
    const current = getNumericQty(producto);
    const step = getCartStepForUnit(u, current);
    const minVal =
      u === 'kg' ? 0.25 : u === 'gramos' ? 50 : 1;
    const nextRaw = current + direction * step;
    const next = esUnidadEntera(u)
      ? Math.max(minVal, Math.round(nextRaw))
      : Math.max(minVal, Number(nextRaw.toFixed(2)));
    setCantidades((prev) => ({ ...prev, [producto.id]: String(next) }));
  };

  const handleQtyKeyDown = (e, unidad) => {
    const blocked = esUnidadEntera(unidad)
      ? ['-', '+', '.', ',', 'e', 'E']
      : ['-', '+', 'e', 'E'];
    if (blocked.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleQtyChange = (producto, value) => {
    const u = getUnidadActual(producto);
    const normalized = value.replace(',', '.');
    if (normalized === '') {
      setCantidades((prev) => ({ ...prev, [producto.id]: '' }));
      return;
    }
    const regex = esUnidadEntera(u) ? /^\d*$/ : /^\d*\.?\d*$/;
    if (!regex.test(normalized)) {
      return;
    }
    const maxLimit = u === 'gramos' ? 10000 : 100;
    const num = parseFloat(normalized);
    if (!Number.isNaN(num) && num > maxLimit) {
      setCantidades((prev) => ({ ...prev, [producto.id]: String(maxLimit) }));
      return;
    }
    setCantidades((prev) => ({ ...prev, [producto.id]: normalized }));
  };

  const handleQtyBlur = (producto) => {
    const num = getNumericQty(producto);
    setCantidades((prev) => ({
      ...prev,
      [producto.id]: String(Number(num.toFixed(2))),
    }));
  };

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const [datosProductos, datosOfertas, datosDetalles] = await Promise.all([
          fetchWithFallback('/productos', 'productos'),
          fetchWithFallback('/Oferta', 'Oferta'),
          fetchWithFallback('/pedidoDetalle', 'pedidoDetalle'),
        ]);

        setProductos(datosProductos);
        setOfertas(datosOfertas);
        setDetallesPedidos(datosDetalles);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  const coincideTexto = (producto) => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return true;
    return (
      producto.nombre.toLowerCase().includes(texto) ||
      producto.categoria.toLowerCase().includes(texto) ||
      producto.descripcion.toLowerCase().includes(texto)
    );
  };

  const productosFiltrados = productos.filter((producto) => {
    if (!coincideTexto(producto)) return false;

    const coincideCategoria =
      categoriaActiva === 'todos' ||
      (categoriaActiva === 'fruta' &&
        producto.categoria.toLowerCase() === 'frutas') ||
      (categoriaActiva === 'verdura' &&
        producto.categoria.toLowerCase() === 'verduras') ||
      (categoriaActiva === 'promocion' &&
        ofertas.some(
          (oferta) =>
            Number(oferta.IdProducto) === Number(producto.id) &&
            oferta.Estado === 'Activa' &&
            Number(oferta.Porcentaje) > 0
        ));

    return coincideCategoria;
  });

  const productosMasVendidos = [...productos]
    .filter(coincideTexto)
    .sort((a, b) => {
      const cantidadA = detallesPedidos
        .filter((detalle) => Number(detalle.idProducto) === Number(a.id))
        .reduce((total, detalle) => total + Number(detalle.cantidad), 0);

      const cantidadB = detallesPedidos
        .filter((detalle) => Number(detalle.idProducto) === Number(b.id))
        .reduce((total, detalle) => total + Number(detalle.cantidad), 0);

      return cantidadB - cantidadA;
    });

  const listaVisible =
    categoriaActiva === 'vendido' ? productosMasVendidos : productosFiltrados;

  return (
    <div className="productos-page">
      <div className="productos-container">
        <section className="titulo-productos">
          <h1>Nuestros productos</h1>
          <p>{listaVisible.length} productos disponibles</p>
        </section>

        <section className="filtros">
          <div className="buscador">
            <input
              type="text"
              id="buscador"
              placeholder="Buscar frutas y verduras..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="categorias">
            <button
              type="button"
              className={`filtro ${categoriaActiva === 'todos' ? 'activo' : ''}`}
              onClick={() => setCategoriaActiva('todos')}
            >
              Todos
            </button>

            <button
              type="button"
              className={`filtro ${categoriaActiva === 'fruta' ? 'activo' : ''}`}
              onClick={() => setCategoriaActiva('fruta')}
            >
              Frutas
            </button>

            <button
              type="button"
              className={`filtro ${categoriaActiva === 'verdura' ? 'activo' : ''}`}
              onClick={() => setCategoriaActiva('verdura')}
            >
              Verduras
            </button>

            <button
              type="button"
              className={`filtro ${categoriaActiva === 'promocion' ? 'activo' : ''}`}
              onClick={() => setCategoriaActiva('promocion')}
            >
              Promociones
            </button>

            <button
              type="button"
              className={`filtro ${categoriaActiva === 'vendido' ? 'activo' : ''}`}
              onClick={() => setCategoriaActiva('vendido')}
            >
              Más vendidos
            </button>
          </div>
        </section>

        <section className="productos-grid">
          {cargando ? (
            <p>Cargando productos...</p>
          ) : listaVisible.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', color: '#64748b' }}>
              No se encontraron productos para tu búsqueda.
            </p>
          ) : (
            listaVisible.map((producto) => {
              const oferta = ofertas.find(
                (o) =>
                  Number(o.IdProducto) === Number(producto.id) &&
                  o.Estado === 'Activa' &&
                  Number(o.Porcentaje) > 0
              );

              const porcentajeDto = oferta ? Number(oferta.Porcentaje) : 0;
              const meta = getProductUnitMeta(producto);
              const unidadActual = getUnidadActual(producto);
              const priceInfo = getDisplayPriceForUnit(
                producto,
                unidadActual,
                porcentajeDto
              );

              return (
                <div className="producto-card" key={producto.id}>
                  {oferta && (
                    <span className="etiqueta etiqueta-oferta">
                      -{porcentajeDto}% EN OFERTA
                    </span>
                  )}
                  <img
                    className="producto-imagen"
                    src={producto.imagen}
                    alt={producto.nombre}
                  />

                  <div className="producto-info">
                    <div className="producto-top-meta">
                      <p className="producto-categoria">{producto.categoria}</p>
                      {meta.unidadesDisponibles.length === 1 && (
                        <span className="unidad-fija-tag">
                          Por {meta.unidadesDisponibles[0]}
                        </span>
                      )}
                    </div>

                    <h3 className="producto-nombre">{producto.nombre}</h3>

                    <p className="producto-descripcion">
                      {producto.descripcion}
                    </p>

                    {meta.unidadesDisponibles.length > 1 && (
                      <div
                        className="unidad-selector"
                        role="group"
                        aria-label={`Unidad de medida para ${producto.nombre}`}
                      >
                        {meta.unidadesDisponibles.map((u) => (
                          <button
                            key={u}
                            type="button"
                            className={`unidad-pill ${
                              unidadActual === u ? 'activo' : ''
                            }`}
                            onClick={() => handleSelectUnidad(producto, u)}
                          >
                            {getUnitShortLabel(u)}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="producto-footer">
                      <div className="producto-precio">
                        {oferta && (
                          <p className="precio-anterior">
                            ${priceInfo.original.toLocaleString('es-AR')}
                          </p>
                        )}

                        <div className="precio-linea">
                          <p className="precio-actual">
                            ${priceInfo.actual.toLocaleString('es-AR')}
                          </p>
                          <p className="producto-unidad">
                            {priceInfo.unitSuffix}
                          </p>
                        </div>
                        {priceInfo.weightHint && (
                          <span className="producto-peso-aprox">
                            {priceInfo.weightHint}
                          </span>
                        )}
                      </div>

                      <div className="producto-acciones">
                        <div
                          className="producto-stepper"
                          aria-label={`Cantidad en ${unidadActual}`}
                        >
                          <button
                            type="button"
                            className="producto-stepper__btn"
                            onClick={() => handleStepQty(producto, -1)}
                            aria-label="Disminuir cantidad"
                          >
                            −
                          </button>
                          <input
                            type="text"
                            inputMode={
                              esUnidadEntera(unidadActual)
                                ? 'numeric'
                                : 'decimal'
                            }
                            className="producto-stepper__input"
                            value={getQtyString(producto)}
                            onKeyDown={(e) => handleQtyKeyDown(e, unidadActual)}
                            onChange={(e) =>
                              handleQtyChange(producto, e.target.value)
                            }
                            onBlur={() => handleQtyBlur(producto)}
                            aria-label={`Cantidad de ${producto.nombre}`}
                          />
                          <button
                            type="button"
                            className="producto-stepper__btn"
                            onClick={() => handleStepQty(producto, 1)}
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="btn-agregar"
                          onClick={() =>
                            onAddProduct &&
                            onAddProduct(
                              producto,
                              getNumericQty(producto),
                              unidadActual,
                              porcentajeDto
                            )
                          }
                        >
                          + Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
}

export default Productos;
