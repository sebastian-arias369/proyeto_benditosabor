import { pool } from '../config/db.js';

export const getProductos = async (req, res) => {
  const result = await pool.query(`
    SELECT p.*, c.nombre AS categoria
    FROM producto p
    LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
  `);

  res.json(result.rows);
};

export const createProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock, id_categoria, imagen_url } = req.body;

  const result = await pool.query(
    `INSERT INTO producto (nombre, descripcion, precio, stock, id_categoria, imagen_url)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [nombre, descripcion, precio, stock, id_categoria, imagen_url]
  );

  res.json(result.rows[0]);
};