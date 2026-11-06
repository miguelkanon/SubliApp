// Validar la creación del pedido
function validateCreatePedido(req, res, next) {
  const { id_cotizacion, monto_pagado, fecha_entrega_estimada } = req.body;

  // 1. Validar que venga la cotización base
  if (!id_cotizacion || !Number.isInteger(Number(id_cotizacion))) {
    return res.status(400).json({ 
      message: 'El id_cotizacion es obligatorio y debe ser un número entero válido' 
    });
  }

  // 2. Validar el abono inicial (si lo envían)
  if (monto_pagado !== undefined) {
    const abono = Number(monto_pagado);
    if (isNaN(abono) || abono < 0) {
      return res.status(400).json({ 
        message: 'El monto_pagado debe ser un número mayor o igual a cero' 
      });
    }
  }

  // 3. Validar formato básico de fecha si se incluye (YYYY-MM-DD)
  if (fecha_entrega_estimada) {
    const dateParsed = Date.parse(fecha_entrega_estimada);
    if (isNaN(dateParsed)) {
      return res.status(400).json({ 
        message: 'La fecha_entrega_estimada debe tener un formato válido (ej. YYYY-MM-DD)' 
      });
    }
  }

  next();
}

// Validar que el ID de la URL sea correcto
function validatePedidoId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ 
      message: 'El ID del pedido no es válido' 
    });
  }
  next();
}

// Validar actualización de estado logístico
function validateUpdateEstadoPedido(req, res, next) {
  const { estado } = req.body;
  if (!estado || typeof estado !== 'string') {
    return res.status(400).json({ 
      message: 'El campo estado es obligatorio y debe ser un texto' 
    });
  }
  next();
}

// Validar registro de un nuevo pago
function validateRegistrarPago(req, res, next) {
  const { monto_abono } = req.body;
  
  if (monto_abono === undefined || isNaN(Number(monto_abono)) || Number(monto_abono) <= 0) {
    return res.status(400).json({ 
      message: 'El monto_abono es obligatorio y debe ser un número mayor a cero' 
    });
  }
  
  next();
}

module.exports = {
  validateCreatePedido,
  validatePedidoId,
  validateUpdateEstadoPedido,
  validateRegistrarPago
};