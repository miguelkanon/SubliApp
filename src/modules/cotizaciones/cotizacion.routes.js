const express = require('express');
const router = express.Router();
const cotizacionController = require('./cotizacion.controller');
const { 
  validateCreateCotizacion, 
  validateCotizacionId, 
  validateUpdateEstado 
} = require('./cotizacion.validator');

// Crear una nueva cotización (Maestro-Detalle)
router.post('/', validateCreateCotizacion, cotizacionController.create);

// Obtener todas las cotizaciones
router.get('/', cotizacionController.getAll);

// Obtener una cotización específica por ID (incluye el detalle de productos)
router.get('/:id', validateCotizacionId, cotizacionController.getById);

// Actualizar únicamente el estado de la cotización
router.patch('/:id/estado', validateCotizacionId, validateUpdateEstado, cotizacionController.updateStatus);

module.exports = router;