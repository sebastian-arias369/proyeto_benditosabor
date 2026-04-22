import { pool } from '../../config/db.js';

// Obtener todos los pedidos
export const getAllPedidos = async () => {
  const result = await pool.query(`
    SELECT p.*, u.nombre AS usuario_nombre, u.correo
    FROM pedido p
    JOIN usuario u ON p.id_usuario = u.id_usuario
    ORDER BY p.fecha DESC
  `);
  return result.rows;
};

// Obtener pedido por ID
export const getPedidoById = async (id_pedido) => {
  const result = await pool.query(`
    SELECT p.*, u.nombre AS usuario_nombre, u.correo, u.telefono, u.direccion
    FROM pedido p
    JOIN usuario u ON p.id_usuario = u.id_usuario
    WHERE p.id_pedido = $1
  `, [id_pedido]);
  return result.rows[0];
};

// Obtener pedidos por usuario
export const getPedidosByUser = async (id_usuario) => {
  const result = await pool.query(`
    SELECT p.*, u.nombre AS usuario_nombre
    FROM pedido p
    JOIN usuario u ON p.id_usuario = u.id_usuario
    WHERE p.id_usuario = $1
    ORDER BY p.fecha DESC
  `, [id_usuario]);
  return result.rows;
};

// Crear nuevo pedido
export const createPedido = async (id_usuario, total, estado = 'pendiente') => {
  const result = await pool.query(
    `INSERT INTO pedido (id_usuario, total, estado, fecha)
     VALUES ($1, $2, $3, NOW()) RETURNING *`,
    [id_usuario, total, estado]
  );
  return result.rows[0];
};

// Actualizar pedido
export const updatePedido = async (id_pedido, total, estado) => {
  const result = await pool.query(
    `UPDATE pedido SET total = $1, estado = $2 WHERE id_pedido = $3 RETURNING *`,
    [total, estado, id_pedido]
  );
  return result.rows[0];
};

// Actualizar estado del pedido
export const updatePedidoStatus = async (id_pedido, estado) => {
  const result = await pool.query(
    `UPDATE pedido SET estado = $1 WHERE id_pedido = $2 RETURNING *`,
    [estado, id_pedido]
  );
  return result.rows[0];
};

// Eliminar pedido
export const deletePedido = async (id_pedido) => {
  const result = await pool.query(
    'DELETE FROM pedido WHERE id_pedido = $1 RETURNING *',
    [id_pedido]
  );
  return result.rows[0];
};

// Obtener pedidos por estado
export const getPedidosByStatus = async (estado) => {
  const result = await pool.query(`
    SELECT p.*, u.nombre AS usuario_nombre
    FROM pedido p
    JOIN usuario u ON p.id_usuario = u.id_usuario
    WHERE p.estado = $1
    ORDER BY p.fecha DESC
  `, [estado]);
  return result.rows;
};
