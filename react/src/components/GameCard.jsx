// PASO 2 · REEMPLAZAR (ya anda con lo provisorio)  ·  PASO 4 · PEGAR HTML (la tarjeta)
import { Link } from "react-router-dom";
import { VerDatos } from "./VerDatos.jsx";

export function GameCard({ juego, grupo }) {
  const { id, nombre, desarrollador, año, genero, imagen, dlcs_incluidos } = juego
  const dlcPrincipal = dlcs_incluidos && dlcs_incluidos.length > 0 ? dlcs_incluidos[0] : null

  return (
    <>
<div className="card">
              <Link to={`/juego/${id}`}>
                <div className="card-picture">
                    <img src={imagen} alt={nombre} title={nombre}/>
                    <div className="card-badge">{grupo}</div>
                </div>
                <div className="card-content">
                    <h3 className="card-title">{nombre}</h3>
                    <p className="card-instructor">👨‍💻 {desarrollador}</p>
                    <div className="card-info">
                        <span className="card-duration">📅 {año}</span>
                        <span className="card-level">🎯 {genero}</span>
                    </div>
                    {dlcPrincipal && (
                    <div className="card-beer">
                        <p className="card-beer-title">🎁 DLC Incluido</p>
                        <p className="card-beer-name">{dlcPrincipal.nombre}</p>
                        <p className="card-beer-type">{dlcPrincipal.tipo}</p>
                    </div>
                    )} 
                </div>
              </Link>
            </div>
    </>
  );
} 