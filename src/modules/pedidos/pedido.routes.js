const express = require('express');
const router = express.Router();
const pedidoController = require('./pedido.controller');
const { 
  validateCreatePedido, 
  validatePedidoId, 
  validateUpdateEstadoPedido, 
  validateRegistrarPago 
} = require('./pedido.validator');
const { verificarToken } = require('../../middlewares/auth.middleware');

// Crear un pedido a partir de una cotización
router.post('/',verificarToken, validateCreatePedido, pedidoController.create);

// Obtener todos los pedidos
router.get('/',verificarToken, pedidoController.getAll);

// Obtener un pedido específico
router.get('/:id',verificarToken, validatePedidoId, pedidoController.getById);

// Actualizar estado logístico (Ej. PENDIENTE a EN_PRODUCCION)
router.patch('/:id/estado',verificarToken, validatePedidoId, validateUpdateEstadoPedido, pedidoController.updateEstado);

// Registrar un pago o abono al pedido
router.post('/:id/pagos',verificarToken, validatePedidoId, validateRegistrarPago, pedidoController.registrarPago);

module.exports = router;