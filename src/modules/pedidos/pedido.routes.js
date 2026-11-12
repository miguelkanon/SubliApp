const express = require('express');
const router = express.Router();
const pedidoController = require('./pedido.controller');
const { 
  validateCreatePedido, 
  validatePedidoId, 
  validateUpdateEstadoPedido, 
  validateRegistrarPago 
} = require('./pedido.validator');
const authenticate = require('../../middlewares/auth.middleware');

// Crear un pedido a partir de una cotización
router.post('/',authenticate, validateCreatePedido, pedidoController.create);

// Obtener todos los pedidos
router.get('/',authenticate, pedidoController.getAll);

// Obtener un pedido específico
router.get('/:id',authenticate, validatePedidoId, pedidoController.getById);

// Actualizar estado logístico (Ej. PENDIENTE a EN_PRODUCCION)
router.patch('/:id/estado',authenticate, validatePedidoId, validateUpdateEstadoPedido, pedidoController.updateEstado);

// Registrar un pago o abono al pedido
router.post('/:id/pagos',authenticate, validatePedidoId, validateRegistrarPago, pedidoController.registrarPago);

module.exports = router;