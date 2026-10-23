function validateLogin(req, res, next) {
  const { correo, contrasena } = req.body;

  if (
    typeof correo !== "string" ||
    !correo.trim() ||
    typeof contrasena !== "string" ||
    !contrasena
  ) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  next();
}

module.exports = { validateLogin };
