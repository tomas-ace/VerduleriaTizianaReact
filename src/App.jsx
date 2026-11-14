import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginModal from './components/LoginModal/LoginModal';
import ModalPrepararCompra from './components/ModalPrepararCompra/ModalPrepararCompra';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Home from './Pages/home';
import Productos from './Pages/Productos';
import Recetas from './Pages/Recetas';
import RecetaDetalle from './Pages/RecetaDetalle';
import Pedidos from './Pages/Pedidos';
import Contacto from './Pages/Contacto';
import {
  buildCartItem,
  convertCartItemUnit,
  fallbackData,
  fetchWithFallback,
  mergeIntoCart,
  normalizeCartUnit,
  updateCartItemQuantity,
} from './data/mockData';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [usuarioActual, setUsuarioActual] = useState(() => {
    const id = sessionStorage.getItem('idUsuario');
    return id ? Number(id) : null;
  });
  const [usuarioObj, setUsuarioObj] = useState(null);
  const [ordersVersion, setOrdersVersion] = useState(0);

  const [productosCatalogo, setProductosCatalogo] = useState(
    fallbackData.productos
  );
  const [ofertasCatalogo, setOfertasCatalogo] = useState(fallbackData.Oferta);

  const [recetaModal, setRecetaModal] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const toastTimerRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastMsg('');
    }, 4000);
  };

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('carrito_tiziana');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((item) =>
        buildCartItem({
          idProducto: item.idProducto,
          nombre: item.nombre,
          imagen: item.imagen,
          categoria: item.categoria,
          cantidad: item.cantidadEscalada ?? item.cantidad ?? 1,
          unidad: item.unidad || 'kg',
          precioPorPeso: item.precioPorPeso,
          discountPct: item.discountPct,
        })
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetchWithFallback('/productos', 'productos').then((prods) => {
      if (prods && prods.length > 0) setProductosCatalogo(prods);
    });
    fetchWithFallback('/Oferta', 'Oferta').then((ofs) => {
      if (ofs && ofs.length > 0) setOfertasCatalogo(ofs);
    });
  }, []);

  useEffect(() => {
    if (usuarioActual === null) {
      return;
    }
    let activo = true;
    fetchWithFallback('/usuarios', 'usuarios').then((usuarios) => {
      if (!activo) return;
      const encontrado = (usuarios || []).find(
        (u) => Number(u.id) === Number(usuarioActual)
      );
      setUsuarioObj(encontrado || { id: usuarioActual, nombre: 'Cliente' });
    });
    return () => {
      activo = false;
    };
  }, [usuarioActual]);

  const usuarioActivo = usuarioActual === null ? null : usuarioObj;

  useEffect(() => {
    try {
      localStorage.setItem('carrito_tiziana', JSON.stringify(cartItems));
    } catch {
      // ignore storage errors
    }
  }, [cartItems]);

  const handleAddRecipeToCart = (ingredientsToAdd, receta, personas) => {
    setCartItems((prev) => {
      let updated = [...prev];
      ingredientsToAdd.forEach((item) => {
        updated = mergeIntoCart(
          updated,
          item,
          productosCatalogo,
          ofertasCatalogo
        );
      });
      return updated;
    });

    const totalSaved = ingredientsToAdd.reduce(
      (acc, item) => acc + (item.savedAmount || 0),
      0
    );
    const savingsText =
      totalSaved > 0 ? ` — 🔥 ¡Ahorraste $${totalSaved} con ofertas del día!` : '';

    showToast(
      `¡Se agregaron ${ingredientsToAdd.length} ingredientes de "${receta.title}" (${personas} pers.) al carrito!${savingsText}`
    );
  };

  const handleAddProductToCart = (
    product,
    qty,
    unidad = 'kg',
    discountPct
  ) => {
    const cleanQty = Number(Number(qty).toFixed(2));
    if (!cleanQty || cleanQty <= 0) return;

    const preview = buildCartItem({
      idProducto: product.id,
      nombre: product.nombre,
      imagen: product.imagen,
      categoria: product.categoria,
      cantidad: cleanQty,
      unidad,
      precioPorPeso: product.precioPorPeso,
      discountPct,
      productos: productosCatalogo,
      ofertas: ofertasCatalogo,
    });

    setCartItems((prev) =>
      mergeIntoCart(
        prev,
        {
          idProducto: product.id,
          nombre: product.nombre,
          imagen: product.imagen,
          categoria: product.categoria,
          cantidadEscalada: cleanQty,
          unidad,
          precioPorPeso: product.precioPorPeso,
          discountPct,
        },
        productosCatalogo,
        ofertasCatalogo
      )
    );

    const weightNote = preview.approxWeightLabel
      ? ` (${preview.approxWeightLabel})`
      : '';
    showToast(
      `¡Se agregó ${preview.displayQty}${weightNote} de "${product.nombre}" ($${preview.price.toLocaleString('es-AR')}) al carrito!`
    );
  };

  const handleChangeCartUnit = (idProducto, fromUnidad, toUnidad) => {
    setCartItems((prev) =>
      convertCartItemUnit(
        prev,
        idProducto,
        fromUnidad,
        toUnidad,
        productosCatalogo,
        ofertasCatalogo
      )
    );
  };

  const handleUpdateCartQty = (idProducto, unidad, newQty) => {
    setCartItems((prev) =>
      updateCartItemQuantity(
        prev,
        idProducto,
        unidad,
        newQty,
        productosCatalogo,
        ofertasCatalogo
      )
    );
  };

  const handleRemoveCartItem = (idProducto, unidad) => {
    const normUnit = normalizeCartUnit(unidad);
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            Number(item.idProducto) === Number(idProducto) &&
            normalizeCartUnit(item.unidad) === normUnit
          )
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleRepeatOrder = (detallesPedido, nroPedido) => {
    setCartItems((prev) => {
      let updated = [...prev];
      detallesPedido.forEach((det) => {
        updated = mergeIntoCart(
          updated,
          {
            idProducto: det.idProducto,
            nombre: det.nombre,
            imagen: det.imagen,
            cantidadEscalada: det.cantidad,
            unidad: det.unidad || 'kg',
          },
          productosCatalogo,
          ofertasCatalogo
        );
      });
      return updated;
    });
    setIsCartOpen(true);
    showToast(`¡Se cargaron los productos del Pedido #${nroPedido} en tu carrito!`);
  };

  const handleOrderConfirmed = (nuevoPedido) => {
    setCartItems([]);
    setOrdersVersion((v) => v + 1);
    showToast(`¡Pedido #${nuevoPedido.nroPedido} confirmado con éxito!`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('idUsuario');
    setUsuarioActual(null);
    setUsuarioObj(null);
    showToast('Cerraste sesión correctamente.');
  };

  return (
    <BrowserRouter>
      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        usuario={usuarioActivo}
        onLogout={handleLogout}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onOpenRecipeModal={setRecetaModal}
                onAddProduct={handleAddProductToCart}
              />
            }
          />
          <Route
            path="/productos"
            element={<Productos onAddProduct={handleAddProductToCart} />}
          />
          <Route
            path="/recetas"
            element={<Recetas onOpenRecipeModal={setRecetaModal} />}
          />
          <Route
            path="/recetas/:id"
            element={<RecetaDetalle onAddToCart={handleAddRecipeToCart} />}
          />
          <Route
            path="/pedidos"
            element={
              <Pedidos
                onOpenLogin={() => setIsLoginOpen(true)}
                usuarioId={usuarioActual}
                ordersVersion={ordersVersion}
                onRepeatOrder={handleRepeatOrder}
              />
            }
          />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onChangeUnit={handleChangeCartUnit}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        usuario={usuarioActivo}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOrderConfirmed={handleOrderConfirmed}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(usuario) => {
          setUsuarioActual(usuario.id);
          setUsuarioObj(usuario);
        }}
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
            padding: '12px 18px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.22)',
            fontWeight: 600,
            fontSize: '0.9rem',
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: 'calc(100vw - 32px)',
          }}
        >
          <span>✅ {toastMsg}</span>
          {cartItems.length > 0 && !isCartOpen && (
            <button
              type="button"
              onClick={() => {
                setToastMsg('');
                setIsCartOpen(true);
              }}
              style={{
                background: '#ffffff',
                color: '#1b5e20',
                border: 'none',
                borderRadius: '999px',
                padding: '5px 12px',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Ver carrito ({cartItems.length})
            </button>
          )}
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
