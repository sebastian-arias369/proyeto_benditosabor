# Backend Bendito Sabor 🍽️

API REST del sistema de gestión para la plataforma de venta de productos gastronómicos **Bendito Sabor**. Este backend proporciona todas las operaciones necesarias para gestionar usuarios, productos y pedidos.

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Cómo Ejecutar](#cómo-ejecutar)
- [API Endpoints](#api-endpoints)
- [Base de Datos](#base-de-datos)
- [Docker](#docker)
- [Contribuciones](#contribuciones)

---

## 🎯 Descripción General

**Bendito Sabor** es una plataforma de comercio electrónico enfocada en la venta de productos gastronómicos. Este backend es responsable de:

- **Gestión de Usuarios**: Registro, autenticación y perfil de clientes
- **Catálogo de Productos**: Almacenamiento y recuperación de productos con categorías
- **Gestión de Pedidos**: Creación, seguimiento y procesamiento de pedidos
- **Integración de Base de Datos**: Almacenamiento persistente en PostgreSQL

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| **Node.js** | 22.11.0 | Runtime de JavaScript |
| **Express.js** | 4.18.2 | Framework web minimalista |
| **PostgreSQL** | 15 | Base de datos relacional |
| **pg** | 8.11.3 | Driver de PostgreSQL para Node.js |
| **CORS** | 2.8.5 | Middleware para compartir recursos entre orígenes |
| **dotenv** | 16.4.0 | Gestión de variables de entorno |
| **nodemon** | 3.0.3 | Monitor de desarrollo (auto-reinicio) |

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 22.0.0 (Descarga desde [nodejs.org](https://nodejs.org/))
- **npm** >= 10.0.0 (Incluido con Node.js)
- **PostgreSQL** >= 15 (Opcional si usas Docker)
- **Docker & Docker Compose** (Opcional, para ejecutar en contenedores)

Para verificar las versiones instaladas:
```bash
node --version
npm --version
docker --version
docker-compose --version
```

---

## 🚀 Instalación

### Paso 1: Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd backend_benditosabor
```

### Paso 2: Instalar Dependencias
```bash
npm install
```

Este comando instala todas las dependencias listadas en `package.json`.

### Paso 3: Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env  # Si existe un archivo de ejemplo
# O crea uno manualmente con:
```

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=bendito_sabor

# Servidor
NODE_ENV=development
PORT=4000
```

### Paso 4: Configurar la Base de Datos
Si ejecutas PostgreSQL localmente:

```bash
psql -U admin -h localhost -d bendito_sabor -f init.sql
```

O si tienes Docker:
```bash
docker-compose up db
```

---

## 📁 Estructura del Proyecto

```
backend_benditosabor/
├── src/
│   ├── app.js                          # Punto de entrada principal
│   ├── config/
│   │   └── db.js                       # Configuración de conexión a BD
│   ├── controllers/
│   │   ├── usuario.controller.js       # Lógica de usuarios
│   │   ├── producto.controller.js      # Lógica de productos
│   │   └── pedido.controller.js        # Lógica de pedidos
│   └── routes/
│       ├── usuario.routes.js           # Rutas de usuarios
│       ├── producto.routes.js          # Rutas de productos
│       └── pedido.routes.js            # Rutas de pedidos
├── Dockerfile                          # Configuración para Docker
├── .dockerignore                       # Archivos excluidos de Docker
├── docker-compose.yml                  # Orquestación de contenedores
├── init.sql                            # Script de inicialización de BD
├── package.json                        # Dependencias del proyecto
├── package-lock.json                   # Lock de versiones exactas
└── README.md                           # Este archivo
```

### Descripción de Carpetas

**`src/`** - Código fuente de la aplicación
- **`app.js`**: Configuración principal de Express, middleware y rutas
- **`config/`**: Configuraciones de la aplicación (conexión a BD)
- **`controllers/`**: Lógica de negocio - procesa solicitudes y devuelve respuestas
- **`routes/`**: Definición de endpoints HTTP

---

## 🔐 Variables de Entorno

### Archivo `.env`

El archivo `.env` contiene configuraciones sensibles que no deben ser commitidas al repositorio. Las siguientes variables están disponibles:

```env
# CONEXIÓN A BASE DE DATOS
DB_HOST=localhost              # Host de PostgreSQL
DB_PORT=5432                   # Puerto de PostgreSQL
DB_USER=admin                  # Usuario de BD
DB_PASSWORD=admin123           # Contraseña de BD
DB_NAME=bendito_sabor          # Nombre de la base de datos

# SERVIDOR
NODE_ENV=development           # Ambiente (development/production)
PORT=4000                      # Puerto donde escucha el servidor
```

### Valores por Defecto

Si no estableces variables de entorno, el sistema usará estos valores por defecto (ver `src/config/db.js`):
- `DB_HOST`: localhost
- `DB_PORT`: 5432
- `DB_USER`: admin
- `DB_PASSWORD`: admin123
- `DB_NAME`: bendito_sabor

---

## ▶️ Cómo Ejecutar

### Opción 1: Ejecución Local

#### Desarrollo (con auto-reload)
```bash
npm run dev
```
Usa **nodemon** para reiniciar automáticamente el servidor cuando hay cambios en los archivos.

#### Producción
```bash
npm start
```
Ejecuta el servidor una sola vez.

**Salida esperada:**
```
Servidor corriendo en puerto 4000
```

### Opción 2: Ejecución Directa
```bash
node src/app.js
```

### Verificar que el Servidor está Corriendo
```bash
curl http://localhost:4000/api/usuarios
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:4000/api
```

---

### 👥 Usuarios (`/api/usuarios`)

#### **GET** `/api/usuarios`
Obtiene la lista de todos los usuarios registrados.

**Respuesta (200 OK):**
```json
[
  {
    "id_usuario": 1,
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "password": "hashed_password",
    "telefono": "+34 612345678",
    "direccion": "Calle Principal 123",
    "rol": "cliente"
  },
  {
    "id_usuario": 2,
    "nombre": "María García",
    "correo": "maria@example.com",
    "password": "hashed_password",
    "telefono": "+34 687654321",
    "direccion": "Avenida Central 456",
    "rol": "admin"
  }
]
```

---

#### **POST** `/api/usuarios`
Crea un nuevo usuario (registro de cliente).

**Body (JSON):**
```json
{
  "nombre": "Carlos López",
  "correo": "carlos@example.com",
  "password": "mi_contraseña_123",
  "telefono": "+34 698765432",
  "direccion": "Calle Secundaria 789",
  "rol": "cliente"
}
```

**Respuesta (200 OK):**
```json
{
  "id_usuario": 3,
  "nombre": "Carlos López",
  "correo": "carlos@example.com",
  "password": "mi_contraseña_123",
  "telefono": "+34 698765432",
  "direccion": "Calle Secundaria 789",
  "rol": "cliente"
}
```

**Errores Posibles:**
- `500 Internal Server Error`: Error al insertar en la BD

---

### 🛍️ Productos (`/api/productos`)

#### **GET** `/api/productos`
Obtiene todos los productos del catálogo con su información de categoría.

**Respuesta (200 OK):**
```json
[
  {
    "id_producto": 1,
    "nombre": "Jamón Ibérico",
    "descripcion": "Jamón de cerdo ibérico de primera calidad",
    "precio": "45.99",
    "stock": 50,
    "id_categoria": 1,
    "imagen_url": "https://example.com/jamon.jpg",
    "categoria": "Carnes"
  },
  {
    "id_producto": 2,
    "nombre": "Queso Manchego",
    "descripcion": "Queso artesanal de la región de La Mancha",
    "precio": "12.50",
    "stock": 100,
    "id_categoria": 2,
    "imagen_url": "https://example.com/queso.jpg",
    "categoria": "Lácteos"
  }
]
```

---

#### **POST** `/api/productos`
Añade un nuevo producto al catálogo.

**Body (JSON):**
```json
{
  "nombre": "Chorizo Ibérico",
  "descripcion": "Chorizo artesanal de cerdo ibérico",
  "precio": "8.50",
  "stock": 75,
  "id_categoria": 1,
  "imagen_url": "https://example.com/chorizo.jpg"
}
```

**Respuesta (200 OK):**
```json
{
  "id_producto": 3,
  "nombre": "Chorizo Ibérico",
  "descripcion": "Chorizo artesanal de cerdo ibérico",
  "precio": "8.50",
  "stock": 75,
  "id_categoria": 1,
  "imagen_url": "https://example.com/chorizo.jpg"
}
```

---

### 📦 Pedidos (`/api/pedidos`)

#### **GET** `/api/pedidos`
Obtiene todos los pedidos con información del usuario que los realizó.

**Respuesta (200 OK):**
```json
[
  {
    "id_pedido": 1,
    "id_usuario": 1,
    "total": "125.50",
    "estado": "pendiente",
    "nombre": "Juan Pérez"
  },
  {
    "id_pedido": 2,
    "id_usuario": 2,
    "total": "89.99",
    "estado": "entregado",
    "nombre": "María García"
  }
]
```

---

#### **POST** `/api/pedidos`
Crea un nuevo pedido.

**Body (JSON):**
```json
{
  "id_usuario": 1,
  "total": "145.75",
  "estado": "pendiente"
}
```

**Respuesta (200 OK):**
```json
{
  "id_pedido": 3,
  "id_usuario": 1,
  "total": "145.75",
  "estado": "pendiente"
}
```

**Errores Posibles:**
- `500 Internal Server Error`: El usuario no existe o error en BD

---

## 💾 Base de Datos

### Esquema de Tablas

#### **Tabla `usuario`**
Almacena la información de los clientes y administradores.

```sql
CREATE TABLE usuario (
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  direccion VARCHAR(255),
  rol VARCHAR(20) DEFAULT 'cliente'
);
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_usuario` | SERIAL | Identificador único |
| `nombre` | VARCHAR(100) | Nombre completo |
| `correo` | VARCHAR(100) | Email único |
| `password` | VARCHAR(255) | Contraseña hasheada |
| `telefono` | VARCHAR(20) | Número de teléfono |
| `direccion` | VARCHAR(255) | Dirección de envío |
| `rol` | VARCHAR(20) | Rol del usuario (cliente/admin) |

---

#### **Tabla `categoria`**
Categoría de productos (ej: Carnes, Lácteos, Bebidas).

```sql
CREATE TABLE categoria (
  id_categoria SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);
```

---

#### **Tabla `producto`**
Catálogo de productos disponibles.

```sql
CREATE TABLE producto (
  id_producto SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  id_categoria INTEGER,
  imagen_url VARCHAR(255),
  FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_producto` | SERIAL | Identificador único |
| `nombre` | VARCHAR(100) | Nombre del producto |
| `descripcion` | TEXT | Descripción detallada |
| `precio` | DECIMAL(10, 2) | Precio unitario |
| `stock` | INTEGER | Cantidad disponible |
| `id_categoria` | INTEGER | Referencia a categoría |
| `imagen_url` | VARCHAR(255) | URL de la imagen |

---

#### **Tabla `pedido`**
Registro de pedidos realizados.

```sql
CREATE TABLE pedido (
  id_pedido SERIAL PRIMARY KEY,
  id_usuario INTEGER NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  estado VARCHAR(50) DEFAULT 'pendiente',
  fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_pedido` | SERIAL | Identificador único |
| `id_usuario` | INTEGER | Usuario que realizó el pedido |
| `total` | DECIMAL(10, 2) | Monto total |
| `estado` | VARCHAR(50) | Estado (pendiente/entregado/cancelado) |
| `fecha_pedido` | TIMESTAMP | Fecha de creación |

---

### Relaciones de Tablas

```
usuario (1) ──── (N) pedido
categoria (1) ──── (N) producto
```

---

## 🐳 Docker

### Ejecutar Todos los Servicios

Levanta la base de datos, PostgREST y el backend automáticamente:

```bash
docker-compose up
```

**Servicios que se inician:**
- **db** (PostgreSQL) en `localhost:5432`
- **postgrest** (API auto-generada) en `localhost:3000`
- **backend** (Tu API) en `localhost:4000`

### Ejecutar en Segundo Plano
```bash
docker-compose up -d
```

### Detener los Servicios
```bash
docker-compose down
```

### Ver Logs
```bash
docker-compose logs -f backend
```

### Reconstruir la Imagen
Si realizas cambios en el código:
```bash
docker-compose up --build
```

### Estructura de Docker Compose

```yaml
services:
  db:                    # PostgreSQL
    - Puerto: 5432
    - Base datos: bendito_sabor
  
  postgrest:            # API REST auto-generada
    - Puerto: 3000
    - Depende de: db
  
  backend:              # Tu API Express
    - Puerto: 4000
    - Depende de: db
```

---

## 📝 Archivo `.gitignore`

Asegúrate de que estos archivos NO sean commitidos:

```
node_modules/
.env
.DS_Store
npm-debug.log
```

---

## 🤝 Contribuciones

Para contribuir al proyecto:

1. Crea una rama desde `main`:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. Realiza tus cambios y commitea:
   ```bash
   git commit -m "Agregar nueva funcionalidad"
   ```

3. Push a tu rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

4. Abre un Pull Request

---

## 📧 Contacto

**Autor:** Sebastian Arias
**Email:** sebastian-arias369@example.com
**Proyecto:** Bendito Sabor - Backend API

---

## 📄 Licencia

Este proyecto está bajo la licencia **ISC**.

---

## ✅ Checklist de Desarrollo

- [ ] Variables de entorno configuradas (`.env`)
- [ ] Base de datos PostgreSQL ejecutándose
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor iniciado (`npm run dev` o `npm start`)
- [ ] API respondiendo en `http://localhost:4000`
- [ ] Endpoints probados con herramientas como Postman o curl

---

**¡Listo! Ya puedes empezar a desarrollar con Bendito Sabor Backend.** 🚀
