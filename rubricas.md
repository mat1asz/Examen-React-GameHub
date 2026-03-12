## Rúbrica corta - Examen React GameHub

Puntaje total sugerido: **100 puntos**.  
Puedes ajustar valores según tu curso.

---

### 1. Routing y SPA (20 pts)

- Rutas principales con React Router (`/`, `/juegos/:id`).  
- Navegación sin recargar la página.  
- Manejo simple de ruta no encontrada (404).

---

### 2. Consumo de API y estado (25 pts)

- Uso correcto de la API `http://localhost:3000/api/` (`/videojuegos`, `/videojuegos/:id`, `/usuarios` o `/login`).  
- Uso de hooks básicos (`useState`, `useEffect`).  
- Estados diferenciados de **datos**, **loading** y **error** (incluye casos de datos vacíos).

---

### 3. Páginas y componentes principales (20 pts)

- `HomePage`: catálogo agrupado por plataforma, usando un componente tipo `GameCard`.  
- `GameDetailPage`: muestra la información clave del juego y maneja juego inexistente.  
- Componentes reutilizables y estructura razonable de carpetas.

---

### 4. Autenticación y Context (20 pts)

- `AuthContext` con usuario logueado y acciones `login` / `logout`.  
- Login contra la API (`/usuarios` o `/login`) con mensajes de error claros.  
- Persistencia en `localStorage` y cierre de sesión correcto.

---

### 5. Custom hooks, estilo y calidad (15 pts)

- `useGames` y `useAuth` para encapsular la lógica de datos y autenticación.  
- Código legible (nombres claros, indentación, etc.).  
- UX aceptable: estados de carga/error visibles, botones/enlaces entendibles, estilo coherente con GameHub.

---

### 6. Desaprobación automática (orientativa)

Se puede considerar el examen **no aprobado** si ocurre alguno de estos casos:

- La app React no se puede ejecutar o falla en la navegación básica.  
- No se consume la API (todos los datos están hardcodeados).  
- No se usa React Router (todo en una sola pantalla).  
- No se utilizan hooks básicos (`useState`, `useEffect`).  
- Copia casi literal del código vanilla incrustado en React sin adaptación a componentes/estado.
