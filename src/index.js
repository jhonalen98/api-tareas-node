// src/index.js
import express from 'express';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config();
const app = express();
app.use(express.json());

// GET todas las tareas
app.get('/tareas', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM tareas ORDER BY id ASC;');
  res.json(rows);
});

// GET una tarea por id
app.get('/tareas/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM tareas WHERE id = $1;', [id]);
  if (rows.length === 0) return res.status(404).json({ error: 'No encontrada' });
  res.json(rows[0]);
});

// POST crear tarea
app.post('/tareas', async (req, res) => {
  const { titulo, completada } = req.body;
  await pool.query(
    'INSERT INTO tareas (titulo, completada) VALUES ($1, $2);',
    [titulo, completada ?? false]
  );
  const { rows } = await pool.query('SELECT * FROM tareas ORDER BY id ASC;');
  res.status(201).json(rows);
});

// PUT actualizar tarea
app.put('/tareas/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, completada } = req.body;
  const { rows } = await pool.query(
    `UPDATE tareas
     SET titulo = COALESCE($2, titulo),
         completada = COALESCE($3, completada),
         actualizado_en = NOW()
     WHERE id = $1
     RETURNING *;`,
    [id, titulo, completada]
  );
  if (rows.length === 0) return res.status(404).json({ error: 'No encontrada' });
  res.json(rows[0]);
});

// DELETE eliminar tarea
app.delete('/tareas/:id', async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query('DELETE FROM tareas WHERE id = $1;', [id]);
  if (rowCount === 0) return res.status(404).json({ error: 'No encontrada' });
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
