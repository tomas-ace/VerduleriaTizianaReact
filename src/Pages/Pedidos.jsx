import { useEffect, useState } from 'react';
import { fetchWithFallback, fallbackData } from '../data/mockData';
import '../styles/Pedidos.css';

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio);
};

function Pedidos({ onOpenLogin, usuarioId, ordersVersion = 0, onRepeatOrder }) {
  const [pedidos, setPedidos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [productos, setProductos] = useState(fallbackData.productos);
  const [cargando, setCargando] = useState(true);
  const [pedidoAbierto, setPedidoAbierto] = useState(null);

  useEffect(() => {
    if (usuarioId === null) {
      return;
    }

    let activo = true;
    const cargarPedidos = async () => {
      setCargando(true);
      try {
        const [pedidosObtenidos, detallesObtenidos, productosObtenidos] =
          await Promise.all([
            fetchWithFallback('/pedidos', 'pedidos'),
            fetchWithFallback('/pedidoDetalle', 'pedidoDetalle'),
            fetchWithFallback('/productos', 'productos'),
          ]);

        if (!activo) return;
        setPedidos(pedidosObtenidos || []);
        setDetalles(detallesObtenidos || []);
        if (productosObtenidos && productosObtenidos.length > 0) {
          setProductos(productosObtenidos);
        }
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
      } finally {
        if (activo) setCargando(false);
      }
    };

    cargarPedidos();
    return () => {
      activo = false;
    };
  }, [usuarioId, ordersVersion]);

  if (usuarioId === null) {
    return (
      <div className="pedidos-page">
        <section className="container-unregistered">
          <div className="icon-conteiner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
              <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
            </svg>
          </div>
          <h1>Iniciá sesión para ver tus pedidos</h1>
          <p>Accedé a tu historial completo de compras y seguí tus envíos</p>
          <button
            type="button"
            className="btn-ingresar-pedidos"
            onClick={onOpenLogin}
          >
            Ingresar
          </button>
        </section>
      </div>
    );
  }

  const pedidosUsuario = pedidos
    .filter((pedido) => Number(pedido.idUsuario) === Number(usuarioId))
    .sort((a, b) => Number(b.nroPedido) - Number(a.nroPedido));

  const toggleDetalle = (nroPedido) => {
    setPedidoAbierto((prev) => (prev === nroPedido ? null : nroPedido));
  };

  return (
    <div className="pedidos-page">
      <section className="container-registered">
        <h1>Mis Pedidos</h1>
        <p>Consultá tu historial de compras</p>
        <p className="order-number">
          {pedidosUsuario.length}{' '}
          {pedidosUsuario.length === 1
            ? 'pedido realizado'
            : 'pedidos realizados'}
        </p>

        {cargando ? (
          <p>Cargando pedidos...</p>
        ) : pedidosUsuario.length === 0 ? (
          <p>Todavía no tenés pedidos realizados.</p>
        ) : (
          <ul id="orders-list">
            {pedidosUsuario.map((pedido) => {
              const detallesPedido = detalles.filter(
                (detalle) => Number(detalle.idPedido) === Number(pedido.nroPedido)
              );

              const cantidad = detallesPedido.length;

              const precioTotal =
                pedido.total !== undefined
                  ? Number(pedido.total)
                  : detallesPedido.reduce(
                      (total, detalle) =>
                        total +
                        (detalle.subtotal !== undefined
                          ? Number(detalle.subtotal)
                          : Number(detalle.precio) * Number(detalle.cantidad)),
                      0
                    );

              const claseEstado =
                pedido.estado === 'Preparando'
                  ? 'preparando'
                  : pedido.estado === 'En Camino'
                    ? 'en-camino'
                    : pedido.estado === 'Entregado'
                      ? 'entregado'
                      : '';

              const abierto = pedidoAbierto === pedido.nroPedido;

              return (
                <li
                  className={`pedido-wrapper ${abierto ? 'abierto' : ''}`}
                  key={pedido.nroPedido}
                >
                  <div className="pedido">
                    <section className="pedido-info">
                      <div className="top-info">
                        <p>Pedido #{pedido.nroPedido}</p>
                        <p className={claseEstado}>{pedido.estado}</p>
                      </div>

                      <div className="lower-info">
                        <p>{formatearFecha(pedido.fecha)}</p>
                        <p>
                          {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
                        </p>
                        {pedido.metodoPago && <p>• {pedido.metodoPago}</p>}
                      </div>
                    </section>

                    <section className="detalle-pedido">
                      <p className="precio">{formatearPrecio(precioTotal)}</p>
                      <button
                        type="button"
                        className="detalle"
                        onClick={() => toggleDetalle(pedido.nroPedido)}
                      >
                        {abierto ? 'Ocultar detalle ▲' : 'Ver detalle ▼'}
                      </button>
                    </section>
                  </div>

                  {abierto && (
                    <div className="pedido-desplegable">
                      {(pedido.direccion || pedido.tipoEntrega || pedido.notas) && (
                        <div className="pedido-meta-extra">
                          {pedido.tipoEntrega && (
                            <span>
                              <strong>Entrega:</strong> {pedido.tipoEntrega}
                            </span>
                          )}
                          {pedido.direccion && (
                            <span>
                              <strong>Dirección:</strong> {pedido.direccion}
                            </span>
                          )}
                          {pedido.notas && (
                            <span>
                              <strong>Notas:</strong> {pedido.notas}
                            </span>
                          )}
                        </div>
                      )}

                      <ul className="pedido-items-list">
                        {detallesPedido.map((det, idx) => {
                          const prod = productos.find(
                            (p) => Number(p.id) === Number(det.idProducto)
                          );
                          const nombreProd =
                            det.nombre || prod?.nombre || `Producto #${det.idProducto}`;
                          const imgProd =
                            det.imagen ||
                            prod?.imagen ||
                            '/assets/productos-img/generico-verduras.png';
                          const qtyTexto =
                            det.displayQty || `${det.cantidad} ${det.unidad || 'kg'}`;
                          const lineaPrecio =
                            det.subtotal !== undefined
                              ? Number(det.subtotal)
                              : Number(det.precio) * Number(det.cantidad);

                          return (
                            <li
                              className="pedido-item-row"
                              key={`${det.idPedido}-${det.idProducto}-${idx}`}
                            >
                              <div className="pedido-item-left">
                                <img src={imgProd} alt={nombreProd} />
                                <div>
                                  <strong>{nombreProd}</strong>
                                  <span>{qtyTexto}</span>
                                </div>
                              </div>
                              <span className="pedido-item-subtotal">
                                {formatearPrecio(lineaPrecio)}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      {onRepeatOrder && detallesPedido.length > 0 && (
                        <div className="pedido-desplegable-footer">
                          <button
                            type="button"
                            className="btn-repetir-pedido"
                            onClick={() =>
                              onRepeatOrder(detallesPedido, pedido.nroPedido)
                            }
                          >
                            + Volver a pedir estos productos
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Pedidos;
