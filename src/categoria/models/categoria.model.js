import { pool } from '../../config/db.js';

// Obtener todas las categorías
export const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categoria');
  return result.rows;
};

// Obtener categoría por ID
export const getCategoryById = async (id_categoria) => {
  const result = await pool.query(
    'SELECT * FROM categoria WHERE id_categoria = $1',
    [id_categoria]
  );
  return result.rows[0];
};

// Crear nueva categoría
export const createCategory = async (nombre, descripcion) => {
  const result = await pool.query(
    'INSERT INTO categoria (nombre, descripcion) VALUES ($1, $2) RETURNING *',
    [nombre, descripcion]
  );
  return result.rows[0];
};

// Actualizar categoría
export const updateCategory = async (id_categoria, nombre, descripcion) => {
  const result = await pool.query(
    'UPDATE categoria SET nombre = $1, descripcion = $2 WHERE id_categoria = $3 RETURNING *',
    [nombre, descripcion, id_categoria]
  );
  return result.rows[0];
};

// Eliminar categoría
export const deleteCategory = async (id_categoria) => {
  const result = await pool.query(
    'DELETE FROM categoria WHERE id_categoria = $1 RETURNING *',
    [id_categoria]
  );
  return result.rows[0];
};
