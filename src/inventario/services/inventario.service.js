import * as inventarioModel from '../models/inventario.model.js';

// Obtener todos los inventarios
export const getAllInventories = async () => {
  const inventories = await inventarioModel.getAllInventories();
  return inventories;
};

// Obtener inventario por ID
export const getInventoryById = async (id_inventario) => {
  if (!id_inventario) {
    throw new Error('ID de inventario es requerido');
  }

  const inventory = await inventarioModel.getInventoryById(id_inventario);
  if (!inventory) {
    throw new Error('Inventario no encontrado');
  }

  return inventory;
};

// Obtener inventario por ID de producto
export const getInventoryByProductId = async (id_producto) => {
  if (!id_producto) {
    throw new Error('ID de producto es requerido');
  }

  const inventory = await inventarioModel.getInventoryByProductId(id_producto);
  if (!inventory) {
    throw new Error('Inventario no encontrado para este producto');
  }

  return inventory;
};

// Crear nuevo inventario
export const createNewInventory = async (id_producto, cantidad, stock_minimo) => {
  if (!id_producto || cantidad === undefined) {
    throw new Error('ID de producto y cantidad son requeridos');
  }

  if (cantidad < 0) {
    throw new Error('La cantidad no puede ser negativa');
  }

  const inventory = await inventarioModel.createInventory(id_producto, cantidad, stock_minimo);
  return inventory;
};

// Actualizar inventario
export const updateExistingInventory = async (id_inventario, cantidad, stock_minimo) => {
  if (!id_inventario) {
    throw new Error('ID de inventario es requerido');
  }

  if (cantidad === undefined || stock_minimo === undefined) {
    throw new Error('Cantidad y stock mínimo son requeridos');
  }

  if (cantidad < 0) {
    throw new Error('La cantidad no puede ser negativa');
  }

  const inventory = await inventarioModel.getInventoryById(id_inventario);
  if (!inventory) {
    throw new Error('Inventario no encontrado');
  }

  const updatedInventory = await inventarioModel.updateInventory(id_inventario, cantidad, stock_minimo);
  return updatedInventory;
};

// Incrementar cantidad
export const addQuantity = async (id_inventario, cantidad) => {
  if (!id_inventario || !cantidad) {
    throw new Error('ID de inventario y cantidad son requeridos');
  }

  if (cantidad <= 0) {
    throw new Error('La cantidad debe ser mayor a 0');
  }

  const inventory = await inventarioModel.getInventoryById(id_inventario);
  if (!inventory) {
    throw new Error('Inventario no encontrado');
  }

  const updatedInventory = await inventarioModel.incrementInventory(id_inventario, cantidad);
  return updatedInventory;
};

// Decrementar cantidad
export const removeQuantity = async (id_inventario, cantidad) => {
  if (!id_inventario || !cantidad) {
    throw new Error('ID de inventario y cantidad son requeridos');
  }

  if (cantidad <= 0) {
    throw new Error('La cantidad debe ser mayor a 0');
  }

  const inventory = await inventarioModel.getInventoryById(id_inventario);
  if (!inventory) {
    throw new Error('Inventario no encontrado');
  }

  if (inventory.cantidad < cantidad) {
    throw new Error(`Stock insuficiente. Disponible: ${inventory.cantidad}, Solicitado: ${cantidad}`);
  }

  const updatedInventory = await inventarioModel.decrementInventory(id_inventario, cantidad);
  return updatedInventory;
};

// Eliminar inventario
export const deleteExistingInventory = async (id_inventario) => {
  if (!id_inventario) {
    throw new Error('ID de inventario es requerido');
  }

  const inventory = await inventarioModel.getInventoryById(id_inventario);
  if (!inventory) {
    throw new Error('Inventario no encontrado');
  }

  const deletedInventory = await inventarioModel.deleteInventory(id_inventario);
  return deletedInventory;
};

// Obtener productos con stock bajo
export const getLowStockProducts = async () => {
  const products = await inventarioModel.getLowStockProducts();
  return products;
};
