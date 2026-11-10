const cotizacionRepository = require('./cotizacion.repository');
// Importamos el repositorio de productos para consultar los precios reales
const productoRepository = require('../productos/producto.repository');

async function createCotizacion(data) {
  const { id_cliente, id_usuario, validez_dias, detalles } = data;

  // 1. Validar que la cotización no venga vacía
  if (!detalles || detalles.length === 0) {
    const error = new Error('La cotización debe tener al menos un producto (detalle)');
    error.status = 400;
    throw error;
  }

  let monto_total = 0;
  const detallesProcesados = [];

  // 2. Procesar cada producto cotizado
  for (const item of detalles) {
    // Buscamos el producto en la BD para obtener su precio real
    const producto = await productoRepository.findById(item.id_producto);
    
    if (!producto) {
      const error = new Error(`El producto con ID ${item.id_producto} no existe en el sistema`);
      error.status = 404;
      throw error;
    }

    // Cálculos matemáticos
    const precio_unitario = Number(producto.precio_base);
    const cantidad = Number(item.cantidad);
    const subtotal = precio_unitario * cantidad;

    // Sumar al total de la cotización
    monto_total += subtotal;

    // Armar el detalle limpio para enviarlo al Repositorio
    detallesProcesados.push({
      id_producto: item.id_producto,
      cantidad: cantidad,
      precio_unitario: precio_unitario,
      subtotal: subtotal,
      especificaciones_personalizacion: item.especificaciones_personalizacion
    });
  }

  // 3. Empaquetar los datos del Maestro
  const nuevaCotizacion = {
    id_cliente,
    id_usuario: id_usuario, // Por ahora forzamos 1 (hasta que tengamos login con JWT)
    monto_total,
    validez_dias
  };

  // 4. Enviar a la base de datos (se ejecutará la Transacción SQL)
  return await cotizacionRepository.create(nuevaCotizacion, detallesProcesados);
}

async function getAllCotizaciones() {
  return await cotizacionRepository.findAll();
}

async function getCotizacionById(id) {
  const cotizacion = await cotizacionRepository.findById(id);
  if (!cotizacion) {
    const error = new Error('Cotización no encontrada');
    error.status = 404;
    throw error;
  }
  return cotizacion;
}

async function updateCotizacionStatus(id, estado) {
  // Verificar que la cotización exista
  await getCotizacionById(id);

  // Regla de negocio: Solo permitir ciertos estados
  const estadosPermitidos = ['PENDIENTE', 'APROBADA', 'RECHAZADA', 'VENCIDA'];
  if (!estadosPermitidos.includes(estado.toUpperCase())) {
    const error = new Error(`Estado no válido. Use: ${estadosPermitidos.join(', ')}`);
    error.status = 400;
    throw error;
  }

  await cotizacionRepository.updateStatus(id, estado.toUpperCase());
}

module.exports = {
  createCotizacion,
  getAllCotizaciones,
  getCotizacionById,
  updateCotizacionStatus
};