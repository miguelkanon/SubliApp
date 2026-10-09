# SubliApp Backend

Backend del sistema de información para la gestión comercial de SubliApp. Este proyecto proporciona la API REST para manejar la lógica de negocio, autenticación y administración de usuarios, conectada a una base de datos MySQL.

## Descripción del proyecto

SubliApp es una aplicación orientada a la gestión comercial y operativa de una empresa. Este backend está diseñado para servir como capa de acceso a datos y lógica del negocio, permitiendo integrar funcionalidades como:

- Autenticación de usuarios
- Gestión de usuarios
- API REST para consumo desde un frontend
- Conexión con MySQL
- Entorno configurable mediante variables de entorno

## Tecnologías

- Node.js
- Express.js
- MySQL2
- dotenv
- Nodemon (desarrollo)

## Estructura del proyecto

```text
Backend/
├── .env.example
├── .env
├── package.json
├── README.md
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   ├── modules/
│   │   ├── auth/
│   │   └── users/
│   │       ├── user.controller.js
│   │       ├── user.repository.js
│   │       ├── user.routes.js
│   │       ├── user.service.js
│   │       └── user.validator.js
│   └── utils/
└── node_modules/
```

## Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js v18 o superior
- npm
- MySQL

## Instalación

1. Clona el repositorio.
2. Entra a la carpeta del backend:

```bash
cd Backend
```

3. Instala las dependencias:

```bash
npm install
```

4. Configura las variables de entorno copiando el archivo `.env.example` a `.env` y ajustando los valores:

```bash
copy .env.example .env
```

Ejemplo de configuración:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_NAME=sice
DB_PORT=3306
```

## Ejecución

Modo de desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

El servidor quedará disponible en:

```text
http://localhost:3000
```

## Endpoints base

Actualmente el backend cuenta con una ruta de salud para verificar que la API está funcionando:

- `GET /api/health`

Respuesta esperada:

```json
{
  "status": "ok",
  "message": "Subliapp API is running"
}
```

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto en el que correrá la API |
| `DB_HOST` | Host de la base de datos |
| `DB_USER` | Usuario de MySQL |
| `DB_PASSWORD` | Contraseña del usuario de MySQL |
| `DB_NAME` | Nombre de la base de datos |
| `DB_PORT` | Puerto de conexión a la base de datos |

## Estado del proyecto

El proyecto se encuentra en una base inicial de estructura backend con módulos de autenticación y usuarios. Se recomienda continuar con la implementación de:

- Rutas de autenticación
- Validación de datos
- Controladores y servicios CRUD
- Manejo centralizado de errores
- Seguridad con JWT y encriptación de contraseñas

## Autor

- Miguel Canon

## Licencia

ISC
