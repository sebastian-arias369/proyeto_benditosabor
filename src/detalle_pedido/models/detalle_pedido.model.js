import { pool } from '../../config/db.js';

// Obtener todos los detalles de pedidos
export const getAllDetailsPedido = async () => {
  const result = await pool.query(`
    SELECT dp.*, p.nombre AS producto_nombre, p.precio AS producto_precio
    FROM detalle_pedido dp
    JOIN producto p ON dp.id_producto = p.id_producto
  `);
  return result.rows;
};

// Obtener detalles de un pedido específico
export const getDetailsByPedidoId = async (id_pedido) => {
  const result = await pool.query(`
    SELECT dp.*, p.nombre AS producto_nombre, p.precio AS producto_precio
    FROM detalle_pedido dp
    JOIN producto p ON dp.id_producto = p.id_producto
    WHERE dp.id_pedido = $1
  `, [id_pedido]);
  return result.rows;
};

// Obtener detalle específico por ID
export const getDetailById = async (id_detalle) => {
  const result = await pool.query(`
    SELECT dp.*, p.nombre AS producto_nombre, p.precio AS producto_precio
    FROM detalle_pedido dp
    JOIN producto p ON dp.id_producto = p.id_producto
    WHERE dp.id_detalle = $1
  `, [id_detalle]);
  return result.rows[0];
};

// Crear nuevo detalle de pedido
export const createDetailPedido = async (id_pedido, id_producto, cantidad, precio_unitario) => {
  const subtotal = cantidad * precio_unitario;
  
  const result = await pool.query(
    `INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario, subtotal)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [id_pedido, id_producto, cantidad, precio_unitario, subtotal]
  );
  return result.rows[0];
};

// Actualizar detalle de pedido
export const updateDetailPedido = async (id_detalle, cantidad, precio_unitario) => {
  const subtotal = cantidad * precio_unitario;
  
  const result = await pool.query(
    `UPDATE detalle_pedido SET cantidad = $1, precio_unitario = $2, subtotal = $3
     WHERE id_detalle = $4 RETURNING *`,
    [cantidad, precio_unitario, subtotal, id_detalle]
  );
  return result.rows[0];
};

// Eliminar detalle de pedido
export const deleteDetailPedido = async (id_detalle) => {
  const result = await pool.query(
    'DELETE FROM detalle_pedido WHERE id_detalle = $1 RETURNING *',
    [id_detalle]
  );
  return result.rows[0];
};
