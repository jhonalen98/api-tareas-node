// routes/tareas.routes.js

const express = require('express');
const router = express.Router();
const controlador = require('../controllers/tareas.controller');

router.get('/', controlador.getTodas);
router.get('/:id', controlador.getUna);
router.post('/', controlador.postTarea);
router.put('/:id', controlador.putTarea);
router.delete('/:id', controlador.deleteTarea);

module.exports = router;
