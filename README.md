# SubliApp Backend

Backend del sistema de información para la gestión comercial de SubliApp. Este proyecto expone una API REST construida con Node.js y Express para manejar autenticación, usuarios y módulos empresariales como clientes, productos, cotizaciones y pedidos.

## Descripción general

SubliApp es una solución orientada a la gestión comercial y operativa de una empresa. El backend funciona como capa de servicios del sistema, conectando la aplicación con MySQL y ofreciendo una estructura modular para ampliar funcionalidad según las necesidades del negocio.

## Funcionalidades actuales

- API REST con Express
- Verificación de salud del servicio
- Conexión a base de datos MySQL
- Autenticación con JWT
- Gestión de usuarios y roles
- Módulo de clientes
- Módulo de productos
- Módulo de cotizaciones
- Módulo de pedidos
- Validación de entrada por módulo
- Middleware centralizado de errores
- Arquitectura modular por dominios
- Control de acceso por roles

## Tecnologías utilizadas

- Node.js
- Express.js
- MySQL2
- bcrypt
- JWT (jsonwebtoken)
- dotenv
- CORS
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
│       ├── clientes/
│       │   ├── cliente.controller.js
│       │   ├── cliente.repository.js
│       │   ├── cliente.routes.js
│       │   ├── cliente.service.js
│       │   └── cliente.validator.js
│       ├── cotizaciones/
│       │   ├── cotizacion.controller.js
│       │   ├── cotizacion.repository.js
│       │   ├── cotizacion.routes.js
│       │   ├── cotizacion.service.js
│       │   └── cotizacion.validator.js
│       ├── pedidos/
│       │   ├── pedido.controller.js
│       │   ├── pedido.repository.js
│       │   ├── pedido.routes.js
│       │   ├── pedido.service.js
│       │   └── pedido.validator.js
│       ├── productos/
│       │   ├── producto.controller.js
│       │   ├── producto.repository.js
│       │   ├── producto.routes.js
│       │   ├── producto.service.js
│       │   └── producto.validator.js
│       └── users/
│           ├── user.controller.js
│           ├── user.repository.js
│           ├── user.routes.js
│           ├── user.service.js
│           └── user.validator.js
└── node_modules/
```

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Node.js 18 o superior
- npm
- MySQL
- Una base de datos creada para el proyecto
- Cliente de MySQL opcional (Workbench, DBeaver, etc.)

## Instalación

1. Abre la terminal y entra a la carpeta del backend:

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

4. Configura tus variables de entorno en `.env`:

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

## Endpoints principales

### Salud del sistema

- `GET /api/health`

Respuesta esperada:

```json
{
  "status": "ok",
  "message": "SubliApp API is running"
}
```

### Autenticación

- `POST /api/auth/login`

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

Todas las rutas bajo `/api/users` usan autenticación y validación por roles.

- `POST /api/users` — Crear usuario
- `GET /api/users` — Listar usuarios
- `GET /api/users/me` — Consultar perfil del usuario autenticado
- `GET /api/users/:id` — Consultar usuario por ID
- `PUT /api/users/:id` — Actualizar usuario
- `PATCH /api/users/:id/password` — Actualizar contraseña
- `PATCH /api/users/:id/status` — Cambiar estado del usuario
- `DELETE /api/users/:id` — Eliminación lógica del usuario

### Clientes

- `POST /api/clientes` — Crear cliente
- `GET /api/clientes` — Listar clientes
- `GET /api/clientes/:id` — Consultar cliente por ID
- `PUT /api/clientes/:id` — Actualizar cliente
- `DELETE /api/clientes/:id` — Eliminar cliente

### Productos

- `POST /api/productos` — Crear producto
- `GET /api/productos` — Listar productos
- `GET /api/productos/:id` — Consultar producto por ID
- `PUT /api/productos/:id` — Actualizar producto
- `DELETE /api/productos/:id` — Eliminar producto
- `PATCH /api/productos/:id/restore` — Restaurar producto

### Cotizaciones

- `POST /api/cotizaciones` — Crear cotización
- `GET /api/cotizaciones` — Listar cotizaciones
- `GET /api/cotizaciones/:id` — Consultar cotización por ID
- `PATCH /api/cotizaciones/:id/estado` — Actualizar estado de cotización

### Pedidos

- `POST /api/pedidos` — Crear pedido
- `GET /api/pedidos` — Listar pedidos
- `GET /api/pedidos/:id` — Consultar pedido por ID
- `PATCH /api/pedidos/:id/estado` — Actualizar estado del pedido
- `POST /api/pedidos/:id/pagos` — Registrar pago del pedido

## Roles y permisos

El backend usa middleware para controlar acceso por roles:

- `1` — Administrador
- `2` — Usuario general

Algunas rutas están restringidas según el rol autenticado. La validación se aplica con middleware de autenticación y autorización.

## Seguridad

El proyecto usa:

- JWT para autenticación
- Validación de entradas por módulo
- Middleware de autenticación y autorización
- Manejo centralizado de errores con `error.middleware.js`
- Encriptación de contraseñas con `bcrypt`
- CORS para controlar acceso HTTP desde clientes externos

## Estado del proyecto

El backend cuenta con una base funcional para gestionar procesos comerciales clave, incluyendo:

- autenticación de usuarios
- gestión de roles y permisos
- CRUD de usuarios
- gestión de clientes
- gestión de productos
- registro de cotizaciones
- registro de pedidos y pagos
- seguridad y validación de datos
- extensibilidad para nuevos módulos del negocio

## Autor

- Miguel Canon

## Licencia

ISC
