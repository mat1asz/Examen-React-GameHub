/**
 * login.js
 * 
 * Este archivo maneja la autenticación y la cabecera dinámica en Vanilla JS.
 * En React: toda esta lógica debería encapsularse dentro de un `AuthContext.jsx` 
 * (y un hook `useAuth`) para que el `user` esté disponible como estado global en toda la SPA sin prop drilling.
 */

const URL_LOGIN = 'http://localhost:3000/api/login'
const loginForm = document.getElementById('loginForm')
const userInfo = document.getElementById('userInfo')
const userNameDisplay = document.getElementById('userNameDisplay')
const logoutBtn = document.getElementById('logoutBtn')

// Mostrar el nombre de usuario almacenado al cargar la página
// En React: El localStorage se leería al inicializar el `useState` del Contexto.
const currentUser = window.localStorage.getItem('usuario')
const currentRole = window.localStorage.getItem('rol')

if (currentUser) {
  mostrarUsuario(currentUser, currentRole)
} else {
  loginForm.style.display = 'flex'
}

// Función para validar el login contra el backend (POST /api/login)
// En React: Esta lógica de fetch pertenece a la función `login()` expuesta por el AuthContext.
const validarUsuario = async (username, password) => {
  try {
    const response = await fetch(URL_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
      // 401 u otros códigos se interpretan como credenciales inválidas
      return null
    }

    const usuario = await response.json()
    return usuario
  } catch (error) {
    console.error('Error al hacer login contra la API:', error)
    return null
  }
}

// Manejar el envío del formulario
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  const usuarioValido = await validarUsuario(username, password)
  if (usuarioValido) {
    window.localStorage.setItem('usuario', usuarioValido.firstName + ' ' + usuarioValido.lastName)
    window.localStorage.setItem('rol', usuarioValido.rol)
    mostrarUsuario(usuarioValido.firstName + ' ' + usuarioValido.lastName, usuarioValido.rol)
  } else {
    window.alert('❌ Usuario o contraseña incorrectos')
  }
})

// Mostrar el nombre del usuario y el botón de cerrar sesión
function mostrarUsuario (nombre, rol) {
  loginForm.style.display = 'none'
  userInfo.style.display = 'flex'
  userNameDisplay.textContent = `Bienvenido, ${nombre} - ${rol}`
}

// Manejar el cierre de sesión
logoutBtn.addEventListener('click', () => {
  window.localStorage.removeItem('usuario')
  window.localStorage.removeItem('rol')
  userInfo.style.display = 'none'
  loginForm.style.display = 'flex'
})

