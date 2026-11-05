// Validar creación de producto
function validateCreateProducto(req, res, next) {
  const { nombre, precio_base, stock, categoria } = req.body;

  // 1. Validar campos obligatorios
  // (Nota: precio_base puede ser 0, por eso validamos que no sea undefined)
  if (!nombre || precio_base === undefined || !categoria) {
    return res.status(400).json({ 
      message: 'Los campos nombre, precio_base y categoria son obligatorios' 
    });
  }

  // 2. Validar que el precio no sea negativo (cumpliendo tu restricción CHECK de MySQL)
  if (isNaN(precio_base) || Number(precio_base) < 0) {
    return res.status(400).json({ 
      message: 'El precio_base debe ser un número válido mayor o igual a 0' 
    });
  }

  // 3. Validar que el stock, si se envía, no sea negativo
  if (stock !== undefined) {
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
      return res.status(400).json({ 
        message: 'El stock debe ser un número entero mayor o igual a 0' 
      });
    }
  }

  next();
}

// Validar que el ID de la URL sea un número válido
function validateProductoId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ 
      message: 'El ID del producto no es válido' 
    });
  }
  next();
}

// Validar actualización de producto
function validateUpdateProducto(req, res, next) {
  const { nombre, precio_base, stock, categoria } = req.body;

  if (!nombre || precio_base === undefined || !categoria) {
    return res.status(400).json({ 
      message: 'Los campos nombre, precio_base y categoria son obligatorios para actualizar' 
    });
  }

  if (isNaN(precio_base) || Number(precio_base) < 0) {
    return res.status(400).json({ 
      message: 'El precio_base debe ser un número válido mayor o igual a 0' 
    });
  }

  if (stock !== undefined) {
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
      return res.status(400).json({ 
        message: 'El stock debe ser un número entero mayor o igual a 0' 
      });
    }
  }

  next();
}

module.exports = {
  validateCreateProducto,
  validateProductoId,
  validateUpdateProducto
};