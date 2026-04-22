import { pool } from '../../config/db.js';

// Obtener todos los inventarios
export const getAllInventories = async () => {
  const result = await pool.query(`
    SELECT i.*, p.nombre AS producto_nombre, p.precio
    FROM inventario i
    JOIN producto p ON i.id_producto = p.id_producto
  `);
  return result.rows;
};

// Obtener inventario por ID
export const getInventoryById = async (id_inventario) => {
  const result = await pool.query(`
    SELECT i.*, p.nombre AS producto_nombre, p.precio
    FROM inventario i
    JOIN producto p ON i.id_producto = p.id_producto
    WHERE i.id_inventario = $1
  `, [id_inventario]);
  return result.rows[0];
};

// Obtener inventario por ID de producto
export const getInventoryByProductId = async (id_producto) => {
  const result = await pool.query(`
    SELECT i.*, p.nombre AS producto_nombre, p.precio
    FROM inventario i
    JOIN producto p ON i.id_producto = p.id_producto
    WHERE i.id_producto = $1
  `, [id_producto]);
  return result.rows[0];
};

// Crear nuevo inventario
export const createInventory = async (id_producto, cantidad, stock_minimo) => {
  const result = await pool.query(
    `INSERT INTO inventario (id_producto, cantidad, stock_minimo)
     VALUES ($1, $2, $3) RETURNING *`,
    [id_producto, cantidad, stock_minimo || 0]
  );
  return result.rows[0];
};

// Actualizar cantidad en inventario
export const updateInventory = async (id_inventario, cantidad, stock_minimo) => {
  const result = await pool.query(
    `UPDATE inventario SET cantidad = $1, stock_minimo = $2, ultima_actualizacion = NOW()
     WHERE id_inventario = $3 RETURNING *`,
    [cantidad, stock_minimo, id_inventario]
  );
  return result.rows[0];
};

// Incrementar cantidad
export const incrementInventory = async (id_inventario, cantidad) => {
  const result = await pool.query(
    `UPDATE inventario SET cantidad = cantidad + $1, ultima_actualizacion = NOW()
     WHERE id_inventario = $2 RETURNING *`,
    [cantidad, id_inventario]
  );
  return result.rows[0];
};

// Decrementar cantidad
export const decrementInventory = async (id_inventario, cantidad) => {
  const result = await pool.query(
    `UPDATE inventario SET cantidad = cantidad - $1, ultima_actualizacion = NOW()
     WHERE id_inventario = $2 AND cantidad >= $1 RETURNING *`,
    [cantidad, id_inventario]
  );
  return result.rows[0];
};

// Eliminar inventario
export const deleteInventory = async (id_inventario) => {
  const result = await pool.query(
    'DELETE FROM inventario WHERE id_inventario = $1 RETURNING *',
    [id_inventario]
  );
  return result.rows[0];
};

// Obtener productos con stock bajo
export const getLowStockProducts = async () => {
  const result = await pool.query(`
    SELECT i.*, p.nombre AS producto_nombre, p.precio
    FROM inventario i
    JOIN producto p ON i.id_producto = p.id_producto
    WHERE i.cantidad <= i.stock_minimo
  `);
  return result.rows;
};
