const express = require('express');
const router = express.Router();
const clienteController = require('./cliente.controller');
const { 
  validateCreateCliente, 
  validateClienteId, 
  validateUpdateCliente 
} = require('./cliente.validator');

// Crear un nuevo cliente
router.post('/', validateCreateCliente, clienteController.create);

// Obtener todos los clientes
router.get('/', clienteController.getAll);

// Obtener un cliente específico por ID
router.get('/:id', validateClienteId, clienteController.getById);

// Actualizar un cliente
router.put('/:id', validateClienteId, validateUpdateCliente, clienteController.update);

// Eliminar un cliente (Soft Delete)
router.delete('/:id', validateClienteId, clienteController.remove);

module.exports = router;