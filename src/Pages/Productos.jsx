import { useEffect, useState } from 'react';
import { fetchWithFallback } from '../data/mockData';
import '../styles/Productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [ofertas, setOfertas] = useState([]);
  const [detallesPedidos, setDetallesPedidos] = useState([]);
  
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const [datosProductos, datosOfertas, datosDetalles] = await Promise.all([
        fetchWithFallback('/productos', 'productos'),
        fetchWithFallback('/Oferta', 'Oferta'),
        fetchWithFallback('/pedidoDetalle', 'pedidoDetalle')
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

  const productosFiltrados = productos.filter((producto) => {
    const texto = busqueda.toLowerCase();
  
    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(texto) ||
      producto.categoria.toLowerCase().includes(texto) ||
      producto.descripcion.toLowerCase().includes(texto);
  
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
  
    return coincideBusqueda && coincideCategoria;
  });
  
  const productosMasVendidos = [...productos].sort((a, b) => {
    const cantidadA = detallesPedidos
      .filter((detalle) => Number(detalle.idProducto) === Number(a.id))
      .reduce((total, detalle) => total + Number(detalle.cantidad), 0);
  
    const cantidadB = detallesPedidos
      .filter((detalle) => Number(detalle.idProducto) === Number(b.id))
      .reduce((total, detalle) => total + Number(detalle.cantidad), 0);
  
    return cantidadB - cantidadA;
  });

  return (
    <main className="productos-page">
      <div className="productos-container">

        <section className="titulo-productos">
          <h1>Nuestros productos</h1>
          <p>{productosFiltrados.length} productos disponibles</p>
        </section>

        <section className="filtros">
          <div className="buscador">
            <input
              type="text"
              id="buscador"
              placeholder="Buscar frutas y verduras..."
              value={busqueda}
              onChange={(e)=> setBusqueda(e.target.value)}
            />
          </div>

          <div className="categorias">
            <button
              className={`filtro ${categoriaActiva === 'todos' ? 'activo' : ''}`}
              onClick={() => setCategoriaActiva('todos')}
            >
              Todos
            </button>

            <button
              className={`filtro ${categoriaActiva === 'fruta' ? 'activo' : ''}`}
              onClick={() => setCategoriaActiva('fruta')}
            >
              Frutas
            </button>

            <button
              className={`filtro ${categoriaActiva === 'verdura' ? 'activo' : ''}`}
              onClick={() => setCategoriaActiva('verdura')}
            >
              Verduras
            </button>

            <button
              className={`filtro ${categoriaActiva === 'promocion' ? 'activo' : ''}`}
              onClick={() => setCategoriaActiva('promocion')}
            >
              Promociones
            </button>

            <button
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
          ) : (
            (categoriaActiva==='vendido' ? productosMasVendidos : productosFiltrados).map((producto) => {
              const oferta = ofertas.find(
                (oferta) =>
                  Number(oferta.IdProducto) === Number(producto.id) &&
                  oferta.Estado === 'Activa' &&
                  Number(oferta.Porcentaje) > 0
              );
            
              const precioOriginal = Number(producto.precioPorPeso);
            
              const precioDescuento = oferta
                ? precioOriginal * (1 - Number(oferta.Porcentaje) / 100)
                : precioOriginal;
              return(
                <div className="producto-card" key={producto.id}>
                {oferta && (
                <span className="etiqueta etiqueta-oferta">
                  EN OFERTA
                </span>
              )}
                <img
                  className="producto-imagen"
                  src={producto.imagen}
                  alt={producto.nombre}
                />

                <div className="producto-info">
                  <p className="producto-categoria">
                    {producto.categoria}
                  </p>

                  <h3 className="producto-nombre">
                    {producto.nombre}
                  </h3>

                  <p className="producto-descripcion">
                    {producto.descripcion}
                  </p>

                  <div className="producto-footer">
                  <div className="producto-precio">
                    {oferta && (
                      <p className="precio-anterior">
                        ${precioOriginal.toLocaleString('es-AR')}
                      </p>
                    )}

                    <p className="precio-actual">
                      ${precioDescuento.toLocaleString('es-AR')}
                    </p>

                    <p className="producto-unidad">/kg</p>
                  </div>

                    <button className="btn-agregar">
                      + Agregar
                    </button>
                  </div>
                </div>

              </div>
              )
              
            })
          )}
        </section>

      </div>
    </main>
  );
}

export default Productos;