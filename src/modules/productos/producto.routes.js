const express = require('express');
const router = express.Router();
const productoController = require('./producto.controller');
const { 
  validateCreateProducto, 
  validateProductoId, 
  validateUpdateProducto 
} = require('./producto.validator');

// Crear un nuevo producto
router.post('/', validateCreateProducto, productoController.create);

// Obtener todos los productos
router.get('/', productoController.getAll);

// Obtener un producto específico por ID
router.get('/:id', validateProductoId, productoController.getById);

// Actualizar un producto
router.put('/:id', validateProductoId, validateUpdateProducto, productoController.update);

// Eliminar un producto (Soft Delete)
router.delete('/:id', validateProductoId, productoController.remove);

module.exports = router;