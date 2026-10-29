import { useEffect, useState } from 'react';
import { fetchWithFallback, fallbackData } from '../../data/mockData';
import '../../styles/ModalPrepararCompra.css';

const PRESET_PERSONAS = [2, 4, 6, 8];

function formatScaledIngredient(baseQty, unidad, scaleFactor) {
  const scaled = baseQty * scaleFactor;
  const unitLower = unidad.toLowerCase();

  if (unitLower === 'gramos' && scaled >= 1000) {
    const inKg = scaled / 1000;
    return `${Number.isInteger(inKg) ? inKg : Number(inKg.toFixed(2))} kg`;
  }

  const rounded = Number.isInteger(scaled)
    ? scaled
    : Number(scaled.toFixed(2));
  return `${rounded} ${unidad}`;
}

function calculateIngredientPrice(baseQty, unidad, precioPorPeso, scaleFactor) {
  const scaledQty = baseQty * scaleFactor;
  const unitLower = unidad.toLowerCase();

  if (unitLower === 'gramos') {
    return (scaledQty / 1000) * precioPorPeso;
  }
  if (unitLower === 'kg') {
    return scaledQty * precioPorPeso;
  }
  if (unitLower === 'dientes') {
    return (scaledQty / 10) * precioPorPeso;
  }
  if (unitLower === 'ml') {
    return (scaledQty / 1000) * precioPorPeso;
  }
  return scaledQty * precioPorPeso;
}

function ModalPrepararCompra({ receta, onClose, onAddToCart }) {
  const [ingredientes, setIngredientes] = useState(
    fallbackData.ingredienteReceta
  );
  const [productos, setProductos] = useState(fallbackData.productos);

  const [personas, setPersonas] = useState(4);
  const [customValue, setCustomValue] = useState('');
  const [excludedIds, setExcludedIds] = useState([]);

  useEffect(() => {
    fetchWithFallback('/ingredienteReceta', 'ingredienteReceta').then(
      (data) => {
        if (data && data.length > 0) setIngredientes(data);
      }
    );
    fetchWithFallback('/productos', 'productos').then((data) => {
      if (data && data.length > 0) setProductos(data);
    });
  }, []);

  useEffect(() => {
    if (receta) {
      const initialPersonas = receta.comensales || 4;
      setPersonas(initialPersonas);
      setCustomValue(
        PRESET_PERSONAS.includes(initialPersonas)
          ? ''
          : String(initialPersonas)
      );
      setExcludedIds([]);
    }
  }, [receta]);

  if (!receta) return null;

  const baseComensales = receta.comensales || 4;
  const scaleFactor = personas / baseComensales;

  const time = 15 + (receta.id % 5) * 10;
  const kcal = 150 + (receta.id % 10) * 40;

  const recetaIngredientes = ingredientes
    .filter((ing) => Number(ing.idReceta) === Number(receta.id))
    .map((ing) => {
      const prod = productos.find((p) => Number(p.id) === Number(ing.idProducto));
      if (!prod) return null;

      const price = Math.round(
        calculateIngredientPrice(
          ing.cantidad,
          ing.unidad,
          prod.precioPorPeso,
          scaleFactor
        )
      );

      const displayQty = formatScaledIngredient(
        ing.cantidad,
        ing.unidad,
        scaleFactor
      );

      return {
        idProducto: prod.id,
        nombre: prod.nombre,
        imagen: prod.imagen,
        cantidadEscalada: Number((ing.cantidad * scaleFactor).toFixed(2)),
        unidad: ing.unidad,
        displayQty,
        price,
      };
    })
    .filter(Boolean);

  const activeIngredients = recetaIngredientes.filter(
    (item) => !excludedIds.includes(item.idProducto)
  );

  const totalEstimado = activeIngredients.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const handleSelectPreset = (num) => {
    setPersonas(num);
    setCustomValue('');
  };

  const handleCustomKeyDown = (e) => {
    if (['-', '+', '.', ',', 'e', 'E'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleCustomChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    if (digitsOnly === '') {
      setCustomValue('');
      return;
    }
    const parsed = parseInt(digitsOnly, 10);
    if (Number.isNaN(parsed) || parsed < 1) {
      setCustomValue('1');
      setPersonas(1);
      return;
    }
    const clamped = Math.min(parsed, 100);
    setCustomValue(String(clamped));
    setPersonas(clamped);
  };

  const toggleIngredient = (idProducto) => {
    setExcludedIds((prev) =>
      prev.includes(idProducto)
        ? prev.filter((id) => id !== idProducto)
        : [...prev, idProducto]
    );
  };

  const handleConfirm = () => {
    if (activeIngredients.length === 0) return;
    onAddToCart(activeIngredients, receta, personas);
    onClose();
  };

  const isCustomActive =
    customValue !== '' && !PRESET_PERSONAS.includes(personas);

  return (
    <div
      className="prep-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="prep-modal" role="dialog" aria-modal="true">
        <div className="prep-modal__header">
          <img
            src={receta.imagen}
            alt={receta.title}
            className="prep-modal__img"
          />
          <button
            type="button"
            className="prep-modal__close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
          <div className="prep-modal__overlay">
            <h2 className="prep-modal__title">{receta.title}</h2>
            <div className="prep-modal__meta">
              <span className="prep-modal__meta-item">🕒 {time} min</span>
              <span className="prep-modal__meta-item">
                👥 {baseComensales} porc.
              </span>
              <span className="prep-modal__meta-item">🔥 {kcal} kcal</span>
            </div>
          </div>
        </div>

        <div className="prep-modal__body">
          <h3 className="prep-modal__section-title">
            ¿Para cuántas personas?
          </h3>

          <div className="prep-modal__personas-grid">
            {PRESET_PERSONAS.map((num) => (
              <button
                key={num}
                type="button"
                className={`prep-persona-btn ${
                  personas === num && customValue === '' ? 'active' : ''
                }`}
                onClick={() => handleSelectPreset(num)}
              >
                {num} <span role="img" aria-label="personas">👥</span>
              </button>
            ))}
          </div>

          <div
            className={`prep-modal__custom-personas ${
              isCustomActive ? 'active' : ''
            }`}
          >
            <label
              htmlFor="custom-personas-input"
              className="prep-custom-label"
            >
              Otra cantidad (ej. 1 o 10):
            </label>
            <div className="prep-custom-input-wrap">
              <input
                id="custom-personas-input"
                type="text"
                inputMode="numeric"
                pattern="[1-9][0-9]*"
                placeholder="Ej: 1"
                className="prep-custom-input"
                value={customValue}
                onKeyDown={handleCustomKeyDown}
                onChange={handleCustomChange}
              />
              <span className="prep-custom-unit">pers.</span>
            </div>
          </div>

          <h3 className="prep-modal__section-title">
            Ingredientes para {personas}{' '}
            {personas === 1 ? 'persona' : 'personas'}
          </h3>

          <ul className="prep-modal__ing-list">
            {recetaIngredientes.map((item) => {
              const isExcluded = excludedIds.includes(item.idProducto);

              return (
                <li
                  key={item.idProducto}
                  className={`prep-ing-item ${isExcluded ? 'excluded' : ''}`}
                >
                  <div className="prep-ing-item__left">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="prep-ing-item__img"
                    />
                    <div className="prep-ing-item__info">
                      <span className="prep-ing-item__name">{item.nombre}</span>
                      <span className="prep-ing-item__qty">
                        {item.displayQty}
                      </span>
                    </div>
                  </div>

                  <div className="prep-ing-item__right">
                    <span className="prep-ing-item__price">${item.price}</span>
                    <button
                      type="button"
                      className={`prep-ing-toggle-btn ${
                        isExcluded ? 'restore' : ''
                      }`}
                      onClick={() => toggleIngredient(item.idProducto)}
                      title={
                        isExcluded
                          ? 'Volver a incluir ingrediente'
                          : 'Ya tengo este ingrediente (quitar de la compra)'
                      }
                    >
                      {isExcluded ? '+ Incluir' : '✕ Quitar'}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="prep-modal__footer">
          <div className="prep-modal__total-row">
            <span className="prep-modal__total-label">Total estimado</span>
            <span className="prep-modal__total-value">${totalEstimado}</span>
          </div>

          <button
            type="button"
            className="prep-modal__submit-btn"
            onClick={handleConfirm}
            disabled={activeIngredients.length === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-cart3"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            Agregar ingredientes al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalPrepararCompra;
