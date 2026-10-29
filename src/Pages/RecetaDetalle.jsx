import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchWithFallback, fallbackData } from '../data/mockData';
import '../styles/RecetaDetalle.css';

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

function RecetaDetalle({ onAddToCart }) {
  const { id } = useParams();
  const recetaId = Number(id);

  const [recetas, setRecetas] = useState(fallbackData.recetas);
  const [ingredientes, setIngredientes] = useState(
    fallbackData.ingredienteReceta
  );
  const [productos, setProductos] = useState(fallbackData.productos);
  const [dificultades, setDificultades] = useState(fallbackData.dificultad);
  const [catReceta, setCatReceta] = useState(fallbackData.CategoriaReceta);
  const [categorias, setCategorias] = useState(fallbackData.categorias);

  const receta = recetas.find((r) => Number(r.id) === recetaId);
  const baseComensales = receta?.comensales || 4;

  const [comensales, setComensales] = useState(baseComensales);
  const [customValue, setCustomValue] = useState('');
  const [excludedIds, setExcludedIds] = useState([]);

  useEffect(() => {
    if (receta) {
      const initial = receta.comensales || 4;
      setComensales(initial);
      setCustomValue(PRESET_PERSONAS.includes(initial) ? '' : String(initial));
      setExcludedIds([]);
    }
  }, [receta?.id, receta?.comensales]);

  useEffect(() => {
    fetchWithFallback('/recetas', 'recetas').then((data) => {
      if (data && data.length > 0) setRecetas(data);
    });
    fetchWithFallback('/ingredienteReceta', 'ingredienteReceta').then((data) => {
      if (data && data.length > 0) setIngredientes(data);
    });
    fetchWithFallback('/productos', 'productos').then((data) => {
      if (data && data.length > 0) setProductos(data);
    });
    fetchWithFallback('/dificultad', 'dificultad').then((data) => {
      if (data && data.length > 0) setDificultades(data);
    });
    fetchWithFallback('/CategoriaReceta', 'CategoriaReceta').then((data) => {
      if (data && data.length > 0) setCatReceta(data);
    });
    fetchWithFallback('/categorias', 'categorias').then((data) => {
      if (data && data.length > 0) setCategorias(data);
    });
  }, []);

  if (!receta) {
    return (
      <div className="detalle-main">
        <div
          className="detalle-container"
          style={{ padding: '3rem', textAlign: 'center' }}
        >
          <h2>Receta no encontrada</h2>
          <p style={{ marginTop: '1rem' }}>
            <Link to="/recetas" className="detalle-back-link">
              ← Volver a recetas
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const difObj = dificultades.find((d) => d.id === receta.idDificultad);
  const difName = difObj ? difObj.nivel : 'Media';

  const relCat = catReceta.find((cr) => Number(cr.idReceta) === recetaId);
  const catObj = relCat
    ? categorias.find((c) => c.id === relCat.idCategoria)
    : null;
  const catName = catObj ? catObj.Descripcion : 'Receta';

  const scaleFactor = comensales / baseComensales;

  const calculatedIngredients = ingredientes
    .filter((ing) => Number(ing.idReceta) === recetaId)
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

  const activeIngredients = calculatedIngredients.filter(
    (item) => !excludedIds.includes(item.idProducto)
  );

  const totalCost = activeIngredients.reduce(
    (acc, item) => acc + item.price,
    0
  );
  const costPerPerson = comensales > 0 ? totalCost / comensales : 0;

  const handleSelectPreset = (num) => {
    setComensales(num);
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
      setComensales(1);
      return;
    }
    const clamped = Math.min(parsed, 100);
    setCustomValue(String(clamped));
    setComensales(clamped);
  };

  const toggleIngredient = (idProducto) => {
    setExcludedIds((prev) =>
      prev.includes(idProducto)
        ? prev.filter((item) => item !== idProducto)
        : [...prev, idProducto]
    );
  };

  const handleBuyIngredients = () => {
    if (activeIngredients.length === 0) return;
    if (onAddToCart) {
      onAddToCart(activeIngredients, receta, comensales);
    }
  };

  const isCustomActive =
    customValue !== '' && !PRESET_PERSONAS.includes(comensales);

  return (
    <div className="detalle-main">
      <div className="detalle-back-bar">
        <Link to="/recetas" className="detalle-back-link">
          ← Volver a recetas
        </Link>
      </div>

      <div className="detalle-container" id="detalle-container">
        <div className="detalle-header">
          <img
            src={receta.imagen}
            alt={receta.title}
            className="detalle-img"
          />
          <div className="detalle-overlay">
            <div className="detalle-badges">
              <span className="badge-cat">{catName}</span>
              <span className="badge-diff">{difName}</span>
              <span
                className="badge-comensales"
                style={{
                  background: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(5px)',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              >
                👥 Para {comensales} {comensales === 1 ? 'persona' : 'personas'}
              </span>
            </div>
            <h1 className="detalle-title">{receta.title}</h1>
          </div>
        </div>

        <div className="detalle-body">
          <div className="detalle-main-content">
            <h2 className="detalle-section-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-list-ol"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5 7a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 5 7zm0 4.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
                />
                <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32-.202 0-.368.145-.364.339v.041zM2.564 5h-.635V2.924h-.057L1.13 3.663v-.532l1.378-1.127h.056V5z" />
              </svg>
              Preparación
            </h2>
            <div className="pasos-list">
              {Object.entries(receta.Pasos || {}).map(([stepNum, text]) => (
                <div className="paso-item" key={stepNum}>
                  <span className="paso-number">Paso {stepNum}</span>
                  <p className="paso-text">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="detalle-sidebar">
            <div className="ingredients-panel">
              <h3 className="detalle-personas-title">
                ¿Para cuántas personas?
              </h3>

              <div className="detalle-personas-grid">
                {PRESET_PERSONAS.map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`detalle-persona-btn ${
                      comensales === num && customValue === '' ? 'active' : ''
                    }`}
                    onClick={() => handleSelectPreset(num)}
                  >
                    {num} <span role="img" aria-label="personas">👥</span>
                  </button>
                ))}
              </div>

              <div
                className={`detalle-custom-personas ${
                  isCustomActive ? 'active' : ''
                }`}
              >
                <label
                  htmlFor="detalle-custom-personas-input"
                  className="detalle-custom-label"
                >
                  Otra cantidad (ej. 1 o 10):
                </label>
                <div className="detalle-custom-input-wrap">
                  <input
                    id="detalle-custom-personas-input"
                    type="text"
                    inputMode="numeric"
                    pattern="[1-9][0-9]*"
                    placeholder="Ej: 1"
                    className="detalle-custom-input"
                    value={customValue}
                    onKeyDown={handleCustomKeyDown}
                    onChange={handleCustomChange}
                  />
                  <span className="detalle-custom-label">pers.</span>
                </div>
              </div>

              <div className="cost-box">
                <div className="cost-label">Costo de Receta</div>
                <div className="cost-value">${Math.round(totalCost)}</div>
                <div className="cost-per-person">
                  <strong>${Math.round(costPerPerson)}</strong> por persona
                </div>
                <small
                  style={{
                    color: '#a0aec0',
                    display: 'block',
                    marginTop: '5px',
                  }}
                >
                  * Calculado para {comensales}{' '}
                  {comensales === 1 ? 'porción' : 'porciones'}
                </small>
              </div>

              <h3
                className="detalle-section-title"
                style={{ fontSize: '1.15rem', marginBottom: '12px' }}
              >
                Ingredientes para {comensales}{' '}
                {comensales === 1 ? 'persona' : 'personas'}
              </h3>

              <ul className="ingredients-list">
                {calculatedIngredients.map((item) => {
                  const isExcluded = excludedIds.includes(item.idProducto);

                  return (
                    <li
                      className={`ingredient-item ${
                        isExcluded ? 'excluded' : ''
                      }`}
                      key={item.idProducto}
                    >
                      <div className="ingredient-item__left">
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="ingredient-item__img"
                        />
                        <div className="ingredient-item__info">
                          <span className="ingredient-name">{item.nombre}</span>
                          <span className="ingredient-qty">
                            {item.displayQty}
                          </span>
                        </div>
                      </div>

                      <div className="ingredient-item__right">
                        <span className="ingredient-price">${item.price}</span>
                        <button
                          type="button"
                          className={`ingredient-toggle-btn ${
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

              {receta.otrosIngredientes &&
                receta.otrosIngredientes.length > 0 && (
                  <div
                    style={{
                      marginTop: '25px',
                      borderTop: '1px solid #e2e8f0',
                      paddingTop: '20px',
                    }}
                  >
                    <h3
                      className="detalle-section-title"
                      style={{ fontSize: '1.05rem', color: '#4a5568' }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-info-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                      </svg>
                      Otros ingredientes (No incluidos)
                    </h3>
                    <ul className="ingredients-list" style={{ opacity: 0.85 }}>
                      {receta.otrosIngredientes.map((ing) => (
                        <li
                          className="ingredient-item"
                          key={ing}
                          style={{ padding: '6px 0' }}
                        >
                          <span
                            className="ingredient-name"
                            style={{ fontWeight: 500 }}
                          >
                            {ing}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              <button
                className="btn-buy-all"
                type="button"
                onClick={handleBuyIngredients}
                disabled={activeIngredients.length === 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-cart-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                Agregar ingredientes al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecetaDetalle;
