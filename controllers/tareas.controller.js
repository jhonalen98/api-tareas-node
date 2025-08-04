// controllers/tareas.controller.js

const db = require('../data/tareas.db');

function getTodas(req, res) {
    res.json(db.obtenerTodas());
}

function getUna(req, res) {
    const id = parseInt(req.params.id);
    const tarea = db.obtenerPorId(id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(tarea);
}

function postTarea(req, res) {
    const { titulo, descripcion } = req.body;
    const nueva = db.crear(titulo, descripcion);
    res.status(201).json(db.obtenerTodas());
}

function putTarea(req, res) {
    const id = parseInt(req.params.id);
    const actualizada = db.actualizar(id, req.body);
    if (!actualizada) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(actualizada);
}

function deleteTarea(req, res) {
    const id = parseInt(req.params.id);
    const eliminada = db.eliminar(id);
    if (!eliminada) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.status(204).send();
}

module.exports = {
    getTodas,
    getUna,
    postTarea,
    putTarea,
    deleteTarea
};
