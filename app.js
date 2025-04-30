const express = require("express");
const app = express();
const connectDB = require("./db");
const tasksRoutes = require("./routes/tasks");

// Conectar a la base de datos
connectDB();

// Middleware para leer JSON
app.use(express.json());

// Servir archivos estáticos (HTML, JS, CSS)
app.use(express.static("public"));

// Rutas de API
app.use("/api/tasks", tasksRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
