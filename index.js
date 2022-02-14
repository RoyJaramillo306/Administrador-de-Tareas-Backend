const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();

conectarDB();

app.use(cors());

app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tareas', require('./routes/tarea'));
app.use('/api/actividades', require('./routes/actividadRoute'));

app.listen(PORT, () => {
    console.log('El servidor funciona en el puerto: ' + PORT);
});