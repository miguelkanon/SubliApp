const jwt = require("jsonwebtoken");
const authRepository = require("../modules/auth/auth.repository");

async function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await authRepository.findById(decoded.id);

    if (!user || user.estado !== 1) {
      return res.status(401).json({
        message: "Invalid or inactive user"
      });
    }

    req.user = {
      id: user.id_usuario,
      role: user.id_rol_fk
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

module.exports = authenticate;
