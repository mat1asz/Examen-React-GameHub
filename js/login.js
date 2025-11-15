const URL_USUARIOS = './data/usuarios.json'
const loginForm = document.getElementById('loginForm')
const userInfo = document.getElementById('userInfo')
const userNameDisplay = document.getElementById('userNameDisplay')
const logoutBtn = document.getElementById('logoutBtn')

// Mostrar el nombre de usuario almacenado al cargar la página
const currentUser = window.localStorage.getItem('usuario')
const currentRole = window.localStorage.getItem('rol')

if (currentUser) {
  mostrarUsuario(currentUser, currentRole)
} else {
  loginForm.style.display = 'flex'
}

// Función para validar el login
const validarUsuario = async (username, password) => {
  try {
    const response = await fetch(URL_USUARIOS)
    const datos = await response.json()
    return datos.usuarios.find(user => user.username === username && user.password === password)
  } catch (error) {
    console.error('Error al cargar el archivo de usuarios:', error)
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

