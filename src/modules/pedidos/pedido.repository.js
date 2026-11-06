const pool = require('../../config/database');

// 1. Crear un nuevo pedido (generalmente a partir de una cotización aprobada)
async function create(pedido) {
  const [result] = await pool.execute(
    `INSERT INTO pedidos (
      id_cotizacion, id_cliente, id_usuario, fecha_entrega_estimada, 
      monto_total, monto_pagado, estado_pedido, estado_pago
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      pedido.id_cotizacion,
      pedido.id_cliente,
      pedido.id_usuario,
      pedido.fecha_entrega_estimada || null,
      pedido.monto_total,
      pedido.monto_pagado || 0,
      'EN_COLA', // <-- Ajustado al estado de tu BD
      pedido.estado_pago // <-- Calculado inteligentemente en el servicio
    ]
  );
  return result.insertId;
}

// 2. Listar todos los pedidos con información clave del cliente
async function findAll() {
  const [rows] = await pool.execute(
    `SELECT p.id_pedido, p.id_cotizacion, p.fecha_entrega_estimada, 
            p.monto_total, p.monto_pagado, p.estado_pedido, p.estado_pago,
            c.nombre AS cliente_nombre, c.apellido AS cliente_apellido
     FROM pedidos p
     JOIN clientes c ON p.id_cliente = c.id_cliente
     ORDER BY p.fecha_creacion DESC`
  );
  return rows;
}

// 3. Buscar pedido por ID
async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT p.*, c.nombre AS cliente_nombre, c.apellido AS cliente_apellido
     FROM pedidos p
     JOIN clientes c ON p.id_cliente = c.id_cliente
     WHERE p.id_pedido = ?`,
    [id]
  );
  return rows[0] || null;
}

// 4. Actualizar estado logístico del pedido (Ej. PENDIENTE -> EN_PRODUCCION)
async function updateEstadoPedido(id, estado_pedido) {
  const [result] = await pool.execute(
    `UPDATE pedidos SET estado_pedido = ? WHERE id_pedido = ?`,
    [estado_pedido, id]
  );
  return result.affectedRows;
}

// 5. Registrar un pago/abono (Actualiza monto_pagado y estado_pago)
async function registrarPago(id, monto_adicional, nuevo_estado_pago) {
  const [result] = await pool.execute(
    `UPDATE pedidos 
     SET monto_pagado = monto_pagado + ?, 
         estado_pago = ? 
     WHERE id_pedido = ?`,
    [monto_adicional, nuevo_estado_pago, id]
  );
  return result.affectedRows;
}

module.exports = {
  create,
  findAll,
  findById,
  updateEstadoPedido,
  registrarPago
};