# API de Productos

## Estructura de Capas

```
producto/
├── models/
│   └── producto.model.js
├── services/
│   └── producto.service.js
├── controllers/
│   └── producto.controller.js
└── routes/
    └── producto.routes.js
```

## Endpoints

### GET `/api/productos`
Obtener todos los productos

**Response (200):**
```json
[
  {
    "id_producto": 1,
    "nombre": "Mango",
    "descripcion": "Fruta tropical",
    "precio": 5000,
    "stock": 100,
    "id_categoria": 1,
    "imagen_url": "http://...",
    "fecha_creacion": "2026-04-20T17:00:00.000Z",
    "categoria_nombre": "Tropicales"
  }
]
```

---

### GET `/api/productos/:id`
Obtener producto por ID

**Response (200):**
```json
{
  "id_producto": 1,
  "nombre": "Mango",
  "descripcion": "Fruta tropical",
  "precio": 5000,
  "stock": 100,
  "id_categoria": 1,
  "imagen_url": "http://...",
  "fecha_creacion": "2026-04-20T17:00:00.000Z",
  "categoria_nombre": "Tropicales"
}
```

---

### GET `/api/productos/categoria/:id_categoria`
Obtener productos por categoría

**Response (200):**
```json
[
  {
    "id_producto": 1,
    "nombre": "Mango",
    "descripcion": "Fruta tropical",
    "precio": 5000,
    "stock": 100,
    "categoria_nombre": "Tropicales"
  }
]
```

---

### POST `/api/productos`
Crear nuevo producto

**Body:**
```json
{
  "nombre": "Piña",
  "descripcion": "Fruta tropical dulce",
  "precio": 3000,
  "stock": 50,
  "id_categoria": 1,
  "imagen_url": "http://..."
}
```

**Response (201):**
```json
{
  "id_producto": 3,
  "nombre": "Piña",
  "descripcion": "Fruta tropical dulce",
  "precio": 3000,
  "stock": 50,
  "id_categoria": 1,
  "imagen_url": "http://...",
  "fecha_creacion": "2026-04-20T17:30:00.000Z"
}
```

---

### PUT `/api/productos/:id`
Actualizar producto

**Body:**
```json
{
  "nombre": "Piña Premium",
  "descripcion": "Fruta tropical dulce de calidad premium",
  "precio": 3500,
  "stock": 60,
  "id_categoria": 1,
  "imagen_url": "http://..."
}
```

**Response (200):**
```json
{
  "id_producto": 3,
  "nombre": "Piña Premium",
  "descripcion": "Fruta tropical dulce de calidad premium",
  "precio": 3500,
  "stock": 60,
  "id_categoria": 1,
  "fecha_creacion": "2026-04-20T17:30:00.000Z"
}
```

---

### PATCH `/api/productos/:id/stock`
Actualizar stock del producto

**Body:**
```json
{
  "stock": 80
}
```

**Response (200):**
```json
{
  "message": "Stock actualizado",
  "producto": {
    "id_producto": 3,
    "nombre": "Piña Premium",
    "stock": 80
  }
}
```

---

### DELETE `/api/productos/:id`
Eliminar producto

**Response (200):**
```json
{
  "message": "Producto eliminado",
  "producto": {
    "id_producto": 3,
    "nombre": "Piña Premium",
    "precio": 3500
  }
}
```
