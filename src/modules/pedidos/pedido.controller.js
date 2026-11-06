const pedidoService = require('./pedido.service');

// 1. Crear un pedido (desde una cotización)
async function create(req, res, next) {
  try {
    const newPedidoId = await pedidoService.createPedido(req.body);
    return res.status(201).json({
      message: 'Pedido creado exitosamente',
      id_pedido: newPedidoId
    });
  } catch (error) {
    next(error); // Pasamos el error al manejador global
  }
}

// 2. Obtener todos los pedidos
async function getAll(req, res, next) {
  try {
    const pedidos = await pedidoService.getAllPedidos();
    return res.status(200).json(pedidos);
  } catch (error) {
    next(error);
  }
}

// 3. Obtener un pedido específico por ID
async function getById(req, res, next) {
  try {
    const pedido = await pedidoService.getPedidoById(req.params.id);
    return res.status(200).json(pedido);
  } catch (error) {
    next(error);
  }
}

// 4. Actualizar el estado logístico del pedido (producción, entrega, etc.)
async function updateEstado(req, res, next) {
  try {
    await pedidoService.updateEstadoPedido(req.params.id, req.body.estado);
    return res.status(200).json({
      message: `Estado logístico del pedido actualizado a ${req.body.estado} exitosamente`
    });
  } catch (error) {
    next(error);
  }
}

// 5. Registrar un pago o abono
async function registrarPago(req, res, next) {
  try {
    const resultado = await pedidoService.registrarPago(req.params.id, req.body.monto_abono);
    return res.status(200).json({
      message: 'Abono registrado exitosamente',
      detalles_pago: resultado // Mostrará cuánto pagó, cuánto debe y si ya está 'PAGADO'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  updateEstado,
  registrarPago
};