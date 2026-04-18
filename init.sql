-- =========================
-- CREAR TABLAS PRIMERO
-- =========================

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(150),
    rol VARCHAR(20) CHECK (rol IN ('cliente','admin')) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    id_categoria INTEGER,
    imagen_url VARCHAR(255),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
        ON DELETE SET NULL
);

CREATE TABLE inventario (
    id_inventario SERIAL PRIMARY KEY,
    id_producto INTEGER UNIQUE NOT NULL,
    cantidad INTEGER NOT NULL,
    stock_minimo INTEGER DEFAULT 0,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
        ON DELETE CASCADE
);

CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    id_usuario INTEGER,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total NUMERIC(10,2),
    estado VARCHAR(20) CHECK (estado IN ('pendiente','proceso','entregado')) DEFAULT 'pendiente',
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
        ON DELETE CASCADE
);

CREATE TABLE detalle_pedido (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INTEGER,
    id_producto INTEGER,
    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10,2),
    subtotal NUMERIC(10,2),
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido)
        ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
        ON DELETE CASCADE
);

-- =========================
-- CREAR ROL Y PERMISOS (DESPUÉS)
-- =========================

CREATE ROLE web_anon NOLOGIN;

GRANT USAGE ON SCHEMA public TO web_anon;

GRANT SELECT, INSERT, UPDATE, DELETE 
ON ALL TABLES IN SCHEMA public 
TO web_anon;

GRANT USAGE, SELECT 
ON ALL SEQUENCES IN SCHEMA public 
TO web_anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO web_anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT USAGE, SELECT ON SEQUENCES TO web_anon;

-- =========================
-- INSERTS
-- =========================

INSERT INTO usuario (nombre, correo, password, telefono, direccion, rol) VALUES
('Juan Pérez', 'juan@mail.com', '123456', '3001111111', 'Tuluá', 'cliente'),
('María Gómez', 'maria@mail.com', '123456', '3002222222', 'Tuluá', 'cliente'),
('Carlos Ruiz', 'carlos@mail.com', '123456', '3003333333', 'Tuluá', 'cliente'),
('Ana Torres', 'ana@mail.com', '123456', '3004444444', 'Tuluá', 'cliente'),
('Admin Sistema', 'admin@mail.com', 'admin123', '3005555555', 'Tuluá', 'admin');

INSERT INTO categoria (nombre, descripcion) VALUES
('Tropicales', 'Frutas tropicales'),
('Cítricos', 'Frutas ácidas'),
('Rojas', 'Frutas rojas'),
('Exóticas', 'Frutas poco comunes'),
('Mixtas', 'Combinación de frutas');

INSERT INTO producto (nombre, descripcion, precio, stock, id_categoria, imagen_url) VALUES
('Pulpa de Mango', 'Pulpa natural de mango', 5000, 50, 1, 'img/mango.jpg'),
('Pulpa de Maracuyá', 'Pulpa natural de maracuyá', 6000, 40, 2, 'img/maracuya.jpg'),
('Pulpa de Fresa', 'Pulpa natural de fresa', 5500, 30, 3, 'img/fresa.jpg'),
('Pulpa de Guanábana', 'Pulpa natural de guanábana', 6500, 20, 4, 'img/guanabana.jpg'),
('Pulpa Mixta', 'Mezcla de frutas', 7000, 25, 5, 'img/mixta.jpg');

INSERT INTO inventario (id_producto, cantidad, stock_minimo) VALUES
(1, 50, 10),
(2, 40, 10),
(3, 30, 5),
(4, 20, 5),
(5, 25, 8);

INSERT INTO pedido (id_usuario, total, estado) VALUES
(1, 10000, 'pendiente'),
(2, 12000, 'proceso'),
(3, 15000, 'entregado'),
(4, 8000, 'pendiente'),
(1, 20000, 'proceso');

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 2, 5000, 10000),
(2, 2, 2, 6000, 12000),
(3, 3, 3, 5000, 15000),
(4, 1, 1, 5000, 5000),
(5, 5, 2, 7000, 14000);