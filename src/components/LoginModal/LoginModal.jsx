import { useState } from 'react';
import logo from '../../assets/img/logo.png';
import { fetchWithFallback } from '../../data/mockData';
import '../../styles/LoginModal.css';

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorEmail(false);
    setErrorPassword(false);

    const usuarios = await fetchWithFallback('/usuarios', 'usuarios');
    const usuario = usuarios.find((u) => u.mail === email);

    if (!usuario) {
      setErrorEmail(true);
      return;
    }

    if (usuario.contrasena !== password) {
      setErrorPassword(true);
      return;
    }

    sessionStorage.setItem('idUsuario', usuario.id);
    if (onLoginSuccess) onLoginSuccess(usuario);
    onClose();
  };

  return (
    <div className="user-modal" id="modal-user">
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

          <h3>Bienvenido de Vuelta</h3>
          <p>Ingresa a tu cuenta para poder comprar</p>
        </section>

        <section className="modal-body">
          <form className="modal-form" id="modal-form" onSubmit={handleSubmit}>
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
        </section>

        <section className="modal-footer">
          <p>No tienes una cuenta? </p>
          <button className="btn-registro" type="button">
            Registrate
          </button>
        </section>
      </div>
    </div>
  );
}

export default LoginModal;
