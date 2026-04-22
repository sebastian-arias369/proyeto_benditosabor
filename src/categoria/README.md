# API de Categorías

## Estructura de Capas

```
categoria/
├── models/
│   └── categoria.model.js
├── services/
│   └── categoria.service.js
├── controllers/
│   └── categoria.controller.js
└── routes/
    └── categoria.routes.js
```

## Endpoints

### GET `/api/categorias`
Obtener todas las categorías

**Response (200):**
```json
[
  {
    "id_categoria": 1,
    "nombre": "Tropicales",
    "descripcion": "Frutas tropicales"
  }
]
```

---

### GET `/api/categorias/:id`
Obtener categoría por ID

**Response (200):**
```json
{
  "id_categoria": 1,
  "nombre": "Tropicales",
  "descripcion": "Frutas tropicales"
}
```

---

### POST `/api/categorias`
Crear nueva categoría

**Body:**
```json
{
  "nombre": "Cítricos",
  "descripcion": "Frutas cítricas"
}
```

**Response (201):**
```json
{
  "id_categoria": 2,
  "nombre": "Cítricos",
  "descripcion": "Frutas cítricas"
}
```

---

### PUT `/api/categorias/:id`
Actualizar categoría

**Body:**
```json
{
  "nombre": "Cítricos Premium",
  "descripcion": "Frutas cítricas de calidad premium"
}
```

**Response (200):**
```json
{
  "id_categoria": 2,
  "nombre": "Cítricos Premium",
  "descripcion": "Frutas cítricas de calidad premium"
}
```

---

### DELETE `/api/categorias/:id`
Eliminar categoría

**Response (200):**
```json
{
  "message": "Categoría eliminada",
  "categoria": {
    "id_categoria": 2,
    "nombre": "Cítricos Premium",
    "descripcion": "Frutas cítricas de calidad premium"
  }
}
```
