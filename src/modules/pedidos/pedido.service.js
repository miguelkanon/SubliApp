const pedidoRepository = require('./pedido.repository');
const cotizacionRepository = require('../cotizaciones/cotizacion.repository'); 

async function createPedido(data) {
  const { id_cotizacion, fecha_entrega_estimada, monto_pagado, id_usuario } = data;

  // 1. Validar que la cotización origen exista
  const cotizacion = await cotizacionRepository.findById(id_cotizacion);
  if (!cotizacion) {
    const error = new Error(`La cotización con ID ${id_cotizacion} no existe`);
    error.status = 404;
    throw error;
  }

  // 2. Lógica de negocio: Calcular el estado de pago inicial
  const total = Number(cotizacion.monto_total);
  const abono = Number(monto_pagado) || 0;
  let estado_pago = 'PENDIENTE';

  if (abono > 0) {
    if (abono >= total) {
      estado_pago = 'COMPLETADO'; // <-- Ajustado a tu BD
    } else {
      estado_pago = 'PARCIAL';    // <-- Ajustado a tu BD
    }
  }

  // 3. Preparar los datos heredando información de la cotización
  const nuevoPedido = {
    id_cotizacion,
    id_cliente: cotizacion.id_cliente, 
    id_usuario,
    fecha_entrega_estimada,
    monto_total: total, 
    monto_pagado: abono,
    estado_pago
  };

  return await pedidoRepository.create(nuevoPedido);
}

async function getAllPedidos() {
  return await pedidoRepository.findAll();
}

async function getPedidoById(id) {
  const pedido = await pedidoRepository.findById(id);
  if (!pedido) {
    const error = new Error('Pedido no encontrado');
    error.status = 404;
    throw error;
  }
  return pedido;
}

// Actualizar la logística de producción
async function updateEstadoPedido(id, estado) {
  await getPedidoById(id);

  // <-- Ajustado a la regla estricta chk_pedidos_estado_pedido de tu BD
  const estadosPermitidos = [
    'EN_COLA', 'DISENO', 'IMPRESION', 'SUBLIMACION', 
    'CONTROL_CALIDAD', 'EMPAQUETADO', 'ENTREGADO', 'CANCELADO'
  ];
  
  if (!estadosPermitidos.includes(estado.toUpperCase())) {
    const error = new Error(`Estado logístico no válido. Use: ${estadosPermitidos.join(', ')}`);
    error.status = 400;
    throw error;
  }

  await pedidoRepository.updateEstadoPedido(id, estado.toUpperCase());
}

// Registrar abonos posteriores
async function registrarPago(id, monto_abono) {
  const pedido = await getPedidoById(id);
  
  const abono = Number(monto_abono);
  if (abono <= 0) {
    const error = new Error('El abono debe ser mayor a cero');
    error.status = 400;
    throw error;
  }

  const total = Number(pedido.monto_total);
  const pagado_actual = Number(pedido.monto_pagado);
  const nuevo_pagado = pagado_actual + abono;

  if (nuevo_pagado > total) {
    const error = new Error(`El abono supera el saldo pendiente. Saldo actual a pagar: ${total - pagado_actual}`);
    error.status = 400;
    throw error;
  }

  let nuevo_estado_pago = 'PARCIAL'; // <-- Ajustado a tu BD
  if (nuevo_pagado === total) {
    nuevo_estado_pago = 'COMPLETADO'; // <-- Ajustado a tu BD
  }

  await pedidoRepository.registrarPago(id, abono, nuevo_estado_pago);
  
  return { 
    nuevo_pagado, 
    nuevo_estado_pago, 
    saldo_pendiente: total - nuevo_pagado 
  };
}

module.exports = {
  createPedido,
  getAllPedidos,
  getPedidoById,
  updateEstadoPedido,
  registrarPago
};