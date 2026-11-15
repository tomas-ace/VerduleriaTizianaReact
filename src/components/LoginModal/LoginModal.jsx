import { useState } from 'react';
import logo from '../../assets/img/logo.png';
import { fetchWithFallback, registrarUsuario } from '../../data/mockData';
import '../../styles/LoginModal.css';

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [modoRegistro, setModoRegistro] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorRegistro, setErrorRegistro] = useState('');

  if (!isOpen) return null;

  const limpiarErrores = () => {
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorRegistro('');
  };

  const cambiarModo = (nuevoModo) => {
    limpiarErrores();
    setModoRegistro(nuevoModo);
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    limpiarErrores();

    const usuarios = await fetchWithFallback('/usuarios', 'usuarios');
    const usuario = usuarios.find(
      (u) => String(u.mail || '').toLowerCase() === email.trim().toLowerCase()
    );

    if (!usuario) {
      setErrorEmail(true);
      return;
    }

    if (usuario.contrasena !== password) {
      setErrorPassword(true);
      return;
    }

    sessionStorage.setItem('idUsuario', usuario.id);
    if (usuario.direccion) {
      try {
        localStorage.setItem('direccion_entrega_tiziana', usuario.direccion);
      } catch {
        // ignore
      }
    }
    if (onLoginSuccess) onLoginSuccess(usuario);
    onClose();
  };

  const handleSubmitRegistro = async (event) => {
    event.preventDefault();
    limpiarErrores();

    if (password.length < 4) {
      setErrorRegistro('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    try {
      const nuevoUsuario = await registrarUsuario({
        nombre,
        apellido,
        mail: email,
        telefono,
        direccion,
        contrasena: password,
      });

      sessionStorage.setItem('idUsuario', nuevoUsuario.id);
      if (nuevoUsuario.direccion) {
        try {
          localStorage.setItem(
            'direccion_entrega_tiziana',
            nuevoUsuario.direccion
          );
        } catch {
          // ignore
        }
      }
      if (onLoginSuccess) onLoginSuccess(nuevoUsuario);
      setModoRegistro(false);
      onClose();
    } catch (err) {
      setErrorRegistro(err.message || 'No se pudo completar el registro.');
    }
  };

  return (
    <div
      className="user-modal"
      id="modal-user"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <section className="modal-header" id="modal-header">
          <div className="modal-header-buttons" id="modal-header-buttons">
            <div className="logo-container">
              <span className="logo">
                <img src={logo} alt="Logo" /> Tiziana
              </span>
            </div>
            <div className="close-modal" id="close-modal">
              <button
                className="btn-close"
                id="btn-close"
                type="button"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
          </div>

          <h3>{modoRegistro ? 'Creá tu cuenta' : 'Bienvenido de vuelta'}</h3>
          <p>
            {modoRegistro
              ? 'Guardá tus datos para comprar en segundos'
              : 'Ingresá a tu cuenta para poder comprar'}
          </p>
        </section>

        <section className="modal-body">
          {!modoRegistro ? (
            <form
              className="modal-form"
              id="modal-form"
              onSubmit={handleSubmitLogin}
            >
              <input
                className="input-ingresar"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errorEmail && (
                <p className="error-input" id="error-email">
                  Email ingresado no existe
                </p>
              )}
              <input
                className="input-ingresar"
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorPassword && (
                <p className="error-input" id="error-password">
                  Contraseña incorrecta
                </p>
              )}
              <button className="ingresar-button" type="submit">
                Ingresar
              </button>
            </form>
          ) : (
            <form
              className="modal-form"
              id="modal-form-registro"
              onSubmit={handleSubmitRegistro}
            >
              <div className="modal-row-two">
                <input
                  className="input-ingresar"
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
                <input
                  className="input-ingresar"
                  type="text"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>
              <input
                className="input-ingresar"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="input-ingresar"
                type="text"
                placeholder="Dirección de entrega"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
              <input
                className="input-ingresar"
                type="tel"
                placeholder="Teléfono (opcional)"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              <input
                className="input-ingresar"
                type="password"
                placeholder="Contraseña (mín. 4 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorRegistro && (
                <p className="error-input">{errorRegistro}</p>
              )}
              <button className="ingresar-button" type="submit">
                Registrarme e ingresar
              </button>
            </form>
          )}
        </section>

        <section className="modal-footer">
          {!modoRegistro ? (
            <>
              <p>¿No tenés una cuenta? </p>
              <button
                className="btn-registro"
                type="button"
                onClick={() => cambiarModo(true)}
              >
                Registrate
              </button>
            </>
          ) : (
            <>
              <p>¿Ya tenés cuenta? </p>
              <button
                className="btn-registro"
                type="button"
                onClick={() => cambiarModo(false)}
              >
                Iniciar sesión
              </button>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default LoginModal;
