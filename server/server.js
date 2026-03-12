const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas a los archivos de datos (subimos un nivel desde /backend)
const videojuegosPath = path.join(__dirname, "..", "data", "videojuegos.json");
const usuariosPath = path.join(__dirname, "..", "data", "usuarios.json");

// --- Endpoints de datos ---

// Todos los videojuegos (estructura igual a videojuegos.json)
app.get("/api/videojuegos", (req, res) => {
  fs.readFile(videojuegosPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error leyendo videojuegos.json", err);
      return res
        .status(500)
        .json({ error: "Error interno al leer videojuegos" });
    }

    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (parseErr) {
      console.error("Error parseando videojuegos.json", parseErr);
      res.status(500).json({ error: "Error de formato en videojuegos" });
    }
  });
});

// Videojuego por id
app.get("/api/videojuegos/:id", (req, res) => {
  fs.readFile(videojuegosPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error leyendo videojuegos.json", err);
      return res
        .status(500)
        .json({ error: "Error interno al leer videojuegos" });
    }

    try {
      const json = JSON.parse(data);
      const todos = Object.values(json).flat();
      const id = parseInt(req.params.id, 10);
      const juego = todos.find((j) => j.id === id);

      if (!juego) {
        return res.status(404).json({ error: "Videojuego no encontrado" });
      }

      res.json(juego);
    } catch (parseErr) {
      console.error("Error parseando videojuegos.json", parseErr);
      res.status(500).json({ error: "Error de formato en videojuegos" });
    }
  });
});

// Usuarios completos
app.get("/api/usuarios", (req, res) => {
  fs.readFile(usuariosPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error leyendo usuarios.json", err);
      return res.status(500).json({ error: "Error interno al leer usuarios" });
    }

    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (parseErr) {
      console.error("Error parseando usuarios.json", parseErr);
      res.status(500).json({ error: "Error de formato en usuarios" });
    }
  });
});

// Login minimalista: devuelve el usuario si las credenciales son correctas
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  fs.readFile(usuariosPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error leyendo usuarios.json", err);
      return res.status(500).json({ error: "Error interno al leer usuarios" });
    }

    try {
      const json = JSON.parse(data);
      const usuario = json.usuarios.find(
        (u) => u.username === username && u.password === password,
      );

      if (!usuario) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      res.json(usuario);
    } catch (parseErr) {
      console.error("Error parseando usuarios.json", parseErr);
      res.status(500).json({ error: "Error de formato en usuarios" });
    }
  });
});

// --- Servir frontend estático desde la raíz del proyecto ---

app.use(express.static(path.join(__dirname, "..")));

// Fallback a index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
