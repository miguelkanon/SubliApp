// Validar creación de cliente
function validateCreateCliente(req, res, next) {
  const { nombre, apellido, tipo_documento, numero_documento, email } = req.body;

  // 1. Validar campos obligatorios
  if (!nombre || !apellido || !tipo_documento || !numero_documento || !email) {
    return res.status(400).json({ 
      message: 'Los campos nombre, apellido, tipo_documento, numero_documento y email son obligatorios' 
    });
  }

  // 2. Validar que el tipo de documento coincida con la restricción (CHECK) de tu base de datos
  const tiposValidos = ['CC', 'NIT', 'CE', 'PASAPORTE'];
  if (!tiposValidos.includes(tipo_documento)) {
    return res.status(400).json({ 
      message: 'Tipo de documento inválido. Valores permitidos: CC, NIT, CE, PASAPORTE' 
    });
  }

  // 3. Validar formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      message: 'El formato del email es inválido' 
    });
  }

  // Si todo está bien, pasamos a la siguiente capa (Controlador)
  next();
}

// Validar que el ID de la URL sea un número válido
function validateClienteId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ 
      message: 'El ID del cliente no es válido' 
    });
  }
  next();
}

// Validar actualización de cliente
function validateUpdateCliente(req, res, next) {
  // Aplicamos las mismas reglas de la creación
  const { nombre, apellido, tipo_documento, numero_documento, email } = req.body;

  if (!nombre || !apellido || !tipo_documento || !numero_documento || !email) {
    return res.status(400).json({ 
      message: 'Todos los campos principales son obligatorios para actualizar' 
    });
  }

  const tiposValidos = ['CC', 'NIT', 'CE', 'PASAPORTE'];
  if (!tiposValidos.includes(tipo_documento)) {
    return res.status(400).json({ 
      message: 'Tipo de documento inválido. Valores permitidos: CC, NIT, CE, PASAPORTE' 
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      message: 'El formato del email es inválido' 
    });
  }

  next();
}

module.exports = {
  validateCreateCliente,
  validateClienteId,
  validateUpdateCliente
};