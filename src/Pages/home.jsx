import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchWithFallback, fallbackData } from '../data/mockData';
import '../styles/Home.css';

function Home({ onOpenRecipeModal }) {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState(
    fallbackData.productos.slice(0, 4)
  );
  const [allProducts, setAllProducts] = useState(fallbackData.productos);
  const [offers, setOffers] = useState(fallbackData.Oferta);
  const [recipes, setRecipes] = useState(fallbackData.recetas.slice(0, 6));
  const [dificultades, setDificultades] = useState(fallbackData.dificultad);

  useEffect(() => {
    fetchWithFallback('/productos', 'productos').then((products) => {
      if (products && products.length > 0) {
        setAllProducts(products);
        setFeaturedProducts(products.slice(0, 4));
      }
    });

    fetchWithFallback('/Oferta?Estado=Activa&_limit=3', 'Oferta').then(
      (activeOffers) => {
        if (activeOffers && activeOffers.length > 0) {
          setOffers(
            activeOffers
              .filter((o) => o.Estado === 'Activa')
              .slice(0, 3)
          );
        }
      }
    );

    fetchWithFallback('/recetas?_limit=6', 'recetas').then((recipesData) => {
      if (recipesData && recipesData.length > 0) {
        setRecipes(recipesData.slice(0, 6));
      }
    });

    fetchWithFallback('/dificultad', 'dificultad').then((diffData) => {
      if (diffData && diffData.length > 0) {
        setDificultades(diffData);
      }
    });
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero__overlay">
          <div className="hero__content">
            <span className="hero__tag">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sparkles"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
              Entregas en 30-60 minutos - Buenos Aires
            </span>

            <h1 className="hero__title">
              No vendemos solo fruta, <br />
              <span className="hero__highlight">vendemos la solución</span>
              <br />
              para tu cena
            </h1>

            <p className="hero__subtitle">
              Elegí una receta, indicá cuántas personas comen y nosotros
              calculamos todo. Frutas y verduras frescas en tu puerta.
            </p>

            <div className="hero__actions">
              <button
                className="hero__btn hero__btn--primary"
                type="button"
                onClick={() => navigate('/productos')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-leaf"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
                Comprar productos
              </button>

              <button
                className="hero__btn hero__btn--secondary"
                type="button"
                onClick={() => navigate('/recetas')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-utensils-crossed"
                >
                  <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                  <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                  <path d="m2.1 21.8 6.4-6.3" />
                  <path d="m19 5-7 7" />
                </svg>
                Buscar recetas
              </button>
            </div>
          </div>

          <div className="hero__stats">
            <div className="stat-item">
              <span className="stat-number">+200</span>
              <span className="stat-text">Productos frescos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">+5.000</span>
              <span className="stat-text">Clientes felices</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30 min</span>
              <span className="stat-text">Tiempo de entrega</span>
            </div>
          </div>
        </div>
      </section>

      <section className="star-feature">
        <div className="star-feature__container">
          <div className="star-feature__content">
            <span className="star-feature__label">Función estrella ⭐</span>
            <h2 className="star-feature__title">
              "Elegí la receta, nosotros nos ocupamos del resto"
            </h2>
            <p className="star-feature__description">
              Calculamos automáticamente las cantidades para tus comensales.
            </p>
          </div>
          <button
            className="star-feature__button"
            type="button"
            onClick={() => navigate('/recetas')}
          >
            <span className="star-feature__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chef-hat"
              >
                <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
                <path d="M6 17h12" />
              </svg>
            </span>{' '}
            Preparar mi cena
          </button>
        </div>
      </section>

      <section className="featured-products">
        <div className="featured-products__header">
          <span className="featured-products__subtitle">
            LO MEJOR DE LA SEMANA
          </span>
          <div className="featured-products__title-row">
            <h2 className="featured-products__title">Productos destacados</h2>
            <Link to="/productos" className="featured-products__link">
              Ver todos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="cards-grid" id="featured-products-container">
          {featuredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-card__image-container">
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="product-card__image"
                />
                <span className="product-card__badge product-card__badge--green">
                  Destacado
                </span>
              </div>
              <div className="product-card__content">
                <span className="product-card__category">
                  {product.categoria.toUpperCase()}
                </span>
                <h3 className="product-card__name">{product.nombre}</h3>
                <p className="product-card__description">
                  {product.descripcion}
                </p>
                <div className="product-card__footer">
                  <span className="product-card__price">
                    ${product.precioPorPeso} <br />
                    <small className="product-card__price--unit">/kg</small>
                  </span>
                  <button className="product-card__button" type="button">
                    + Agregar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="daily-offers">
        <div className="daily-offers__header">
          <span className="daily-offers__subtitle">PRECIOS ESPECIALES</span>
          <h2 className="daily-offers__title">Ofertas del día</h2>
        </div>

        <div className="daily-offers__grid" id="daily-offers-container">
          {offers.map((offer) => {
            const product = allProducts.find((p) => p.id === offer.IdProducto);
            if (!product) return null;
            const discountedPrice =
              product.precioPorPeso * (1 - offer.Porcentaje / 100);

            return (
              <article className="offer-card" key={offer.IdProducto}>
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="offer-card__image"
                />
                <div className="offer-card__info">
                  <span className="offer-card__tag">
                    -{offer.Porcentaje}% HOY
                  </span>
                  <h3 className="offer-card__name">{product.nombre}</h3>
                  <p className="offer-card__price">
                    <strong>${discountedPrice.toFixed(0)}</strong>{' '}
                    <del>${product.precioPorPeso}</del>{' '}
                    <span className="offer-card__price-unit">/kg</span>
                  </p>
                  <button className="offer-card__button" type="button">
                    <span className="offer-card__button-plus">+</span>
                    <span className="offer-card__button-text">
                      Agregar al carrito
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="recipe-section">
        <div className="recipe-section__header">
          <span className="recipe-section__subtitle">IDEAS PARA TU MESA</span>
          <div className="recipe-section__title-row">
            <h2 className="recipe-section__title">Recetas populares</h2>
            <Link to="/recetas" className="recipe-section__link">
              Ver todas
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="recipe-grid" id="popular-recipes-container">
          {recipes.map((recipe) => {
            const description = Object.values(recipe.Pasos || {}).join(' ');
            const shortDescription =
              description.length > 100
                ? `${description.substring(0, 97)}...`
                : description;
            const dificultad = dificultades.find(
              (d) => d.id === recipe.idDificultad
            );
            const nivelDificultad = dificultad ? dificultad.nivel : 'Media';

            return (
              <article className="recipe-card" key={recipe.id}>
                <div className="recipe-card__image-container">
                  <img
                    src={recipe.imagen}
                    alt={recipe.title}
                    className="recipe-card__image"
                  />
                  <span className="recipe-card__badge">{nivelDificultad}</span>
                  <div className="recipe-card__overlay">
                    <h3 className="recipe-card__title">{recipe.title}</h3>
                    <div className="recipe-card__meta">
                      <span className="recipe-card__meta-item">🕒 45 min</span>
                      <span className="recipe-card__meta-item">
                        👥 {recipe.comensales || 4} porc.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="recipe-card__content">
                  <p className="recipe-card__description">{shortDescription}</p>
                  <div className="recipe-card__actions">
                    <button
                      className="recipe-card__btn-secondary"
                      type="button"
                      onClick={() => navigate(`/recetas/${recipe.id}`)}
                    >
                      Ver receta
                    </button>
                    <button
                      className="recipe-card__button"
                      type="button"
                      onClick={() =>
                        onOpenRecipeModal && onOpenRecipeModal(recipe)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="recipe-card__btn-icon"
                      >
                        <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
                        <path d="M6 17h12" />
                      </svg>
                      Preparar compra
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="benefits">
        <h2 className="benefits__title">¿Por qué elegir Tiziana?</h2>
        <div className="benefits__grid">
          <div className="benefit-card">
            <div className="benefit-card__icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2e7d32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="benefit-card__icon-svg"
              >
                <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <h3 className="benefit-card__title">Entrega a domicilio</h3>
            <p className="benefit-card__text">En 30-60 minutos en tu puerta</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-card__icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2e7d32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="benefit-card__icon-svg"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <h3 className="benefit-card__title">100% frescos</h3>
            <p className="benefit-card__text">Productos cosechados del día</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-card__icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2e7d32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="benefit-card__icon-svg"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="benefit-card__title">Compra segura</h3>
            <p className="benefit-card__text">Mercado Pago o efectivo</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-card__icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2e7d32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="benefit-card__icon-svg"
              >
                <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
                <path d="M6 17h12" />
              </svg>
            </div>
            <h3 className="benefit-card__title">Recetas incluidas</h3>
            <p className="benefit-card__text">Comprá justo lo que necesitás</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
