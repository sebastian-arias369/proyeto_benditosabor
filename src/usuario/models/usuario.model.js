import { pool } from '../../config/db.js';

// Obtener todos los usuarios
export const getAllUsers = async () => {
  const result = await pool.query('SELECT id_usuario, nombre, correo, telefono, direccion, rol, fecha_creacion FROM usuario');
  return result.rows;
};

// Obtener usuario por ID
export const getUserById = async (id_usuario) => {
  const result = await pool.query(
    'SELECT id_usuario, nombre, correo, telefono, direccion, rol, fecha_creacion FROM usuario WHERE id_usuario = $1',
    [id_usuario]
  );
  return result.rows[0];
};

// Obtener usuario por correo
export const getUserByEmail = async (correo) => {
  const result = await pool.query(
    'SELECT * FROM usuario WHERE correo = $1',
    [correo]
  );
  return result.rows[0];
};

// Crear nuevo usuario
export const createUser = async (nombre, correo, password, telefono, direccion, rol = 'cliente') => {
  const result = await pool.query(
    `INSERT INTO usuario (nombre, correo, password, telefono, direccion, rol)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_usuario, nombre, correo, telefono, direccion, rol, fecha_creacion`,
    [nombre, correo, password, telefono, direccion, rol]
  );
  return result.rows[0];
};

// Actualizar usuario
export const updateUser = async (id_usuario, nombre, correo, telefono, direccion, rol) => {
  const result = await pool.query(
    `UPDATE usuario SET nombre = $1, correo = $2, telefono = $3, direccion = $4, rol = $5
     WHERE id_usuario = $6 RETURNING id_usuario, nombre, correo, telefono, direccion, rol, fecha_creacion`,
    [nombre, correo, telefono, direccion, rol, id_usuario]
  );
  return result.rows[0];
};

// Eliminar usuario
export const deleteUser = async (id_usuario) => {
  const result = await pool.query(
    'DELETE FROM usuario WHERE id_usuario = $1 RETURNING id_usuario, nombre, correo',
    [id_usuario]
  );
  return result.rows[0];
};
