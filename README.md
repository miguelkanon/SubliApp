# SubliApp Backend

Backend del sistema de información para la gestión comercial de SubliApp. Este proyecto expone una API REST construida con Node.js y Express para gestionar autenticación, usuarios y la lógica de negocio principal del sistema.

## Descripción general

SubliApp es una solución orientada a la gestión comercial y operativa de una empresa. El backend funciona como la capa de servicios del sistema, conectando la aplicación con MySQL y proporcionando una estructura modular para continuar ampliando funcionalidades.

## Funcionalidades actuales

- API REST con Express
- Endpoint de verificación de salud
- Conexión a base de datos MySQL
- Autenticación con JWT
- Gestión de usuarios y roles
- Validación de entradas por módulo
- Middleware centralizado de errores
- Arquitectura modular por dominios

## Tecnologías utilizadas

- Node.js
- Express.js
- MySQL2
- bcrypt
- JWT (jsonwebtoken)
- dotenv
- Nodemon

## Estructura del proyecto

```text
Backend/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── role.middleware.js
│   └── modules/
│       ├── auth/
│       │   ├── auth.controller.js
│       │   ├── auth.repository.js
│       │   ├── auth.routes.js
│       │   ├── auth.service.js
│       │   └── auth.validator.js
│       └── users/
│           ├── user.controller.js
│           ├── user.repository.js
│           ├── user.routes.js
│           ├── user.service.js
│           └── user.validator.js
└── node_modules/
```

## Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener:

- Node.js 18 o superior
- npm
- MySQL
- Un cliente para administrar la base de datos (opcional)

## Instalación

1. Clona el repositorio y entra a la carpeta del backend:

```bash
cd Backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea el archivo de entorno a partir del ejemplo:

```bash
copy .env.example .env
```

4. Configura tus variables de entorno en `.env`.

Ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=sice
DB_PORT=3306
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=2h
```

## Ejecución

### Modo desarrollo

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

La API quedará disponible en:

```text
http://localhost:3000
```

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto en el que corre la API |
| `DB_HOST` | Host del servidor MySQL |
| `DB_USER` | Usuario de la base de datos |
| `DB_PASSWORD` | Contraseña del usuario MySQL |
| `DB_NAME` | Nombre de la base de datos |
| `DB_PORT` | Puerto del servidor MySQL |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT |
| `JWT_EXPIRES_IN` | Tiempo de expiración del token JWT |

## Endpoints principales

### Verificación de salud

- GET `/api/health`

Respuesta esperada:

```json
{
  "status": "ok",
  "message": "SubliApp API is running"
}
```

### Autenticación

- POST `/api/auth/login`

Ejemplo de cuerpo:

```json
{
  "correo": "usuario@ejemplo.com",
  "contrasena": "12345678"
}
```

Respuesta esperada:

```json
{
  "message": "Login successful",
  "data": {
    "token": "jwt_token",
    "user": {
      "id_usuario": 1,
      "nombre": "Usuario",
      "correo": "usuario@ejemplo.com",
      "id_rol": 2
    }
  }
}
```

### Usuarios

Todas las rutas bajo `/api/users` requieren autenticación mediante un token JWT válido.

- POST `/api/users` — Crear usuario
- GET `/api/users` — Listar usuarios
- GET `/api/users/me` — Consultar perfil del usuario autenticado
- GET `/api/users/:id` — Consultar usuario por ID
- PUT `/api/users/:id` — Actualizar usuario
- PATCH `/api/users/:id/status` — Cambiar estado del usuario
- DELETE `/api/users/:id` — Eliminación lógica del usuario

Ejemplo de uso con token:

```http
Authorization: Bearer <tu_token>
```

### Ejemplo de creación de usuario

```json
{
  "nombre": "Ana García",
  "correo": "ana@ejemplo.com",
  "contrasena": "12345678",
  "id_rol": 2
}
```

## Seguridad

El proyecto usa:

- JWT para autenticación
- Validación de entradas en cada módulo
- Middleware de autenticación y autorización
- Control de errores centralizado por `error.middleware.js`

## Estado del proyecto

El backend se encuentra en una etapa inicial pero con una base funcional para continuar desarrollando:

- autenticación de usuarios
- gestión de roles y permisos
- CRUD de usuarios
- validación de datos
- seguridad y control de acceso
- extensión a nuevos módulos del sistema

## Autor

- Miguel Canon

## Licencia

ISC