// PASO 2 · REEMPLAZAR (ya anda con lo provisorio)  ·  PASO 4 · PEGAR HTML (la tarjeta)
import { Link } from "react-router-dom";
import { VerDatos } from "./VerDatos.jsx";

export function GameCard({ juego, grupo }) {
  /* ═══ PEGAR ACÁ (si hay): LO DE ARRIBA DEL HTML ═══
     SALE DE: el mismo JS de donde sacás la tarjeta → la función que la arma
              → desde la línea siguiente a su { de apertura hasta la línea anterior al return
              (líneas como const { id, nombre } = algo  o  const algo = ...)
     Si "algo" no se llama __ITEM__, cambiá esa palabra por __ITEM__.
     Si la función recibía un 2.º dato (el nombre del grupo), acá ese dato se llama grupo.
     Si el HTML usa una función que no copiaste (la consola dice "... is not defined"):
     buscala en el mismo JS y copiala entera acá también.
     Si no hay nada, borrá este comentario */

  return (
    <>
<div className="card">
              <a href="juego.html?id={id}">
                <div className="card-picture">
                    <img src="{imagen}" alt="{nombre}" title="{nombre}"/>
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
              </a>
            </div>
    </>
  );
}