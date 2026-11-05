const productoRepository = require('./producto.repository');

async function createProducto(data) {
  // Regla de negocio: Evitar productos duplicados por nombre
  const existing = await productoRepository.findByName(data.nombre);
  if (existing) {
    const error = new Error('Ya existe un producto registrado con este nombre');
    error.status = 409; 
    throw error;
  }
  return await productoRepository.create(data);
}

async function getAllProductos() {
  return await productoRepository.findAll();
}

async function getProductoById(id) {
  const producto = await productoRepository.findById(id);
  if (!producto) {
    const error = new Error('Producto no encontrado');
    error.status = 404;
    throw error;
  }
  return producto;
}

async function updateProducto(id, data) {
  // 1. Verificar que el producto a actualizar realmente exista
  await getProductoById(id); 

  // 2. Verificar que el nuevo nombre no choque con otro producto ya existente
  const existing = await productoRepository.findByName(data.nombre);
  if (existing && existing.id_producto !== Number(id)) {
    const error = new Error('El nombre ya está en uso por otro producto');
    error.status = 409;
    throw error;
  }

  await productoRepository.update(id, data);
}

async function deleteProducto(id) {
  // Verificar existencia antes de eliminar
  await getProductoById(id);
  await productoRepository.softDelete(id);
}

module.exports = {
  createProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
  deleteProducto
};