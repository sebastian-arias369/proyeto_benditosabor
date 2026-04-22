# API de Detalles de Pedidos

## Estructura de Capas

```
detalle_pedido/
├── models/
│   └── detalle_pedido.model.js
├── services/
│   └── detalle_pedido.service.js
├── controllers/
│   └── detalle_pedido.controller.js
└── routes/
    └── detalle_pedido.routes.js
```

## Endpoints

### GET `/api/detalles-pedidos`
Obtener todos los detalles de pedidos

**Response (200):**
```json
[
  {
    "id_detalle": 1,
    "id_pedido": 1,
    "id_producto": 1,
    "cantidad": 2,
    "precio_unitario": 5000,
    "subtotal": 10000,
    "producto_nombre": "Mango",
    "producto_precio": 5000
  }
]
```

---

### GET `/api/detalles-pedidos/pedido/:id_pedido`
Obtener detalles de un pedido específico

**Response (200):**
```json
[
  {
    "id_detalle": 1,
    "id_pedido": 1,
    "id_producto": 1,
    "cantidad": 2,
    "precio_unitario": 5000,
    "subtotal": 10000,
    "producto_nombre": "Mango",
    "producto_precio": 5000
  }
]
```

---

### GET `/api/detalles-pedidos/:id`
Obtener detalle específico por ID

**Response (200):**
```json
{
  "id_detalle": 1,
  "id_pedido": 1,
  "id_producto": 1,
  "cantidad": 2,
  "precio_unitario": 5000,
  "subtotal": 10000,
  "producto_nombre": "Mango",
  "producto_precio": 5000
}
```

---

### POST `/api/detalles-pedidos`
Crear nuevo detalle de pedido

**Body:**
```json
{
  "id_pedido": 1,
  "id_producto": 1,
  "cantidad": 3,
  "precio_unitario": 5000
}
```

**Response (201):**
```json
{
  "id_detalle": 2,
  "id_pedido": 1,
  "id_producto": 1,
  "cantidad": 3,
  "precio_unitario": 5000,
  "subtotal": 15000
}
```

---

### PUT `/api/detalles-pedidos/:id`
Actualizar detalle de pedido

**Body:**
```json
{
  "cantidad": 5,
  "precio_unitario": 5000
}
```

**Response (200):**
```json
{
  "id_detalle": 1,
  "id_pedido": 1,
  "id_producto": 1,
  "cantidad": 5,
  "precio_unitario": 5000,
  "subtotal": 25000
}
```

---

### DELETE `/api/detalles-pedidos/:id`
Eliminar detalle de pedido

**Response (200):**
```json
{
  "message": "Detalle eliminado",
  "detalle": {
    "id_detalle": 1,
    "id_pedido": 1,
    "id_producto": 1,
    "cantidad": 5,
    "precio_unitario": 5000,
    "subtotal": 25000
  }
}
```
