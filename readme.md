## Examen Práctico - React GameHub (versión corta)

**Objetivo general**  
Migrar la app GameHub (hecha en JS vanilla) a una **SPA en React**, reutilizando la **API Express** existente.

---

### 1. Qué hay en el repo

- **Versión referencia (NO tocar)**: `index.html`, `juego.html`, `css/`, `js/`, `data/`.
- **API Express**: carpeta `server/`, base URL `http://localhost:3000/api/`.
- **Proyecto React**: carpeta `react/`, creado con Vite + React Router.

Tu trabajo es construir la versión en React tomando como modelo la versión vanilla.

---

### 2. Qué debe tener tu app React

- **Routing (React Router)**  
  - `/` → catálogo de videojuegos.  
  - `/juegos/:id` → detalle de un videojuego.

- **Consumo de API (fetch desde React)**  
  - Usar siempre `http://localhost:3000/api/`.  
  - Al menos: `GET /videojuegos` y `GET /videojuegos/:id`.  
  - Manejar **loading**, **error** y **datos vacíos**.

- **Catálogo (`/`)**  
  - Mostrar videojuegos agrupados por plataforma (como en `index.html`).  
  - Ocultar secciones sin datos o mostrar “sin resultados”.

- **Detalle (`/juegos/:id`)**  
  - Mostrar la información principal del juego (datos generales, requisitos, listas varias).  
  - Manejar juego no encontrado.

- **Login sencillo**  
  - Replicar la lógica de `js/login.js` usando React.  
  - Consumir `GET /usuarios` **o** `POST /login`.  
  - Guardar usuario/rol en un **AuthContext** y en `localStorage`.  
  - Mostrar formulario si no hay usuario, datos y botón “Cerrar sesión” si lo hay.

---

### 3. React: piezas mínimas

- **Hooks**: `useState`, `useEffect`, `useContext`.
- **Custom hooks**:
  - `useGames` para la lógica de carga de videojuegos.
  - `useAuth` para acceder al contexto de autenticación.
- **Context**:
  - `AuthContext` con usuario logueado y acciones `login` / `logout`.
- **Componentes y páginas clave** (al menos estos archivos):
  - `src/main.jsx`, `src/App.jsx`.  
  - `src/components/Layout.jsx`, `src/components/GameCard.jsx`.  
  - `src/pages/HomePage.jsx`, `src/pages/GameDetailPage.jsx`.  
  - `src/context/AuthContext.jsx`.  
  - `src/hooks/useGames.js`, `src/hooks/useAuth.js`.

Puedes crear más componentes/hooks si lo ves necesario.

---

### 4. Cómo ejecutar todo

1. **API Express**

   ```bash
   cd server
   npm install
   npm run dev
   ```

   La API escucha en `http://localhost:3000`.

2. **App React**

   ```bash
   cd react
   npm install
   npm run dev
   ```

   Abre la URL que muestre Vite (normalmente `http://localhost:5173`).

3. **Comprobación rápida**
   - Prueba `http://localhost:3000/api/videojuegos` en el navegador.  
   - Comprueba que React consume `http://localhost:3000/api/...`.

---

### 5. Reglas básicas del examen

- **No modificar**:
  - La versión vanilla (`index.html`, `juego.html`, `js/*.js`, `css/style.css`, `data/*.json`) salvo indicación del docente.
  - El comportamiento de la API en `server/server.js`.
- **Sí puedes**:
  - Crear componentes, hooks, contextos y estilos adicionales en React.

Para ver **cómo se puntúa** el examen, consulta `rubricas.md`.

