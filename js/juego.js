/**
 * juego.js
 * 
 * Este archivo se encarga de mostrar el detalle de un juego buscando el `id` en la URL.
 * En React:
 * 1. Obtenemos el `id` mediante el hook `useParams()` de react-router-dom.
 * 2. Usamos un `useEffect` con la dependencia `[id]` para buscar los datos.
 * 3. Mostramos las etiquetas JSX asociadas al componente (por ejemplo, <GameDetailPage />).
 */

const URL = 'http://localhost:3000/api/videojuegos'
const juegoDetailsContainer = document.querySelector('.clase-details')

// Obtener el ID de la URL. En React se hace con useParams()
const params = new URLSearchParams(window.location.search)
const juegoId = parseInt(params.get('id'))

/**
 * Función que realiza el fetch.
 * En React: esto iría dentro del cuerpo del `useEffect` de la página de detalle.
 */
const getJuegoDetails = async () => {
  try {
    const response = await fetch(`${URL}/${juegoId}`)
    const juego = await response.json()

    const responseAll = await fetch(URL)
    const data = await responseAll.json()

    let plataformaJuego = null
    for (const [plataforma, videojuegos] of Object.entries(data)) {
      if (videojuegos.some(v => v.id === juegoId)) {
        plataformaJuego = plataforma
        break
      }
    }

    if (juego) {
      const requisitosHTML = `
        <div class="meta-item">
          <strong>💻 Procesador</strong>
          <span>${juego.requisitos_sistema.procesador}</span>
        </div>
        <div class="meta-item">
          <strong>🧠 Memoria</strong>
          <span>${juego.requisitos_sistema.memoria}</span>
        </div>
        <div class="meta-item">
          <strong>🎨 Gráfica</strong>
          <span>${juego.requisitos_sistema.grafica}</span>
        </div>
        <div class="meta-item">
          <strong>💾 Almacenamiento</strong>
          <span>${juego.requisitos_sistema.almacenamiento}</span>
        </div>
      `

      const dlcsHTML = juego.dlcs_incluidos.map(dlc => `
        <div class="beer-details">
          <div class="beer-detail-item">
            <strong>Nombre:</strong>
            <span>${dlc.nombre}</span>
          </div>
          <div class="beer-detail-item">
            <strong>Tipo:</strong>
            <span>${dlc.tipo}</span>
          </div>
          <div class="beer-detail-item">
            <strong>Contenido Adicional:</strong>
            <span>${dlc.contenido_adicional}</span>
          </div>
          <div class="beer-detail-item">
            <strong>Precio:</strong>
            <span>${dlc.precio}</span>
          </div>
          <div class="beer-description">
            ${dlc.descripcion}
          </div>
        </div>
      `).join('')

      juegoDetailsContainer.innerHTML = `
        <div class="clase-header">
          <h2>${juego.nombre}</h2>
          <p class="instructor">👨‍💻 Desarrollador: ${juego.desarrollador}</p>
        </div>
        
        <div class="clase-body">
          <div>
            <img src="${juego.imagen}" alt="${juego.nombre}" class="clase-image" />
            
            <div class="clase-meta">
              <div class="meta-item">
                <strong>📅 Año</strong>
                <span>${juego.año}</span>
              </div>
              <div class="meta-item">
                <strong>🎯 Género</strong>
                <span>${juego.genero}</span>
              </div>
              <div class="meta-item">
                <strong>⭐ Calificación</strong>
                <span>${juego.calificacion}/10</span>
              </div>
              <div class="meta-item">
                <strong>🎮 Plataforma</strong>
                <span>${plataformaJuego || 'N/A'}</span>
              </div>
            </div>

            ${juego.dlcs_incluidos && juego.dlcs_incluidos.length > 0 ? `
            <div class="beer-section">
              <h3>🎁 DLCS INCLUIDOS</h3>
              ${dlcsHTML}
            </div>
            ` : ''}
          </div>
          
          <div class="clase-info">
            <h3>📝 Descripción</h3>
            <p>${juego.descripcion}</p>
            
            <h3>💻 Requisitos del Sistema</h3>
            <div class="clase-meta">
              ${requisitosHTML}
            </div>
            
            <h3>🎮 Modos de Juego</h3>
            <ul class="horarios-list">
              ${juego.modos_juego.map(modo => `<li>${modo}</li>`).join('')}
            </ul>
            
            <h3>✨ Características</h3>
            <ul class="beneficios-list">
              ${juego.caracteristicas.map(caracteristica => `<li>${caracteristica}</li>`).join('')}
            </ul>
          </div>

        </div>
        <div style="text-align: center; margin-top: 2rem;">
          <a href="index.html" class="btn-gaming">Volver al catálogo</a>
        </div>
      `
    } else {
      juegoDetailsContainer.innerHTML = '<p class="error">❌ Videojuego no encontrado. ¿Se perdió en el multiverso? 🎮</p>'
    }
  } catch (error) {
    juegoDetailsContainer.innerHTML = '<p class="error">❌ Error al cargar los detalles del videojuego. Intenta nuevamente.</p>'
  }
}

getJuegoDetails()

