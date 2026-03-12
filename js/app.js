const plataformas = ['PC', 'PlayStation', 'Xbox', 'Nintendo'].sort()
const URL = 'http://localhost:3000/api/videojuegos'
let videojuegos
let armoHTML

const retornoCard = (juego, plataforma) => {
  const { id, nombre, desarrollador, año, genero, imagen, dlcs_incluidos } = juego
  const dlcPrincipal = dlcs_incluidos && dlcs_incluidos.length > 0 ? dlcs_incluidos[0] : null
  
  return `<div class="card">
              <a href="juego.html?id=${id}">
                <div class="card-picture">
                    <img src="${imagen}" alt="${nombre}" title="${nombre}">
                    <div class="card-badge">${plataforma}</div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${nombre}</h3>
                    <p class="card-instructor">👨‍💻 ${desarrollador}</p>
                    <div class="card-info">
                        <span class="card-duration">📅 ${año}</span>
                        <span class="card-level">🎯 ${genero}</span>
                    </div>
                    ${dlcPrincipal ? `
                    <div class="card-beer">
                        <p class="card-beer-title">🎁 DLC Incluido</p>
                        <p class="card-beer-name">${dlcPrincipal.nombre}</p>
                        <p class="card-beer-type">${dlcPrincipal.tipo}</p>
                    </div>
                    ` : ''}
                </div>
              </a>
            </div>`
}

const retornoError = () => {
  return `<div class="error">
                  <h1>⚠️ La función está demorada</h1>
                  <p>Estamos cargando los videojuegos y preparando los DLCs 🎮💾</p>
                  <p>Intenta nuevamente en algunos instantes...</p>
              </div>`
}

const retornoPlataforma = (plat) => {
  return `<article class="categoria">
              <h2>🎮 ${plat}</h2>
              <div class="clases-grid" id="grid-${plat}"></div>
          </article>`
}

const container = document.querySelector('.container')

const getVideojuegos = async (URL) => {
  armoHTML = ''
  try {
    const response = await fetch(URL)
    const data = await response.json()
    // data es un objeto agrupado por plataforma: { PC: [...], PlayStation: [...], Xbox: [...], Nintendo: [...] }
    videojuegos = data

    // Verificar que hay datos y que es un objeto
    if (videojuegos && typeof videojuegos === 'object' && !Array.isArray(videojuegos)) {
      // Iterar sobre cada plataforma
      plataformas.forEach(plat => {
        // Acceder directamente a la plataforma: data.PC, data.PlayStation, etc.
        const videojuegosPlataforma = videojuegos[plat]
        if (videojuegosPlataforma && videojuegosPlataforma.length > 0) {
          armoHTML += retornoPlataforma(plat)
        }
      })
      
      container.innerHTML = armoHTML
      container.classList.remove('loading')
      
      // Ahora insertar las tarjetas en cada grid
      plataformas.forEach(plat => {
        const videojuegosPlataforma = videojuegos[plat]
        const grid = document.getElementById(`grid-${plat}`)
        if (grid && videojuegosPlataforma && videojuegosPlataforma.length > 0) {
          // Pasar la plataforma como parámetro adicional a retornoCard
          grid.innerHTML = videojuegosPlataforma.map(juego => retornoCard(juego, plat)).join('')
        }
      })
    } else {
      throw new Error('Formato de datos incorrecto')
    }
  } catch (error) {
    console.error('Error al cargar videojuegos:', error)
    armoHTML = retornoError()
    container.innerHTML = armoHTML
    container.classList.remove('loading')
  }
}

getVideojuegos(URL)

