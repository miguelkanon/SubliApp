const clienteService = require('./cliente.service');

// 1. Crear cliente
async function create(req, res, next) {
  try {
    const newClienteId = await clienteService.createCliente(req.body);
    return res.status(201).json({
      message: 'Cliente creado exitosamente',
      id_cliente: newClienteId
    });
  } catch (error) {
    next(error); // Pasa el error al middleware global
  }
}

// 2. Obtener todos los clientes
async function getAll(req, res, next) {
  try {
    const clientes = await clienteService.getAllClientes();
    return res.status(200).json(clientes);
  } catch (error) {
    next(error);
  }
}

// 3. Obtener un cliente por ID
async function getById(req, res, next) {
  try {
    const cliente = await clienteService.getClienteById(req.params.id);
    return res.status(200).json(cliente);
  } catch (error) {
    next(error);
  }
}

// 4. Actualizar cliente
async function update(req, res, next) {
  try {
    await clienteService.updateCliente(req.params.id, req.body);
    return res.status(200).json({
      message: 'Cliente actualizado exitosamente'
    });
  } catch (error) {
    next(error);
  }
}

// 5. Eliminar cliente (Soft Delete)
async function remove(req, res, next) {
  try {
    await clienteService.deleteCliente(req.params.id);
    return res.status(200).json({
      message: 'Cliente eliminado exitosamente'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove
};