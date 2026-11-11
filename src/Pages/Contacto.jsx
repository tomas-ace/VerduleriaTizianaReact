import '../styles/Contacto.css'

function Contacto() {
 return (
    <div className="contacto-page">
      <div className="contacto-container">

        <section className="contact">
          <h1>Estamos para ayudarte</h1>
          <h3 className="contact-tit">Datos de contacto</h3>

          <section className="contact-date">
            <h4>WhatsApp</h4>
            <p>+54 9 11 1234 5678</p>
          </section>

          <section className="contact-date">
            <h4>Email</h4>
            <p>hola@fruteriatiziana.com.ar</p>
          </section>

          <section className="contact-date">
            <h4>Teléfono</h4>
            <p>011 1234 5678</p>
          </section>

          <section className="contact-date">
            <h4>Dirección</h4>
            <p>
              Av. Perez Galdos 8360
              <br />
              Buenos Aires, Argentina
            </p>
          </section>

          <section className="contact-date">
            <h4>Horarios</h4>
            <p>Lunes a Sábados</p>
            <p>8:00 a 20:00 hs</p>
          </section>
        </section>

        
        <section className="form">
          <h3>Envíanos tu consulta</h3>

          <form>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre..."
            />

            <label htmlFor="email-contacto">Email</label>
            <input
              type="email"
              id="email-contacto"
              name="email"
              placeholder="Tu email..."
            />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              placeholder="Escribí tu mensaje..."
            />

            <button className="btn-submit" type="submit">
              Enviar mensaje
            </button>
          </form>

      
          <a href="https://www.google.com/maps" target="_blank" rel="noreferrer">
            <aside className="link-ub">
              <div className="aside-text">
                <h3>Nuestra tienda</h3>
                <p>
                  Visitanos y conocé nuestros productos frescos.
                </p>
              </div>
            </aside>
          </a>

        </section>

      </div>
    </div>
  );

}

export default Contacto;  
