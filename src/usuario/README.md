# API de Usuarios

## Estructura de Capas

```
usuario/
├── models/
│   └── usuario.model.js
├── services/
│   └── usuario.service.js
├── controllers/
│   └── usuario.controller.js
└── routes/
    └── usuario.routes.js
```

## Endpoints

### GET `/api/usuarios`
Obtener todos los usuarios

**Response (200):**
```json
[
  {
    "id_usuario": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@mail.com",
    "telefono": "3001111111",
    "direccion": "Tuluá",
    "rol": "cliente",
    "fecha_creacion": "2026-04-20T17:00:00.000Z"
  }
]
```

---

### GET `/api/usuarios/:id`
Obtener usuario por ID

**Response (200):**
```json
{
  "id_usuario": 1,
  "nombre": "Juan Pérez",
  "correo": "juan@mail.com",
  "telefono": "3001111111",
  "direccion": "Tuluá",
  "rol": "cliente",
  "fecha_creacion": "2026-04-20T17:00:00.000Z"
}
```

---

### POST `/api/usuarios`
Crear nuevo usuario

**Body:**
```json
{
  "nombre": "Carlos Ruiz",
  "correo": "carlos@mail.com",
  "password": "123456",
  "telefono": "3003333333",
  "direccion": "Tuluá",
  "rol": "cliente"
}
```

**Response (201):**
```json
{
  "id_usuario": 4,
  "nombre": "Carlos Ruiz",
  "correo": "carlos@mail.com",
  "telefono": "3003333333",
  "direccion": "Tuluá",
  "rol": "cliente",
  "fecha_creacion": "2026-04-20T17:30:00.000Z"
}
```

---

### PUT `/api/usuarios/:id`
Actualizar usuario

**Body:**
```json
{
  "nombre": "Carlos Ruiz Updated",
  "correo": "carlos.updated@mail.com",
  "telefono": "3003333334",
  "direccion": "Tuluá Centro",
  "rol": "cliente"
}
```

**Response (200):**
```json
{
  "id_usuario": 4,
  "nombre": "Carlos Ruiz Updated",
  "correo": "carlos.updated@mail.com",
  "telefono": "3003333334",
  "direccion": "Tuluá Centro",
  "rol": "cliente",
  "fecha_creacion": "2026-04-20T17:30:00.000Z"
}
```

---

### DELETE `/api/usuarios/:id`
Eliminar usuario

**Response (200):**
```json
{
  "message": "Usuario eliminado",
  "usuario": {
    "id_usuario": 4,
    "nombre": "Carlos Ruiz",
    "correo": "carlos@mail.com"
  }
}
```
