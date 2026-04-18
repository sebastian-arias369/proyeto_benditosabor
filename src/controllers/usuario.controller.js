import { pool } from '../config/db.js';

export const getUsuarios = async (req, res) => {
  const result = await pool.query('SELECT * FROM usuario');
  res.json(result.rows);
};

export const createUsuario = async (req, res) => {
  const { nombre, correo, password, telefono, direccion, rol } = req.body;

  const result = await pool.query(
    `INSERT INTO usuario (nombre, correo, password, telefono, direccion, rol)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [nombre, correo, password, telefono, direccion, rol]
  );

  res.json(result.rows[0]);
};