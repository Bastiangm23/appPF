const express = require("express");
const Task = require("../models/task");
const router = express.Router();

// Crear tarea
router.post("/", async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const newTask = new Task({ title, description, completed });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: "Error al crear la tarea" });
  }
});

// Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener las tareas" });
  }
});

// Obtener una tarea por ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener la tarea" });
  }
});

// Actualizar tarea
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar la tarea" });
  }
});

// Eliminar tarea
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar la tarea" });
  }
});

module.exports = router;
