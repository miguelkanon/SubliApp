const express = require('express');
const cors = require('cors');

const userRoutes = require('./modules/users/user.routes');
const errorHandler = require('./middlewares/error.middleware');
const authRoutes = require("./modules/auth/auth.routes");
const clienteRoutes = require('./modules/clientes/cliente.routes');
const productoRoutes = require('./modules/productos/producto.routes');
const cotizacionRoutes = require('./modules/cotizaciones/cotizacion.routes'); 
const pedidoRoutes = require('./modules/pedidos/pedido.routes');

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

// Rutas de clientes
app.use('/api/clientes', clienteRoutes);

// Rutas de productos
app.use('/api/productos', productoRoutes);

// Rutas de cotizacioness
app.use('/api/cotizaciones', cotizacionRoutes);

// Rutas de pedidos
app.use('/api/pedidos', pedidoRoutes);

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Ruta para manejar solicitudes a rutas no definidas
app.use((req, res, next) => {
  res.status(404).json({
    message: "La ruta solicitada no existe en SubliApp API"
  });
});

// Debe quedar despúes de las rutas, para que pueda capturar cualquier error que ocurra en ellas
// Middleware global de errores
app.use(errorHandler);
module.exports = app;