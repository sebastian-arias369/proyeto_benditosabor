import { pool } from '../config/db.js';

export const getPedidos = async (req, res) => {
  const result = await pool.query(`
    SELECT p.*, u.nombre
    FROM pedido p
    JOIN usuario u ON p.id_usuario = u.id_usuario
  `);

  res.json(result.rows);
};

export const createPedido = async (req, res) => {
  const { id_usuario, total, estado } = req.body;

  const result = await pool.query(
    `INSERT INTO pedido (id_usuario, total, estado)
     VALUES ($1,$2,$3) RETURNING *`,
    [id_usuario, total, estado]
  );

  res.json(result.rows[0]);
};