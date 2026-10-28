const express = require('express');
const cors = require('cors');

const userRoutes = require('./modules/users/user.routes');
const errorHandler = require('./middlewares/error.middleware');
const authRoutes = require("./modules/auth/auth.routes");

const app = express();

// Configuración de CORS y middleware para parsear JSON
app.use(cors());
app.use(express.json());

// Comprobación del servidor
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'SubliApp API is running'
});
});

// Rutas de usuarios
app.use('/api/users', userRoutes);// Usar las rutas de usuarios para cualquier solicitud que comience con /api/users

// Rutas de autenticación
app.use("/api/auth", authRoutes);


// Debe quedar despúes de las rutas, para que pueda capturar cualquier error que ocurra en ellas
// Middleware global de errores
app.use(errorHandler);
module.exports = app;