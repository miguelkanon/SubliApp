const productoService = require('./producto.service');

// 1. Crear producto
async function create(req, res, next) {
  try {
    const newProductoId = await productoService.createProducto(req.body);
    return res.status(201).json({
      message: 'Producto creado exitosamente',
      id_producto: newProductoId
    });
  } catch (error) {
    next(error); // Pasa el error al middleware global
  }
}

// 2. Obtener todos los productos
async function getAll(req, res, next) {
  try {
    const productos = await productoService.getAllProductos();
    return res.status(200).json(productos);
  } catch (error) {
    next(error);
  }
}

// 3. Obtener un producto por ID
async function getById(req, res, next) {
  try {
    const producto = await productoService.getProductoById(req.params.id);
    return res.status(200).json(producto);
  } catch (error) {
    next(error);
  }
}

// 4. Actualizar producto
async function update(req, res, next) {
  try {
    await productoService.updateProducto(req.params.id, req.body);
    return res.status(200).json({
      message: 'Producto actualizado exitosamente'
    });
  } catch (error) {
    next(error);
  }
}

// 5. Eliminar producto (Soft Delete)
async function remove(req, res, next) {
  try {
    await productoService.deleteProducto(req.params.id);
    return res.status(200).json({
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    next(error);
  }
}

// 6. Restaurar producto
async function restore(req, res, next) {
  try {
    await productoService.restoreProducto(req.params.id);
    return res.status(200).json({
      message: 'Producto restaurado exitosamente'
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
  remove,
  restore
};