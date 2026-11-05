const cotizacionService = require('./cotizacion.service');

// 1. Crear cotización
async function create(req, res, next) {
  try {
    const newCotizacionId = await cotizacionService.createCotizacion(req.body);
    return res.status(201).json({
      message: 'Cotización creada exitosamente',
      id_cotizacion: newCotizacionId
    });
  } catch (error) {
    next(error); // Pasa el error al middleware global de manejo de errores
  }
}

// 2. Obtener todas las cotizaciones
async function getAll(req, res, next) {
  try {
    const cotizaciones = await cotizacionService.getAllCotizaciones();
    return res.status(200).json(cotizaciones);
  } catch (error) {
    next(error);
  }
}

// 3. Obtener una cotización específica por ID (incluyendo sus productos)
async function getById(req, res, next) {
  try {
    const cotizacion = await cotizacionService.getCotizacionById(req.params.id);
    return res.status(200).json(cotizacion);
  } catch (error) {
    next(error);
  }
}

// 4. Actualizar el estado de la cotización
async function updateStatus(req, res, next) {
  try {
    await cotizacionService.updateCotizacionStatus(req.params.id, req.body.estado);
    return res.status(200).json({
      message: `Estado de la cotización actualizado a ${req.body.estado} exitosamente`
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  updateStatus
};