// index.js

const express = require('express');
const app = express();
const tareasRouter = require('./routes/tareas.routes');

app.use(express.json());
app.use('/tareas', tareasRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});
