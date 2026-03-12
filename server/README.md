## Servidor Express - GameHub API

Este directorio contiene el **servidor Express** que expone la API que deberá consumir la aplicación React en el examen.

La API lee los datos desde los archivos JSON ubicados en `../data/videojuegos.json` y `../data/usuarios.json`.

---

### 1. Requisitos previos

- Node.js 18+ instalado.
- npm (gestor de paquetes de Node).

---

### 2. Instalación de dependencias

Desde este directorio (`server/`), ejecutar:

```bash
npm install
```

Esto instalará las dependencias definidas en `package.json` (`express`, `cors`, y `nodemon` para desarrollo).

---

### 3. Scripts disponibles

- **Servidor en modo producción (simple)**:

  ```bash
  npm start
  ```

  - Lanza el servidor con:
  - URL base: `http://localhost:3000`

- **Servidor en modo desarrollo (con recarga automática)**:

  ```bash
  npm run dev
  ```

  - Usa `nodemon` para reiniciar el servidor automáticamente cuando cambie `server.js`.

---

### 4. Endpoints disponibles

Todos los endpoints comparten la URL base:

```text
http://localhost:3000/api
```

#### 4.1. `GET /api/videojuegos`

- **Descripción**: Devuelve todos los videojuegos agrupados por plataforma.
- **Respuesta**: Objeto cuyas claves son las plataformas y los valores son arrays de videojuegos.
- **Ejemplo de respuesta simplificada**:

```json
{
  "PC": [
    {
      "id": 1,
      "nombre": "Juego A",
      "desarrollador": "Estudio X",
      "año": 2023,
      "genero": "Acción",
      "imagen": "url_de_imagen",
      "dlcs_incluidos": [/* ... */]
    }
  ],
  "PlayStation": [/* ... */],
  "Xbox": [/* ... */],
  "Nintendo": [/* ... */]
}
```

#### 4.2. `GET /api/videojuegos/:id`

- **Descripción**: Devuelve el detalle de un videojuego específico por `id`.
- **Parámetros de ruta**:
  - `id` (number): identificador del videojuego.
- **Respuesta**:
  - `200 OK` con el objeto del videojuego cuando existe.
  - `404 Not Found` cuando el videojuego no existe.

#### 4.3. `GET /api/usuarios`

- **Descripción**: Devuelve la lista de usuarios registrados (para validación de login en el frontend vanilla).
- **Respuesta**:

```json
{
  "usuarios": [
    {
      "username": "admin",
      "password": "1234",
      "firstName": "Nombre",
      "lastName": "Apellido",
      "rol": "admin"
    }
  ]
}
```

#### 4.4. `POST /api/login`

- **Descripción**: Login minimalista. Verifica credenciales y devuelve el usuario si son correctas.
- **Body (JSON)**:

```json
{
  "username": "admin",
  "password": "1234"
}
```

- **Respuestas posibles**:
  - `200 OK` con el objeto del usuario cuando las credenciales son válidas.
  - `401 Unauthorized` cuando las credenciales no son válidas.

---

### 5. Servir el frontend estático (referencia)

Actualmente, el servidor también está configurado para servir el frontend JS vanilla desde la raíz del proyecto:

- Archivos estáticos desde: `../` (raíz del repo).
- Cualquier ruta no reconocida responde con `index.html`.

Esto permite probar la versión JS vanilla de GameHub directamente contra esta API.

---

### 6. Uso esperado en el examen

En el examen, el/la estudiante **no debe modificar** este servidor (salvo que el enunciado indique explícitamente lo contrario).

Su tarea principal será:

- Consumir estos endpoints desde la nueva aplicación **React** ubicada en `../react/`.
- Usar `http://localhost:3000/api/...` como base para todas las llamadas a la API en React.

# Backend GameHub (Express)

Backend minimalista en **Node.js + Express** para el proyecto educativo GameHub.  
Expone los mismos datos que antes se leían desde los archivos estáticos `data/videojuegos.json` y `data/usuarios.json`.

## Estructura

- `server/server.js`: servidor Express con todos los endpoints.
- `server/package.json`: configuración de npm y dependencias del backend.
- `data/videojuegos.json`: datos de videojuegos (se lee desde el backend).
- `data/usuarios.json`: datos de usuarios (se lee desde el backend).

## Endpoints disponibles

- `GET /api/videojuegos`  
  Devuelve el objeto completo de videojuegos (agrupado por plataforma).

- `GET /api/videojuegos/:id`  
  Devuelve un único videojuego según su `id`.

- `GET /api/usuarios`  
  Devuelve el listado de usuarios.

- `POST /api/login`  
  Recibe `{ "username": string, "password": string }` y devuelve el usuario si las credenciales son correctas.

## Puesta en marcha

1. Ir a la carpeta del backend:

   ```bash
   cd backend
   ```

2. Instalar dependencias (solo la primera vez):

   ```bash
   npm install
   ```

3. Levantar el servidor:

   ```bash
   npm start
   ```

4. Abrir el navegador en:

   - `http://localhost:3000/` para ver el frontend (servido por Express desde la raíz del proyecto).
   - `http://localhost:3000/api/videojuegos` para comprobar la API de videojuegos.
   - `http://localhost:3000/api/usuarios` para comprobar la API de usuarios.

## Notas

- El servidor asume que se ejecuta desde la carpeta `backend` y que existe una carpeta `data` en el nivel superior con los JSON.
- El frontend ya puede consumir estos endpoints usando URLs como `http://localhost:3000/api/videojuegos`.

