import { useEffect, useState } from 'react';
import { fetchWithFallback } from '../data/mockData';
import '../styles/Pedidos.css';

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 2
  }).format(precio);
};


function Pedidos({ onOpenLogin, usuarioId }) {
  const [pedidos, setPedidos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    if (usuarioId === null) {
      setPedidos([]);
      setDetalles([]);
      setCargando(false);
      return;
    }
  
    const cargarPedidos = async () => {
  
      setCargando(true);
  
      try {
  
        const [pedidosObtenidos, detallesObtenidos] = await Promise.all([
  
          fetchWithFallback('/pedidos', 'pedidos'),
  
          fetchWithFallback('/pedidoDetalle', 'pedidoDetalle')
  
        ]);
  
        setPedidos(pedidosObtenidos);
        setDetalles(detallesObtenidos);
  
      } catch (error) {
  
        console.error('Error al cargar los pedidos:', error);
  
      } finally {
  
        setCargando(false);
  
      }
    };
  
    cargarPedidos();
  
  }, [usuarioId]);

  const pedidosUsuario = pedidos.filter(
    pedido => pedido.idUsuario === usuarioId
  );
  const detallesPedido = detalles.filter(
    detalle => detalle.idPedido === pedidos.nroPedido
  );

  const precioTotal = detallesPedido.reduce(
    (total, detalle) => total + detalle.precio * detalle.cantidad,
    0
  );
  return (
    <div className="pedidos-page">
    <section className="container-registered">

      <h1>Mis Pedidos</h1>

      <p>Consultá tu historial de compras</p>

      <p className="order-number">
        {pedidosUsuario.length} pedidos realizados
      </p>

      {cargando ? (

        <p>Cargando pedidos...</p>

      ) : pedidosUsuario.length === 0 ? (

        <p>Todavía no tenés pedidos realizados.</p>

      ) : (

        <ul id="orders-list">

          {pedidosUsuario.map((pedido) => {

            const detallesPedido = detalles.filter(
              detalle => detalle.idPedido === pedido.nroPedido
            );

            const cantidad = detallesPedido.length;

            const precioTotal = detallesPedido.reduce(
              (total, detalle) =>
                total + detalle.precio * detalle.cantidad,
              0
            );

            const claseEstado =
              pedido.estado === 'Preparando' ? 'preparando' :
              pedido.estado === 'En Camino' ? 'en-camino' :
              pedido.estado === 'Entregado' ? 'entregado' : '';

            return (

              <li className="pedido" key={pedido.nroPedido}>

                <section className="pedido-info">

                  <div className="top-info">

                    <p>Pedido #{pedido.nroPedido}</p>

                    <p className={claseEstado}>
                      {pedido.estado}
                    </p>

                  </div>

                  <div className="lower-info">

                    <p>{formatearFecha(pedido.fecha)}</p>

                    <p>{cantidad} productos</p>

                  </div>

                </section>

                <section className="detalle-pedido">

                  <p className="precio">
                    {formatearPrecio(precioTotal)}
                  </p>

                  <span className="detalle">
                    Ver detalle
                  </span>

                </section>

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
