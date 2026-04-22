# API de Inventario

## Estructura de Capas

```
inventario/
├── models/
│   └── inventario.model.js
├── services/
│   └── inventario.service.js
├── controllers/
│   └── inventario.controller.js
└── routes/
    └── inventario.routes.js
```

## Endpoints

### GET `/api/inventarios`
Obtener todos los inventarios

**Response (200):**
```json
[
  {
    "id_inventario": 1,
    "id_producto": 1,
    "cantidad": 100,
    "stock_minimo": 10,
    "ultima_actualizacion": "2026-04-20T17:00:00.000Z",
    "producto_nombre": "Mango",
    "precio": 5000
  }
]
```

---

### GET `/api/inventarios/bajo-stock`
Obtener productos con stock bajo

**Response (200):**
```json
[
  {
    "id_inventario": 2,
    "id_producto": 2,
    "cantidad": 5,
    "stock_minimo": 10,
    "ultima_actualizacion": "2026-04-20T17:00:00.000Z",
    "producto_nombre": "Piña",
    "precio": 3000
  }
]
```

---

### GET `/api/inventarios/:id`
Obtener inventario por ID

**Response (200):**
```json
{
  "id_inventario": 1,
  "id_producto": 1,
  "cantidad": 100,
  "stock_minimo": 10,
  "ultima_actualizacion": "2026-04-20T17:00:00.000Z",
  "producto_nombre": "Mango",
  "precio": 5000
}
```

---

### GET `/api/inventarios/producto/:id_producto`
Obtener inventario por ID de producto

**Response (200):**
```json
{
  "id_inventario": 1,
  "id_producto": 1,
  "cantidad": 100,
  "stock_minimo": 10,
  "ultima_actualizacion": "2026-04-20T17:00:00.000Z",
  "producto_nombre": "Mango",
  "precio": 5000
}
```

---

### POST `/api/inventarios`
Crear nuevo inventario

**Body:**
```json
{
  "id_producto": 1,
  "cantidad": 50,
  "stock_minimo": 10
}
```

**Response (201):**
```json
{
  "id_inventario": 3,
  "id_producto": 1,
  "cantidad": 50,
  "stock_minimo": 10,
  "ultima_actualizacion": "2026-04-20T17:00:00.000Z"
}
```

---

### PUT `/api/inventarios/:id`
Actualizar inventario

**Body:**
```json
{
  "cantidad": 75,
  "stock_minimo": 15
}
```

**Response (200):**
```json
{
  "id_inventario": 1,
  "id_producto": 1,
  "cantidad": 75,
  "stock_minimo": 15,
  "ultima_actualizacion": "2026-04-20T17:10:00.000Z"
}
```

---

### PATCH `/api/inventarios/:id/agregar`
Agregar cantidad al inventario

**Body:**
```json
{
  "cantidad": 20
}
```

**Response (200):**
```json
{
  "message": "Cantidad agregada",
  "inventario": {
    "id_inventario": 1,
    "id_producto": 1,
    "cantidad": 95,
    "stock_minimo": 15,
    "ultima_actualizacion": "2026-04-20T17:15:00.000Z"
  }
}
```

---

### PATCH `/api/inventarios/:id/restar`
Restar cantidad del inventario

**Body:**
```json
{
  "cantidad": 10
}
```

**Response (200):**
```json
{
  "message": "Cantidad restada",
  "inventario": {
    "id_inventario": 1,
    "id_producto": 1,
    "cantidad": 85,
    "stock_minimo": 15,
    "ultima_actualizacion": "2026-04-20T17:20:00.000Z"
  }
}
```

---

### DELETE `/api/inventarios/:id`
Eliminar inventario

**Response (200):**
```json
{
  "message": "Inventario eliminado",
  "inventario": {
    "id_inventario": 1,
    "id_producto": 1,
    "cantidad": 85,
    "stock_minimo": 15,
    "ultima_actualizacion": "2026-04-20T17:20:00.000Z"
  }
}
```
