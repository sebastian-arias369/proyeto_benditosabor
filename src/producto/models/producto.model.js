import { pool } from '../../config/db.js';

// Obtener todos los productos
export const getAllProducts = async () => {
  const result = await pool.query(`
    SELECT p.*, c.nombre AS categoria_nombre
    FROM producto p
    LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
  `);
  return result.rows;
};

// Obtener producto por ID
export const getProductById = async (id_producto) => {
  const result = await pool.query(`
    SELECT p.*, c.nombre AS categoria_nombre
    FROM producto p
    LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
    WHERE p.id_producto = $1
  `, [id_producto]);
  return result.rows[0];
};

// Obtener productos por categoría
export const getProductsByCategory = async (id_categoria) => {
  const result = await pool.query(`
    SELECT p.*, c.nombre AS categoria_nombre
    FROM producto p
    LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
    WHERE p.id_categoria = $1
  `, [id_categoria]);
  return result.rows;
};

// Crear nuevo producto
export const createProduct = async (nombre, descripcion, precio, stock, id_categoria, imagen_url) => {
  const result = await pool.query(
    `INSERT INTO producto (nombre, descripcion, precio, stock, id_categoria, imagen_url)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [nombre, descripcion, precio, stock, id_categoria || null, imagen_url || null]
  );
  return result.rows[0];
};

// Actualizar producto
export const updateProduct = async (id_producto, nombre, descripcion, precio, stock, id_categoria, imagen_url) => {
  const result = await pool.query(
    `UPDATE producto SET nombre = $1, descripcion = $2, precio = $3, stock = $4, id_categoria = $5, imagen_url = $6
     WHERE id_producto = $7 RETURNING *`,
    [nombre, descripcion, precio, stock, id_categoria || null, imagen_url || null, id_producto]
  );
  return result.rows[0];
};

// Eliminar producto
export const deleteProduct = async (id_producto) => {
  const result = await pool.query(
    'DELETE FROM producto WHERE id_producto = $1 RETURNING *',
    [id_producto]
  );
  return result.rows[0];
};

// Actualizar stock
export const updateStock = async (id_producto, stock) => {
  const result = await pool.query(
    'UPDATE producto SET stock = $1 WHERE id_producto = $2 RETURNING *',
    [stock, id_producto]
  );
  return result.rows[0];
};
