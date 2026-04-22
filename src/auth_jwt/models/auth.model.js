import { pool } from '../../config/db.js';

// Obtener usuario por correo
export const getUserByEmail = async (correo) => {
  const result = await pool.query(
    'SELECT * FROM usuario WHERE correo = $1',
    [correo]
  );
  return result.rows[0];
};

// Crear nuevo usuario
export const createUser = async (nombre, correo, passwordHash, telefono, direccion, rol = 'cliente') => {
  const result = await pool.query(
    `INSERT INTO usuario (nombre, correo, password, telefono, direccion, rol)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_usuario, nombre, correo, telefono, direccion, rol`,
    [nombre, correo, passwordHash, telefono, direccion, rol]
  );
  return result.rows[0];
};

// Obtener usuario por ID
export const getUserById = async (id_usuario) => {
  const result = await pool.query(
    'SELECT id_usuario, nombre, correo, telefono, direccion, rol FROM usuario WHERE id_usuario = $1',
    [id_usuario]
  );
  return result.rows[0];
};
