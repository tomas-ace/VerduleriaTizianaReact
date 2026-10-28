import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginModal from './components/LoginModal/LoginModal';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Recetas from './pages/Recetas';
import Pedidos from './pages/Pedidos';
import Contacto from './pages/Contacto';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <BrowserRouter>
      <Header onOpenLogin={() => setIsLoginOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </BrowserRouter>
  );
}

export default App;
