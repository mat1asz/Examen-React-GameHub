// PASO 2 · REEMPLAZAR  ·  PASO 4 · PEGAR HTML (el detalle)
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiFetch } from "../api/client.js";
import { VerDatos } from "../components/VerDatos.jsx";

export function GameDetailPage() {
  const { id } = useParams();
  const [juego, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [lista, setLista] = useState(null);
  useEffect(() => {
    apiFetch("/videojuegos")
      .then(setLista)
      .catch(() => setLista(null));
  }, []);

  useEffect(() => {
    async function cargar() {
      try {
        setLoading(true);
        setError(null);
        const datos = await apiFetch(`/videojuegos/${id}`);
        setGame(datos);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, [id]);

  if (loading) {
    return (
      <article className="container loading">
        <div className="loader"></div>
      </article>
    );
  }

  if (error || !juego) {
    return (
      <article className="container">
        <p className="error">{error ? error.message : "No encontrado"}</p>
        <Link to="/">Volver al inicio</Link>
      </article>
    );
  }

let plataformaJuego = null
    for (const [plataforma, videojuegos] of Object.entries(data)) {
      if (videojuegos.some(v => v.id === juegoId)) {
        plataformaJuego = plataforma
        break
      }
    }

  return (
    <>
    <div>
      <article className="container">
        <div className="clase-details"></div>
      </article>
    </div>

        <div className="clase-header">
          <h2>{juego.nombre}</h2>
          <p className="instructor">👨‍💻 Desarrollador: {juego.desarrollador}</p>
        </div>
        
        <div className="clase-body">
          <div>
            <img src="{juego.imagen}" alt="{juego.nombre}" className="clase-image" />
            
            <div className="clase-meta">
              <div className="meta-item">
                <strong>📅 Año</strong>
                <span>{juego.año}</span>
              </div>
              <div className="meta-item">
                <strong>🎯 Género</strong>
                <span>{juego.genero}</span>
              </div>
              <div className="meta-item">
                <strong>⭐ Calificación</strong>
                <span>{juego.calificacion}/10</span>
              </div>
              <div className  ="meta-item">
                <strong>🎮 Plataforma</strong>
                <span>{plataformaJuego || 'N/A'}</span>
              </div>
            </div>

            {juego.dlcs_incluidos && juego.dlcs_incluidos.length > 0 && (
            <div className="beer-section">
              <h3>🎁 DLCS INCLUIDOS</h3>
              {dlcsHTML}
            </div>
            )}
          </div>
          
          <div className="clase-info">
            <h3>📝 Descripción</h3>
            <p>{juego.descripcion}</p>
            
            <h3>💻 Requisitos del Sistema</h3>
            <div className="clase-meta">
              {requisitosHTML}
            </div>
            
            <h3>🎮 Modos de Juego</h3>
            <ul className="horarios-list">
              {juego.modos_juego.map(modo => `<li>${modo}</li>`).join('')}
            </ul>
            
            <h3>✨ Características</h3>
            <ul className="beneficios-list">
              {juego.caracteristicas.map(caracteristica => `<li>${caracteristica}</li>`).join('')}
            </ul>
          </div>

        </div>
        <div style="text-align: center; margin-top: 2rem;">
          <a href="index.html" className="btn-gaming">Volver al catálogo</a>
        </div>
    </>
  );
}