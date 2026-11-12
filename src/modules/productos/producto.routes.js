const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/auth.middleware');
const authorizeRoles = require('../../middlewares/role.middleware');
const productoController = require('./producto.controller');
const { 
  validateCreateProducto, 
  validateProductoId, 
  validateUpdateProducto 
} = require('./producto.validator');

// Protege todas las rutas de este módulo exigiendo un Token válido
router.use(authenticate);

// Crear un nuevo producto
router.post('/', authorizeRoles(1), validateCreateProducto, productoController.create);

// Obtener todos los productos
router.get('/', productoController.getAll);

// Obtener un producto específico por ID
router.get('/:id', validateProductoId, productoController.getById);

// Actualizar un producto
router.put('/:id', authorizeRoles(1), validateProductoId, validateUpdateProducto, productoController.update);

// Eliminar un producto (Soft Delete)
router.delete('/:id', authorizeRoles(1), validateProductoId, productoController.remove);

// Restaurar un producto eliminado
router.patch('/:id/restore', authorizeRoles(1), validateProductoId, productoController.restore);

module.exports = router;