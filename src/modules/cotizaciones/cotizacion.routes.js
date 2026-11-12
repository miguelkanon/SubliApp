const express = require('express');
const router = express.Router();
const cotizacionController = require('./cotizacion.controller');
const { 
  validateCreateCotizacion, 
  validateCotizacionId, 
  validateUpdateEstado 
} = require('./cotizacion.validator');
const authenticate = require('../../middlewares/auth.middleware');

// Crear una nueva cotización (Maestro-Detalle)
router.post('/', authenticate, validateCreateCotizacion, cotizacionController.create);

// Obtener todas las cotizaciones
router.get('/', authenticate, cotizacionController.getAll);

// Obtener una cotización específica por ID (incluye el detalle de productos)
router.get('/:id', authenticate, validateCotizacionId, cotizacionController.getById);

// Actualizar únicamente el estado de la cotización
router.patch('/:id/estado', authenticate, validateCotizacionId, validateUpdateEstado, cotizacionController.updateStatus);

module.exports = router;