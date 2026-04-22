# API de Pedidos

## Estructura de Capas

```
pedido/
├── models/
│   └── pedido.model.js
├── services/
│   └── pedido.service.js
├── controllers/
│   └── pedido.controller.js
└── routes/
    └── pedido.routes.js
```

## Estados Válidos
- `pendiente`: Pedido creado pero no procesado
- `proceso`: Pedido en preparación/procesamiento
- `entregado`: Pedido entregado

## Endpoints

### GET `/api/pedidos`
Obtener todos los pedidos

**Response (200):**
```json
[
  {
    "id_pedido": 1,
    "id_usuario": 1,
    "fecha": "2026-04-20T17:00:00.000Z",
    "total": 15000,
    "estado": "pendiente",
    "usuario_nombre": "Juan Pérez",
    "correo": "juan@mail.com"
  }
]
```

---

### GET `/api/pedidos/:id`
Obtener pedido por ID

**Response (200):**
```json
{
  "id_pedido": 1,
  "id_usuario": 1,
  "fecha": "2026-04-20T17:00:00.000Z",
  "total": 15000,
  "estado": "pendiente",
  "usuario_nombre": "Juan Pérez",
  "correo": "juan@mail.com",
  "telefono": "3001111111",
  "direccion": "Tuluá"
}
```

---

### GET `/api/pedidos/usuario/:id_usuario`
Obtener pedidos de un usuario

**Response (200):**
```json
[
  {
    "id_pedido": 1,
    "id_usuario": 1,
    "fecha": "2026-04-20T17:00:00.000Z",
    "total": 15000,
    "estado": "pendiente",
    "usuario_nombre": "Juan Pérez"
  }
]
```

---

### GET `/api/pedidos/estado/:estado`
Obtener pedidos por estado (pendiente, proceso, entregado)

**Response (200):**
```json
[
  {
    "id_pedido": 1,
    "id_usuario": 1,
    "fecha": "2026-04-20T17:00:00.000Z",
    "total": 15000,
    "estado": "proceso",
    "usuario_nombre": "Juan Pérez"
  }
]
```

---

### POST `/api/pedidos`
Crear nuevo pedido

**Body:**
```json
{
  "id_usuario": 1,
  "total": 25000,
  "estado": "pendiente"
}
```

**Response (201):**
```json
{
  "id_pedido": 2,
  "id_usuario": 1,
  "fecha": "2026-04-20T17:30:00.000Z",
  "total": 25000,
  "estado": "pendiente"
}
```

---

### PUT `/api/pedidos/:id`
Actualizar pedido

**Body:**
```json
{
  "total": 26000,
  "estado": "proceso"
}
```

**Response (200):**
```json
{
  "id_pedido": 1,
  "id_usuario": 1,
  "fecha": "2026-04-20T17:00:00.000Z",
  "total": 26000,
  "estado": "proceso"
}
```

---

### PATCH `/api/pedidos/:id/estado`
Actualizar solo el estado del pedido

**Body:**
```json
{
  "estado": "entregado"
}
```

**Response (200):**
```json
{
  "message": "Estado actualizado",
  "pedido": {
    "id_pedido": 1,
    "id_usuario": 1,
    "total": 26000,
    "estado": "entregado"
  }
}
```

---

### DELETE `/api/pedidos/:id`
Eliminar pedido

**Response (200):**
```json
{
  "message": "Pedido eliminado",
  "pedido": {
    "id_pedido": 1,
    "id_usuario": 1,
    "total": 26000,
    "estado": "entregado"
  }
}
```
