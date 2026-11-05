const clienteRepository = require('./cliente.repository');

async function createCliente(data) {
  // Regla de negocio: Evitar duplicidad de documento o correo
  const existing = await clienteRepository.findByDocumentOrEmail(data.numero_documento, data.email);
  if (existing) {
    const error = new Error('El documento o correo ya se encuentra registrado');
    error.status = 409; 
    throw error;
  }
  return await clienteRepository.create(data);
}

async function getAllClientes() {
  return await clienteRepository.findAll();
}

async function getClienteById(id) {
  const cliente = await clienteRepository.findById(id);
  if (!cliente) {
    const error = new Error('Cliente no encontrado');
    error.status = 404;
    throw error;
  }
  return cliente;
}

async function updateCliente(id, data) {
  // 1. Verificar que el cliente a actualizar realmente exista
  await getClienteById(id); 

  // 2. Verificar que los nuevos datos no choquen con otro cliente existente
  const existing = await clienteRepository.findByDocumentOrEmail(data.numero_documento, data.email);
  if (existing && existing.id_cliente !== Number(id)) {
    const error = new Error('El documento o correo ya está registrado en otro cliente');
    error.status = 409;
    throw error;
  }

  await clienteRepository.update(id, data);
}

async function deleteCliente(id) {
  // Verificar existencia antes de eliminar
  await getClienteById(id);
  await clienteRepository.softDelete(id);
}

module.exports = {
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
  deleteCliente
};