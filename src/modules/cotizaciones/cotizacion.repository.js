const pool = require('../../config/database');

// 1. Crear cotización (Maestro - Detalle con Transacción)
async function create(cotizacion, detalles) {
  // Obtenemos una conexión exclusiva del pool para esta transacción
  const connection = await pool.getConnection();
  
  try {
    // Iniciamos la transacción "Todo o nada"
    await connection.beginTransaction();

    // 1.1 Insertar la cotización (Maestro)
    const [resultMaestro] = await connection.execute(
      `INSERT INTO cotizaciones (id_cliente, id_usuario, monto_total, validez_dias, estado)
       VALUES (?, ?, ?, ?, ?)`,
      [
        cotizacion.id_cliente, 
        cotizacion.id_usuario, 
        cotizacion.monto_total, 
        cotizacion.validez_dias || 15, 
        'PENDIENTE'
      ]
    );

    const idCotizacion = resultMaestro.insertId;

    // 1.2 Insertar los detalles usando un bucle
    for (const detalle of detalles) {
      await connection.execute(
        `INSERT INTO detalle_cotizaciones (id_cotizacion, id_producto, cantidad, precio_unitario, subtotal, especificaciones_personalizacion)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          idCotizacion, 
          detalle.id_producto, 
          detalle.cantidad, 
          detalle.precio_unitario, 
          detalle.subtotal, 
          detalle.especificaciones_personalizacion || null
        ]
      );
    }

    // Si todo salió bien, confirmamos los cambios en la base de datos
    await connection.commit();
    return idCotizacion;

  } catch (error) {
    // Si algo falla, deshacemos cualquier cambio que se haya hecho
    await connection.rollback();
    throw error;
  } finally {
    // Liberamos la conexión para que otros usuarios la puedan usar
    connection.release();
  }
}

// 2. Listar todas las cotizaciones (Con el nombre del cliente para que sea útil)
async function findAll() {
  const [rows] = await pool.execute(
    `SELECT c.id_cotizacion, c.fecha_creacion, c.monto_total, c.estado, 
            cli.nombre AS cliente_nombre, cli.apellido AS cliente_apellido
     FROM cotizaciones c
     JOIN clientes cli ON c.id_cliente = cli.id_cliente
     ORDER BY c.fecha_creacion DESC`
  );
  return rows;
}

// 3. Buscar cotización por ID (Trae el maestro y sus detalles al mismo tiempo)
async function findById(id) {
  // Buscar datos generales
  const [cotizaciones] = await pool.execute(
    `SELECT c.*, cli.nombre AS cliente_nombre, cli.apellido AS cliente_apellido, cli.email AS cliente_email
     FROM cotizaciones c
     JOIN clientes cli ON c.id_cliente = cli.id_cliente
     WHERE c.id_cotizacion = ?`,
    [id]
  );
  
  if (cotizaciones.length === 0) return null;
  const cotizacion = cotizaciones[0];

  // Buscar los productos cotizados
  const [detalles] = await pool.execute(
    `SELECT d.*, p.nombre AS producto_nombre
     FROM detalle_cotizaciones d
     JOIN productos p ON d.id_producto = p.id_producto
     WHERE d.id_cotizacion = ?`,
    [id]
  );

  // Armamos un solo objeto que contiene todo
  cotizacion.detalles = detalles;
  return cotizacion;
}

// 4. Actualizar el estado de la cotización (ej. PENDIENTE -> APROBADA)
async function updateStatus(id, estado) {
  const [result] = await pool.execute(
    `UPDATE cotizaciones SET estado = ? WHERE id_cotizacion = ?`,
    [estado, id]
  );
  return result.affectedRows;
}

module.exports = {
  create,
  findAll,
  findById,
  updateStatus
};