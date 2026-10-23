const pool = require("../../config/database");

async function findByEmail(correo) {
  const [rows] = await pool.execute(
    `SELECT
       id_usuario,
       nombre,
       correo,
       contrasena,
       id_rol_fk,
       estado
     FROM usuario
     WHERE correo = ?
     AND deleted_at IS NULL`,
    [correo]
  );

  return rows[0];
}

async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT
       id_usuario,
       nombre,
       correo,
       id_rol_fk,
       estado
     FROM usuario
     WHERE id_usuario = ?
     AND deleted_at IS NULL`,
    [id]
  );

  return rows[0];
}

module.exports = {
  findByEmail,
  findById
};
