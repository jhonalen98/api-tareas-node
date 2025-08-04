// data/tareas.db.js

let tareas = [];
let idActual = 1;

function obtenerTodas() {
    return tareas;
}

function obtenerPorId(id) {
    return tareas.find(t => t.id === id);
}

function crear(titulo, descripcion) {
    const nuevaTarea = { id: idActual++, titulo, descripcion };
    tareas.push(nuevaTarea);
    return nuevaTarea;
}

function actualizar(id, datos) {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return null;
    if (datos.titulo !== undefined) tarea.titulo = datos.titulo;
    if (datos.descripcion !== undefined) tarea.descripcion = datos.descripcion;
    return tarea;
}

function eliminar(id) {
    const index = tareas.findIndex(t => t.id === id);
    if (index === -1) return false;
    tareas.splice(index, 1);
    return true;
}

module.exports = {
    obtenerTodas,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};
