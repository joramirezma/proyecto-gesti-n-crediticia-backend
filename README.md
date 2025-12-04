# Backend - Sistema de Gestión de Evaluación Crediticia

API REST para el sistema de gestión de solicitudes de evaluación crediticia.

## Tecnologías

- **Node.js** con Express
- **MySQL** como base de datos
- **JWT** para autenticación
- **bcryptjs** para hash de contraseñas
- **Nodemailer** para envío de emails

## Arquitectura

El proyecto sigue la arquitectura **MVC** (Model-View-Controller):

```
src/
├── config/          # Configuraciones (DB, JWT, Email)
├── controllers/     # Controladores de la API
├── middlewares/     # Middlewares de autenticación y validación
├── models/          # Modelos de datos
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
└── utils/           # Utilidades (hash, tokens)
```

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear archivo `.env` basándose en `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Configurar las variables de entorno en `.env`
5. Crear la base de datos ejecutando `ddl.sql`
6. Iniciar el servidor:
   ```bash
   npm run dev
   ```

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL | `password` |
| `DB_NAME` | Nombre de la base de datos | `gestion_crediticia` |
| `JWT_SECRET` | Clave secreta para JWT | `tu_clave_secreta` |
| `EMAIL_USER` | Email para envío de correos | `tu@email.com` |
| `EMAIL_PASSWORD` | Contraseña de aplicación | `contraseña_app` |
| `FRONTEND_URL` | URL del frontend | `http://localhost:5173` |

## Endpoints de Autenticación

| Método | Ruta | Descripción | Autenticación |
|--------|------|-------------|---------------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario | No |
| `POST` | `/api/auth/login` | Iniciar sesión | No |
| `POST` | `/api/auth/forgot-password` | Solicitar recuperación | No |
| `POST` | `/api/auth/reset-password` | Restablecer contraseña | No |
| `GET` | `/api/auth/me` | Obtener usuario actual | Sí |
| `POST` | `/api/auth/verify-token` | Verificar token | Sí |

## Roles

- **Asesor**: Puede crear y gestionar solicitudes de clientes
- **Analista**: Puede evaluar y aprobar/rechazar solicitudes

## Scripts

- `npm start` - Inicia el servidor en producción
- `npm run dev` - Inicia el servidor en desarrollo con hot reload

## Configuración de Email (Gmail)

Para usar Gmail como servicio de correo:

1. Activa la verificación en 2 pasos en tu cuenta de Google
2. Ve a "Contraseñas de aplicaciones" en la configuración de seguridad
3. Genera una nueva contraseña para "Correo"
4. Usa esa contraseña en `EMAIL_PASSWORD`