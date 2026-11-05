// Validar creación de cotización
function validateCreateCotizacion(req, res, next) {
  const { id_cliente, detalles } = req.body;

  // 1. Validar el cliente
  if (!id_cliente || !Number.isInteger(Number(id_cliente))) {
    return res.status(400).json({ 
      message: 'El id_cliente es obligatorio y debe ser un número entero válido' 
    });
  }

  // 2. Validar que los detalles sean un arreglo con al menos un ítem
  if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
    return res.status(400).json({ 
      message: 'Debe incluir una lista de productos (detalles) con al menos un artículo' 
    });
  }

  // 3. Validar cada producto dentro de la lista
  for (let i = 0; i < detalles.length; i++) {
    const item = detalles[i];
    
    if (!item.id_producto || !Number.isInteger(Number(item.id_producto))) {
      return res.status(400).json({ 
        message: `El id_producto en el ítem #${i + 1} es inválido u obligatorio` 
      });
    }

    if (!item.cantidad || !Number.isInteger(Number(item.cantidad)) || Number(item.cantidad) <= 0) {
      return res.status(400).json({ 
        message: `La cantidad en el ítem #${i + 1} debe ser un número entero mayor a cero` 
      });
    }
  }

  next();
}

// Validar que el ID de la URL sea un número válido
function validateCotizacionId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ 
      message: 'El ID de la cotización no es válido' 
    });
  }
  next();
}

// Validar actualización de estado
function validateUpdateEstado(req, res, next) {
  const { estado } = req.body;
  
  if (!estado || typeof estado !== 'string') {
    return res.status(400).json({ 
      message: 'El campo estado es obligatorio para actualizar' 
    });
  }

  next();
}

module.exports = {
  validateCreateCotizacion,
  validateCotizacionId,
  validateUpdateEstado
};