import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginModal from './components/LoginModal/LoginModal';
import ModalPrepararCompra from './components/ModalPrepararCompra/ModalPrepararCompra';
import Home from './Pages/home';
import Productos from './Pages/Productos';
import Recetas from './Pages/Recetas';
import RecetaDetalle from './Pages/RecetaDetalle';
import Pedidos from './Pages/Pedidos';
import Contacto from './Pages/Contacto';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [recetaModal, setRecetaModal] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('carrito_tiziana');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('carrito_tiziana', JSON.stringify(cartItems));
    } catch {
      // ignore storage errors
    }
  }, [cartItems]);

  const handleAddRecipeToCart = (ingredientsToAdd, receta, personas) => {
    setCartItems((prev) => {
      const updated = [...prev];
      ingredientsToAdd.forEach((item) => {
        const existingIndex = updated.findIndex(
          (c) =>
            c.idProducto === item.idProducto && c.unidad === item.unidad
        );
        if (existingIndex >= 0) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            cantidadEscalada: Number(
              (
                updated[existingIndex].cantidadEscalada + item.cantidadEscalada
              ).toFixed(2)
            ),
            price: updated[existingIndex].price + item.price,
          };
        } else {
          updated.push({ ...item });
        }
      });
      return updated;
    });

    setToastMsg(
      `¡Se agregaron ${ingredientsToAdd.length} ingredientes de "${receta.title}" (${personas} pers.) al carrito!`
    );
    setTimeout(() => {
      setToastMsg('');
    }, 3500);
  };

  return (
    <BrowserRouter>
      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        cartCount={cartItems.length}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home onOpenRecipeModal={setRecetaModal} />}
          />
          <Route path="/productos" element={<Productos />} />
          <Route
            path="/recetas"
            element={<Recetas onOpenRecipeModal={setRecetaModal} />}
          />
          <Route
            path="/recetas/:id"
            element={<RecetaDetalle onAddToCart={handleAddRecipeToCart} />}
          />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <ModalPrepararCompra
        receta={recetaModal}
        onClose={() => setRecetaModal(null)}
        onAddToCart={handleAddRecipeToCart}
      />

      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#1b5e20',
            color: '#ffffff',
            padding: '14px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            fontWeight: 600,
            fontSize: '0.95rem',
            zIndex: 1200,
          }}
        >
          ✅ {toastMsg}
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
