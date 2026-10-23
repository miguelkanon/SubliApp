
const express = require('express');
const authenticate = require("../../middlewares/auth.middleware");
const authorizeRoles = require("../../middlewares/role.middleware");

const userController = require('./user.controller');
const {
validateCreateUser,
validateUserId,
validateUpdateUser,
validateStatus
} = require('./user.validator');
const router = express.Router();

// Todas las rutas requieren un token JWT válido
router.use(authenticate);

// Crear usuario
router.post('/',authorizeRoles(1),validateCreateUser,userController.createUser);


// Listar usuarios
router.get('/',authorizeRoles(1,2),userController.getUsers);


// Consultar perfil del usuario autenticado
router.get("/me",userController.getMyProfile);


// Consultar usuario
router.get('/:id',validateUserId,authorizeRoles(1),userController.getUserById);


// Actualizar usuario
router.put('/:id',validateUserId,authorizeRoles(1),validateUpdateUser,userController.updateUser);


// Cambiar estado
router.patch('/:id/status',validateUserId,authorizeRoles(1),validateStatus,userController.changeUserStatus);


// Eliminación lógica
router.delete('/:id',validateUserId,authorizeRoles(1),userController.deleteUser);



module.exports = router;