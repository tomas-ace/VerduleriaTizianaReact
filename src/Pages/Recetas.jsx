import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithFallback, fallbackData } from '../data/mockData';
import '../styles/Recetas.css';

function mapCategoryName(name) {
  if (name === 'Platos Principales') return 'Principales';
  return name;
}

function Recetas({ onOpenRecipeModal }) {
  const navigate = useNavigate();
  const filtersListRef = useRef(null);

  const [recetas, setRecetas] = useState(fallbackData.recetas);
  const [categorias, setCategorias] = useState(
    fallbackData.categorias.filter((c) => c.Tipo === 'Recetas')
  );
  const [catReceta, setCatReceta] = useState(fallbackData.CategoriaReceta);
  const [dificultades, setDificultades] = useState(fallbackData.dificultad);

  const [selectedCategory, setSelectedCategory] = useState('0');
  const [favorites, setFavorites] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    fetchWithFallback('/recetas', 'recetas').then((data) => {
      if (data && data.length > 0) setRecetas(data);
    });

    fetchWithFallback('/categorias?Tipo=Recetas', 'categorias').then((data) => {
      if (data && data.length > 0) {
        setCategorias(data.filter((c) => c.Tipo === 'Recetas'));
      }
    });

    fetchWithFallback('/CategoriaReceta', 'CategoriaReceta').then((data) => {
      if (data && data.length > 0) setCatReceta(data);
    });

    fetchWithFallback('/dificultad', 'dificultad').then((data) => {
      if (data && data.length > 0) setDificultades(data);
    });
  }, []);

  const updateScrollArrows = () => {
    const list = filtersListRef.current;
    if (!list) return;
    setCanScrollLeft(list.scrollLeft > 0);
    setCanScrollRight(
      Math.ceil(list.scrollLeft + list.clientWidth) < list.scrollWidth
    );
  };

  useEffect(() => {
    updateScrollArrows();
    window.addEventListener('resize', updateScrollArrows);
    return () => window.removeEventListener('resize', updateScrollArrows);
  }, [categorias]);

  const handleScroll = (offset) => {
    if (filtersListRef.current) {
      filtersListRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const categoriasMap = {};
  categorias.forEach((c) => {
    categoriasMap[c.id] = c.Descripcion;
  });

  const recetaCatMap = {};
  catReceta.forEach((cr) => {
    recetaCatMap[cr.idReceta] = cr.idCategoria;
  });

  const dificultadMap = {};
  dificultades.forEach((d) => {
    dificultadMap[d.id] = d.nivel;
  });

  const filteredRecetas =
    selectedCategory === '0'
      ? recetas
      : recetas.filter(
          (r) => String(recetaCatMap[r.id]) === String(selectedCategory)
        );

  return (
    <div className="recetas-main-container">
      <section className="recetas-hero">
        <h1>Recetas saludables</h1>
        <p className="hero-description">
          Elegí una receta, indicá cuántas personas van a comer y agregamos
          todos los
          <br />
          ingredientes frescos a tu carrito automáticamente.
        </p>

        <div className="steps-box">
          <div className="step-item">
            <span className="step-number">01</span> Elegí una receta
          </div>
          <div className="step-arrow">→</div>
          <div className="step-item">
            <span className="step-number">02</span> Indicá cuántas personas
          </div>
          <div className="step-arrow">→</div>
          <div className="step-item">
            <span className="step-number">03</span> Calculamos las cantidades
          </div>
          <div className="step-arrow">→</div>
          <div className="step-item">
            <span className="step-number">04</span> Recibís todo en tu casa
          </div>
        </div>
      </section>

      <section className="recetas-filters-container">
        <div className="filters-scroll-wrapper">
          <button
            className={`scroll-arrow left-arrow ${!canScrollLeft ? 'hidden' : ''}`}
            id="scroll-left"
            type="button"
            aria-label="Desplazar a la izquierda"
            onClick={() => handleScroll(-150)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </button>

          <div
            className="filters-list"
            id="filters-list"
            ref={filtersListRef}
            onScroll={updateScrollArrows}
          >
            <button
              type="button"
              className={`filter-btn ${selectedCategory === '0' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('0')}
            >
              Todas
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-btn ${String(selectedCategory) === String(cat.id) ? 'active' : ''}`}
                onClick={() => setSelectedCategory(String(cat.id))}
              >
                {mapCategoryName(cat.Descripcion)}
              </button>
            ))}
          </div>

          <button
            className={`scroll-arrow right-arrow ${!canScrollRight ? 'hidden' : ''}`}
            id="scroll-right"
            type="button"
            aria-label="Desplazar a la derecha"
            onClick={() => handleScroll(150)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
        </div>
      </section>

      <section className="recetas-grid" id="recetas-grid">
        {filteredRecetas.length === 0 ? (
          <p
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              color: '#777',
            }}
          >
            No hay recetas en esta categoría.
          </p>
        ) : (
          filteredRecetas.map((recipe) => {
            const catId = recetaCatMap[recipe.id];
            const catName = categoriasMap[catId]
              ? mapCategoryName(categoriasMap[catId])
              : 'Receta';
            const diffName = dificultadMap[recipe.idDificultad] || 'Media';

            const time = 15 + (recipe.id % 5) * 10;
            const portions = recipe.comensales || 2 + (recipe.id % 3) * 2;
            const kcal = 150 + (recipe.id % 10) * 40;

            const description = Object.values(recipe.Pasos || {}).join(' ');
            const shortDescription =
              description.length > 80
                ? `${description.substring(0, 77)}...`
                : description;

            const isFav = favorites.includes(recipe.id);

            return (
              <article className="receta-card" key={recipe.id}>
                <div className="receta-card__img-container">
                  <img
                    src={recipe.imagen}
                    alt={recipe.title}
                    className="receta-card__img"
                  />
                  <div className="receta-card__badges">
                    <span className="badge-cat">{catName}</span>
                    <span className="badge-diff">{diffName}</span>
                  </div>
                  <button
                    type="button"
                    className={`receta-card__fav ${isFav ? 'active' : ''}`}
                    onClick={() => toggleFavorite(recipe.id)}
                    aria-label="Marcar como favorita"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      {isFav ? (
                        <path
                          fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                        />
                      ) : (
                        <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 8 1.146c4.721-4.186 15.333 3.722 8 13.854z" />
                      )}
                    </svg>
                  </button>
                </div>

                <div className="receta-card__content">
                  <h3 className="receta-card__title">{recipe.title}</h3>
                  <p className="receta-card__desc">{shortDescription}</p>
                  <div className="receta-card__meta">
                    <span className="meta-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-clock"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                      </svg>
                      {time} min
                    </span>
                    <span className="meta-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-people"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                      </svg>
                      {portions} porc.
                    </span>
                    <span className="meta-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-fire"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                      </svg>
                      {kcal} kcal
                    </span>
                  </div>
                  <div className="receta-card__actions">
                    <button
                      className="receta-card__btn-secondary"
                      type="button"
                      onClick={() => navigate(`/recetas/${recipe.id}`)}
                    >
                      Ver receta
                    </button>
                    <button
                      className="receta-card__btn"
                      type="button"
                      onClick={() =>
                        onOpenRecipeModal && onOpenRecipeModal(recipe)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-cart3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>
                      Preparar compra
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}

export default Recetas;
