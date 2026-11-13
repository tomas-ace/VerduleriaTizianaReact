import { useEffect, useState } from 'react';
import { fetchWithFallback } from '../data/mockData';
import '../styles/Productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await fetchWithFallback('/productos', 'productos');
        setProductos(datos);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  return (
    <main className="productos-page">
      <div className="productos-container">

        <section className="titulo-productos">
          <h1>Nuestros productos</h1>
          <p>{productos.length} productos disponibles</p>
        </section>

        <section className="filtros">
          <div className="buscador">
            <input
              type="text"
              id="buscador"
              placeholder="Buscar frutas y verduras..."
            />
          </div>

          <div className="categorias">
            <button className="filtro activo">Todos</button>
            <button className="filtro">Frutas</button>
            <button className="filtro">Verduras</button>
            <button className="filtro">Promociones</button>
            <button className="filtro">Más vendidos</button>
          </div>
        </section>

        <section className="productos-grid">
          {cargando ? (
            <p>Cargando productos...</p>
          ) : (
            productos.map((producto) => (
              <div className="producto-card" key={producto.id}>

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
                      <p className="precio-actual">
                        ${producto.precioPorPeso}
                      </p>
                      <p className="producto-unidad">/kg</p>
                    </div>

                    <button className="btn-agregar">
                      + Agregar
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </section>

      </div>
    </main>
  );
}

export default Productos;