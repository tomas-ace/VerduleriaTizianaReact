import { useEffect, useState } from 'react';
import { fetchWithFallback } from '../data/mockData';
import '../styles/Pedidos.css';

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


  return (
    <section style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{usuarioId}</h1>
      <p>pedidos {pedidos.length}</p>
      <pre>{JSON.stringify(pedidos, null, 2)}</pre>
      <p>detalles {detalles.length}</p>	
      <pre>{JSON.stringify(detalles, null, 2)}</pre>
    </section>
  );
}

export default Pedidos;
