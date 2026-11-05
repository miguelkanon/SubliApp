const pool = require('../../config/database');

// 1. Crear cliente
async function create(cliente) {
  const { nombre, apellido, tipo_documento, numero_documento, email, telefono, direccion } = cliente;
  const [result] = await pool.execute(
    `INSERT INTO clientes (nombre, apellido, tipo_documento, numero_documento, email, telefono, direccion)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, apellido, tipo_documento, numero_documento, email, telefono, direccion]
  );
  return result.insertId;
}

// 2. Buscar si documento o correo ya existen (Para validaciones)
async function findByDocumentOrEmail(numero_documento, email) {
  const [rows] = await pool.execute(
    'SELECT id_cliente FROM clientes WHERE (numero_documento = ? OR email = ?) AND deleted_at IS NULL',
    [numero_documento, email]
  );
  return rows[0]; // Retorna el registro si existe, o undefined si no
}

// 3. Listar todos los clientes activos
async function findAll() {
  const [rows] = await pool.execute(
    `SELECT id_cliente, nombre, apellido, tipo_documento, numero_documento, email, telefono, direccion, fecha_creacion 
     FROM clientes 
     WHERE deleted_at IS NULL
     ORDER BY nombre ASC`
  );
  return rows;
}

// 4. Buscar cliente por ID
async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT id_cliente, nombre, apellido, tipo_documento, numero_documento, email, telefono, direccion, fecha_creacion 
     FROM clientes 
     WHERE id_cliente = ? AND deleted_at IS NULL`,
    [id]
  );
  return rows[0];
}

// 5. Actualizar cliente
async function update(id, cliente) {
  const { nombre, apellido, tipo_documento, numero_documento, email, telefono, direccion } = cliente;
  const [result] = await pool.execute(
    `UPDATE clientes 
     SET nombre = ?, apellido = ?, tipo_documento = ?, numero_documento = ?, email = ?, telefono = ?, direccion = ?
     WHERE id_cliente = ? AND deleted_at IS NULL`,
    [nombre, apellido, tipo_documento, numero_documento, email, telefono, direccion, id]
  );
  return result.affectedRows;
}

// 6. Eliminación lógica (Soft Delete)
async function softDelete(id) {
  const [result] = await pool.execute(
    `UPDATE clientes 
     SET deleted_at = NOW() 
     WHERE id_cliente = ? AND deleted_at IS NULL`,
    [id]
  );
  return result.affectedRows;
}

module.exports = {
  create,
  findByDocumentOrEmail,
  findAll,
  findById,
  update,
  softDelete
};