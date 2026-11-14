import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  crearPedidoDesdeCarrito,
  formatCartDisplayQty,
  getApproxWeightLabel,
  getCartStepForUnit,
  getProductUnitMeta,
  getUnitShortLabel,
  normalizeCartUnit,
} from '../../data/mockData';
import '../../styles/CartDrawer.css';

const formatearMoneda = (monto) =>
  `$${Math.round(Number(monto) || 0).toLocaleString('es-AR')}`;

function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onChangeUnit,
  onRemoveItem,
  onClearCart,
  usuario,
  onOpenLogin,
  onOrderConfirmed,
}) {
  const navigate = useNavigate();

  const [tipoEntrega, setTipoEntrega] = useState('delivery');
  const [metodoPago, setMetodoPago] = useState('Mercado Pago');
  const [direccion, setDireccion] = useState(() => {
    try {
      const saved = localStorage.getItem('direccion_entrega_tiziana');
      return saved !== null ? saved : null;
    } catch {
      return null;
    }
  });
  const [notas, setNotas] = useState('');
  const [errorDireccion, setErrorDireccion] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);

  const direccionEfectiva =
    direccion !== null ? direccion : usuario?.direccion || '';

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotalOriginal = cartItems.reduce(
    (acc, item) =>
      acc + (Number(item.originalPrice) || Number(item.price) || 0),
    0
  );
  const totalPagar = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0),
    0
  );
  const totalSaved = Math.max(0, subtotalOriginal - totalPagar);

  const handleDireccionChange = (val) => {
    setDireccion(val);
    if (errorDireccion) setErrorDireccion('');
    try {
      localStorage.setItem('direccion_entrega_tiziana', val);
    } catch {
      // ignore
    }
  };

  const handleStep = (item, direction) => {
    const unit = normalizeCartUnit(item.unidad);
    const current = Number(item.cantidadEscalada) || 0;
    const step = getCartStepForUnit(unit, current);
    const next = Number((current + direction * step).toFixed(2));
    onUpdateQty(item.idProducto, unit, next);
  };

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0 || enviando) return;

    if (!usuario) {
      onOpenLogin();
      return;
    }

    if (tipoEntrega === 'delivery' && !direccionEfectiva.trim()) {
      setErrorDireccion('Ingresá tu dirección de entrega para continuar.');
      return;
    }

    setErrorDireccion('');
    setEnviando(true);
    try {
      const resultado = await crearPedidoDesdeCarrito({
        usuarioId: usuario.id,
        cartItems,
        metodoPago,
        tipoEntrega,
        direccion: direccionEfectiva,
        notas,
      });
      setPedidoConfirmado(resultado.pedido);
      setNotas('');
      if (onOrderConfirmed) {
        onOrderConfirmed(resultado.pedido);
      }
    } finally {
      setEnviando(false);
    }
  };

  const handleGoToDestination = (path) => {
    setPedidoConfirmado(null);
    onClose();
    navigate(path);
  };

  return (
    <div
      className="cart-drawer-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <header className="cart-drawer__header">
          <div className="cart-drawer__title-group">
            <span className="cart-drawer__icon-circle" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </span>
            <div>
              <h2 className="cart-drawer__title">Mi Carrito</h2>
              <span className="cart-drawer__subtitle">
                {cartItems.length}{' '}
                {cartItems.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
              </span>
            </div>
          </div>

          <div className="cart-drawer__header-actions">
            {cartItems.length > 0 && (
              <button
                type="button"
                className="cart-drawer__clear-btn"
                onClick={onClearCart}
                title="Vaciar todo el carrito"
              >
                Vaciar
              </button>
            )}
            <button
              type="button"
              className="cart-drawer__close-btn"
              onClick={onClose}
              aria-label="Cerrar carrito"
            >
              ✕
            </button>
          </div>
        </header>

        {/* Body */}
        {pedidoConfirmado && cartItems.length === 0 ? (
          <div className="cart-drawer__success">
            <div className="cart-drawer__success-badge">✓</div>
            <h3>¡Pedido #{pedidoConfirmado.nroPedido} confirmado!</h3>
            <p className="cart-drawer__success-lead">
              Ya estamos preparando tus frutas y verduras frescas.
            </p>

            <div className="cart-drawer__success-card">
              <div className="cart-drawer__success-row">
                <span>Estado</span>
                <span className="cart-drawer__status-pill">
                  {pedidoConfirmado.estado}
                </span>
              </div>
              <div className="cart-drawer__success-row">
                <span>Entrega</span>
                <strong>
                  {pedidoConfirmado.tipoEntrega === 'Retiro en local'
                    ? 'Retiro en local'
                    : '30 - 60 min'}
                </strong>
              </div>
              <div className="cart-drawer__success-row">
                <span>Dirección</span>
                <strong>{pedidoConfirmado.direccion}</strong>
              </div>
              <div className="cart-drawer__success-row">
                <span>Pago</span>
                <strong>{pedidoConfirmado.metodoPago}</strong>
              </div>
              <div className="cart-drawer__success-row cart-drawer__success-row--total">
                <span>Total</span>
                <strong>{formatearMoneda(pedidoConfirmado.total)}</strong>
              </div>
            </div>

            <div className="cart-drawer__success-actions">
              <button
                type="button"
                className="cart-drawer__confirm-btn"
                onClick={() => handleGoToDestination('/pedidos')}
              >
                Ver estado en Mis Pedidos
              </button>
              <button
                type="button"
                className="cart-drawer__secondary-btn"
                onClick={() => {
                  setPedidoConfirmado(null);
                  onClose();
                }}
              >
                Seguir comprando
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="cart-drawer__empty">
            <div className="cart-drawer__empty-icon" aria-hidden="true">
              🛒
            </div>
            <h3>Tu carrito está vacío</h3>
            <p>
              Sumá frutas y verduras por kilo o elegí una receta y calculamos
              las cantidades exactas para tu mesa.
            </p>
            <div className="cart-drawer__empty-actions">
              <button
                type="button"
                className="cart-drawer__confirm-btn"
                onClick={() => handleGoToDestination('/productos')}
              >
                Comprar productos
              </button>
              <button
                type="button"
                className="cart-drawer__secondary-btn"
                onClick={() => handleGoToDestination('/recetas')}
              >
                Explorar recetas
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="cart-drawer__body">
              <ul className="cart-drawer__list">
                {cartItems.map((item) => {
                  const unit = normalizeCartUnit(item.unidad);
                  const qtyLabel = formatCartDisplayQty(
                    item.cantidadEscalada,
                    unit
                  );
                  const approxWeight =
                    item.approxWeightLabel ??
                    getApproxWeightLabel(
                      item.cantidadEscalada,
                      unit,
                      item.idProducto
                    );
                  const metaUnits = getProductUnitMeta(
                    item.idProducto
                  ).unidadesDisponibles;
                  const availableUnits = Array.isArray(item.unidadesDisponibles)
                    ? item.unidadesDisponibles
                    : metaUnits.includes(unit)
                      ? metaUnits
                      : [unit, ...metaUnits];
                  const hasDiscount =
                    Number(item.originalPrice) > Number(item.price);

                  return (
                    <li
                      key={`${item.idProducto}-${unit}`}
                      className="cart-item"
                    >
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="cart-item__img"
                      />

                      <div className="cart-item__content">
                        <div className="cart-item__top">
                          <div className="cart-item__name-wrap">
                            <span className="cart-item__name">
                              {item.nombre}
                            </span>
                            {item.discountPct > 0 && (
                              <span className="cart-item__offer-pill">
                                -{item.discountPct}%
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            className="cart-item__remove"
                            onClick={() => onRemoveItem(item.idProducto, unit)}
                            aria-label={`Eliminar ${item.nombre} del carrito`}
                            title="Quitar producto"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                          </button>
                        </div>

                        {availableUnits.length > 1 && onChangeUnit && (
                          <div
                            className="cart-item__unit-row"
                            role="group"
                            aria-label={`Unidad de medida para ${item.nombre}`}
                          >
                            <span className="cart-item__unit-label">Medida:</span>
                            <div className="cart-item__unit-pills">
                              {availableUnits.map((u) => {
                                const normU = normalizeCartUnit(u);
                                const isActive = normU === unit;
                                return (
                                  <button
                                    key={normU}
                                    type="button"
                                    className={`cart-item__unit-pill ${
                                      isActive ? 'active' : ''
                                    }`}
                                    onClick={() =>
                                      !isActive &&
                                      onChangeUnit(item.idProducto, unit, normU)
                                    }
                                  >
                                    {getUnitShortLabel(normU)}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div className="cart-item__bottom">
                          <div className="cart-item__qty-group">
                            <div className="cart-item__stepper">
                              <button
                                type="button"
                                className="cart-item__step-btn"
                                onClick={() => handleStep(item, -1)}
                                aria-label={`Disminuir cantidad de ${item.nombre}`}
                              >
                                −
                              </button>
                              <span className="cart-item__qty">{qtyLabel}</span>
                              <button
                                type="button"
                                className="cart-item__step-btn"
                                onClick={() => handleStep(item, 1)}
                                aria-label={`Aumentar cantidad de ${item.nombre}`}
                              >
                                +
                              </button>
                            </div>
                            {approxWeight && (
                              <span className="cart-item__approx-weight">
                                {approxWeight}
                              </span>
                            )}
                          </div>

                          <div className="cart-item__prices">
                            {hasDiscount && (
                              <del className="cart-item__price-old">
                                {formatearMoneda(item.originalPrice)}
                              </del>
                            )}
                            <span className="cart-item__price">
                              {formatearMoneda(item.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Checkout Configuration */}
              <div className="cart-checkout-box">
                <h3 className="cart-checkout-box__heading">
                  Entrega y medio de pago
                </h3>

                <div className="cart-toggle-group" role="radiogroup" aria-label="Tipo de entrega">
                  <button
                    type="button"
                    className={`cart-toggle-pill ${
                      tipoEntrega === 'delivery' ? 'active' : ''
                    }`}
                    onClick={() => {
                      setTipoEntrega('delivery');
                      setErrorDireccion('');
                    }}
                  >
                    🚚 Envío (30-60 min)
                  </button>
                  <button
                    type="button"
                    className={`cart-toggle-pill ${
                      tipoEntrega === 'retiro' ? 'active' : ''
                    }`}
                    onClick={() => {
                      setTipoEntrega('retiro');
                      setErrorDireccion('');
                    }}
                  >
                    🏪 Retiro en local
                  </button>
                </div>

                {tipoEntrega === 'delivery' ? (
                  <div className="cart-field">
                    <label htmlFor="cart-direccion-input">
                      Dirección de entrega
                    </label>
                    <input
                      id="cart-direccion-input"
                      type="text"
                      placeholder="Ej: Av. Rivadavia 4520, Piso 3B"
                      value={direccionEfectiva}
                      onChange={(e) => handleDireccionChange(e.target.value)}
                      className={errorDireccion ? 'input-error' : ''}
                    />
                    {errorDireccion && (
                      <span className="cart-field__error">{errorDireccion}</span>
                    )}
                  </div>
                ) : (
                  <p className="cart-pickup-note">
                    📍 Retirás sin cargo en <strong>Av. Perez Galdos 8360</strong>{' '}
                    (listo en 15 min).
                  </p>
                )}

                <div className="cart-field">
                  <label>Método de pago</label>
                  <div
                    className="cart-toggle-group"
                    role="radiogroup"
                    aria-label="Método de pago"
                  >
                    <button
                      type="button"
                      className={`cart-toggle-pill ${
                        metodoPago === 'Mercado Pago' ? 'active' : ''
                      }`}
                      onClick={() => setMetodoPago('Mercado Pago')}
                    >
                      💳 Mercado Pago
                    </button>
                    <button
                      type="button"
                      className={`cart-toggle-pill ${
                        metodoPago === 'Efectivo' ? 'active' : ''
                      }`}
                      onClick={() => setMetodoPago('Efectivo')}
                    >
                      💵 Efectivo
                    </button>
                  </div>
                </div>

                <div className="cart-field">
                  <label htmlFor="cart-notas-input">
                    Aclaraciones (opcional)
                  </label>
                  <input
                    id="cart-notas-input"
                    type="text"
                    placeholder="Ej: Paltas maduras para hoy / Timbre..."
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Sticky Footer */}
            <footer className="cart-drawer__footer">
              <div className="cart-summary">
                {totalSaved > 0 && (
                  <>
                    <div className="cart-summary__row">
                      <span>Subtotal sin descuento</span>
                      <span className="cart-summary__muted">
                        {formatearMoneda(subtotalOriginal)}
                      </span>
                    </div>
                    <div className="cart-summary__row cart-summary__row--savings">
                      <span>🔥 Ahorro con ofertas</span>
                      <span>-{formatearMoneda(totalSaved)}</span>
                    </div>
                  </>
                )}
                <div className="cart-summary__row">
                  <span>Costo de envío</span>
                  <span className="cart-summary__free">¡Gratis!</span>
                </div>
                <div className="cart-summary__row cart-summary__row--total">
                  <span>Total exacto</span>
                  <span>{formatearMoneda(totalPagar)}</span>
                </div>
              </div>

              {!usuario ? (
                <div className="cart-login-callout">
                  <p>Ingresá a tu cuenta para registrar y seguir tu pedido.</p>
                  <button
                    type="button"
                    className="cart-drawer__confirm-btn"
                    onClick={onOpenLogin}
                  >
                    Iniciar sesión para confirmar ({formatearMoneda(totalPagar)})
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="cart-drawer__confirm-btn"
                  onClick={handleConfirmOrder}
                  disabled={enviando}
                >
                  {enviando
                    ? 'Confirmando pedido...'
                    : `Confirmar pedido • ${formatearMoneda(totalPagar)}`}
                </button>
              )}
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
