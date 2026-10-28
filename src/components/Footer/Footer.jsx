import { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.png';
import { fetchWithFallback, fallbackData } from '../../data/mockData';
import '../../styles/Footer.css';

function Footer() {
  const [tienda, setTienda] = useState(fallbackData.tienda[0]);

  useEffect(() => {
    fetchWithFallback('/tienda', 'tienda').then((data) => {
      if (data && data.length > 0) {
        setTienda(data[0]);
      }
    });
  }, []);

  return (
    <footer className="footer-container">
      <div className="site-footer">
        <section className="foot-sect">
          <h3 className="foot-logo">
            <img src={logo} alt="logo" />
            Fruteria Tiziana
          </h3>
          <p className="text-spot" id="footer-slogan">
            {tienda.Slogan}
          </p>
          <div className="pay-methods">
            <button className="method" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-credit-card"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
              </svg>{' '}
              Mercado Pago
            </button>
            <button className="method" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cash"
                viewBox="0 0 16 16"
              >
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
              </svg>{' '}
              Efectivo
            </button>
          </div>
        </section>

        <section className="foot-sect">
          <h3 className="foot-tit">Contacto</h3>
          <ul className="foot-item-list">
            <li className="foot-item" id="footer-address">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>{' '}
              {tienda.Direccion}
            </li>
            <li className="foot-item" id="footer-email">
              {tienda.Mail}
            </li>
            <li className="foot-item" id="footer-phone">
              {tienda.Telefono}
            </li>
            <li className="delivery" id="footer-delivery">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-truck"
                viewBox="0 0 16 16"
              >
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
              </svg>{' '}
              {tienda['Horarios de Entrega']}
            </li>
          </ul>
        </section>
      </div>
      <p className="license">© 2026 Frutería Tiziana. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
