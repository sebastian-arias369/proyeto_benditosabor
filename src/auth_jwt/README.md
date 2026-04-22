# Documentación de Endpoints de Autenticación

## Estructura de Capas

```
auth_jwt/
├── models/
│   └── auth.model.js        (Acceso a la base de datos)
├── services/
│   └── auth.service.js      (Lógica de negocio)
├── controllers/
│   └── auth.controller.js   (Manejo de requests/responses)
├── middlewares/
│   └── auth.middleware.js   (Middlewares de autenticación)
└── routes/
    └── auth.routes.js       (Definición de rutas)
```

## Endpoints Disponibles

### 1. Registro de Usuario
**POST** `/api/auth/register`

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "password": "mi_contraseña_segura",
  "telefono": "3001234567",
  "direccion": "Calle 123, Apto 45"
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado correctamente",
  "token": null,
  "user": {
    "id_usuario": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "rol": "cliente"
  }
}
```

**Errores:**
- 400: Campos faltantes, correo inválido, contraseña muy corta
- 400: El correo ya está registrado

---

### 2. Inicio de Sesión
**POST** `/api/auth/login`

**Body:**
```json
{
  "correo": "juan@example.com",
  "password": "mi_contraseña_segura"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id_usuario": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "rol": "cliente"
  }
}
```

**Errores:**
- 400: Correo o contraseña faltantes
- 401: Correo o contraseña incorrectos

---

### 3. Verificar Token
**GET** `/api/auth/verify`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Token válido",
  "user": {
    "id_usuario": 1,
    "correo": "juan@example.com",
    "rol": "cliente",
    "iat": 1234567890,
    "exp": 1234654290
  }
}
```

**Errores:**
- 401: Token no proporcionado
- 401: Token inválido o expirado

---

## Usar Middleware en Otras Rutas

Para proteger rutas con autenticación, importa el middleware:

```javascript
import { authenticateToken, authorizeRole } from './auth_jwt/middlewares/auth.middleware.js';

// Ruta protegida (solo usuarios autenticados)
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Ruta protegida por rol (solo administradores)
router.delete('/user/:id', authenticateToken, authorizeRole(['admin']), deleteUser);
```

---

## Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```
JWT_SECRET=tu_clave_secreta_super_segura_2024
JWT_EXPIRATION=24h
DB_HOST=localhost
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=bendito_sabor
DB_PORT=5432
```

---

## Dependencias Instaladas

- **bcrypt**: Para hashear contraseñas
- **jsonwebtoken**: Para generar y verificar tokens JWT

---

## Notas Importantes

1. Las contraseñas se hashean automáticamente con bcrypt antes de guardarse
2. Los tokens JWT expiran después de 24 horas (configurable)
3. Siempre usa HTTPS en producción
4. Nunca expongas tu JWT_SECRET
5. El rol por defecto de nuevos usuarios es "cliente"
