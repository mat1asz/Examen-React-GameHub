// PASO 1 · COPIAR (ya anda con lo provisorio)  ·  PASO 4 · PEGAR HTML (header, saludo, footer)
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { LoginForm } from "./LoginForm.jsx";

export function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Si hay usuario se ve el saludo; si no, el formulario de login (ya está hecho, no se toca)
  const areaLogin = user ? (
    <>
      <div id="userInfo">
        <span id="userNameDisplay">
          Bienvenido, {user.fullName} - {user.rol}
        </span>
        <button
          id="logoutBtn"
          className="btn-gaming-secondary"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </>
  ) : (
    <LoginForm />
  );

  return (
    <>
      <header>
        <div className="brand-container">
          <h1 className="logo-title">🎮 GAMEHUB</h1>
          <p className="slogan">Tu catálogo de videojuegos definitivo</p>
        </div>
        <div className="login-container">{areaLogin}</div>
      </header>
      <main>{children}</main>
      <footer>
        <p>
          🎮 GameHub © 2026 - Tu portal de videojuegos | Juega Responsablemente
          🕹️
        </p>
      </footer>
    </>
  );
}
