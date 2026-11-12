const pool = require('../../config/database');

// 1. Crear producto
async function create(producto) {
  const { nombre, descripcion, precio_base, stock, categoria } = producto;
  const [result] = await pool.execute(
    `INSERT INTO productos (nombre, descripcion, precio_base, stock, categoria)
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, descripcion, precio_base, stock, categoria]
  );
  return result.insertId;
}

// 2. Buscar producto por nombre (Útil para evitar duplicar el mismo artículo)
async function findByName(nombre) {
  const [rows] = await pool.execute(
    'SELECT id_producto FROM productos WHERE nombre = ? AND deleted_at IS NULL',
    [nombre]
  );
  return rows[0];
}

// 3. Listar todos los productos activos
async function findAll() {
  const [rows] = await pool.execute(
    `SELECT id_producto, nombre, descripcion, precio_base, stock, categoria 
     FROM productos 
     WHERE deleted_at IS NULL
     ORDER BY nombre ASC`
  );
  return rows;
}

// 4. Buscar producto por ID
async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT id_producto, nombre, descripcion, precio_base, stock, categoria 
     FROM productos 
     WHERE id_producto = ? AND deleted_at IS NULL`,
    [id]
  );
  return rows[0];
}

// 5. Actualizar producto
async function update(id, producto) {
  const { nombre, descripcion = null, precio_base, stock, categoria } = producto;
  const [result] = await pool.execute(
    `UPDATE productos 
     SET nombre = ?, descripcion = ?, precio_base = ?, stock = ?, categoria = ?
     WHERE id_producto = ? AND deleted_at IS NULL`,
    [nombre, descripcion, precio_base, stock, categoria, id]
  );
  return result.affectedRows;
}

// 6. Eliminación lógica (Soft Delete)
async function softDelete(id) {
  const [result] = await pool.execute(
    `UPDATE productos 
     SET deleted_at = NOW() 
     WHERE id_producto = ? AND deleted_at IS NULL`,
    [id]
  );
  return result.affectedRows;
}

// 7. Restaurar producto eliminado (Deshacer Soft Delete)
async function restore(id) {
  const [result] = await pool.execute(
    `UPDATE productos 
     SET deleted_at = NULL 
     WHERE id_producto = ?`,
    [id]
  );
  return result.affectedRows;
}

module.exports = {
  create,
  findByName,
  findAll,
  findById,
  update,
  softDelete,
  restore
};