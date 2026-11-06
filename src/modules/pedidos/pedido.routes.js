const express = require('express');
const router = express.Router();
const pedidoController = require('./pedido.controller');
const { 
  validateCreatePedido, 
  validatePedidoId, 
  validateUpdateEstadoPedido, 
  validateRegistrarPago 
} = require('./pedido.validator');

// Crear un pedido a partir de una cotización
router.post('/', validateCreatePedido, pedidoController.create);

// Obtener todos los pedidos
router.get('/', pedidoController.getAll);

// Obtener un pedido específico
router.get('/:id', validatePedidoId, pedidoController.getById);

// Actualizar estado logístico (Ej. PENDIENTE a EN_PRODUCCION)
router.patch('/:id/estado', validatePedidoId, validateUpdateEstadoPedido, pedidoController.updateEstado);

// Registrar un pago o abono al pedido
router.post('/:id/pagos', validatePedidoId, validateRegistrarPago, pedidoController.registrarPago);

module.exports = router;