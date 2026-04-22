import * as inventarioService from '../services/inventario.service.js';

// Obtener todos los inventarios
export const getInventories = async (req, res) => {
  try {
    const inventories = await inventarioService.getAllInventories();
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener inventario por ID
export const getInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await inventarioService.getInventoryById(id);
    res.status(200).json(inventory);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener inventario por ID de producto
export const getInventoryByProduct = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const inventory = await inventarioService.getInventoryByProductId(id_producto);
    res.status(200).json(inventory);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Crear nuevo inventario
export const createInventory = async (req, res) => {
  try {
    const { id_producto, cantidad, stock_minimo } = req.body;

    if (!id_producto || cantidad === undefined) {
      return res.status(400).json({
        error: 'ID de producto y cantidad son requeridos'
      });
    }

    const inventory = await inventarioService.createNewInventory(id_producto, cantidad, stock_minimo);
    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar inventario
export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad, stock_minimo } = req.body;

    if (cantidad === undefined || stock_minimo === undefined) {
      return res.status(400).json({
        error: 'Cantidad y stock mínimo son requeridos'
      });
    }

    const inventory = await inventarioService.updateExistingInventory(id, cantidad, stock_minimo);
    res.status(200).json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Agregar cantidad al inventario
export const addQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;

    if (!cantidad) {
      return res.status(400).json({ error: 'Cantidad es requerida' });
    }

    const inventory = await inventarioService.addQuantity(id, cantidad);
    res.status(200).json({ message: 'Cantidad agregada', inventario: inventory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Restar cantidad del inventario
export const removeQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;

    if (!cantidad) {
      return res.status(400).json({ error: 'Cantidad es requerida' });
    }

    const inventory = await inventarioService.removeQuantity(id, cantidad);
    res.status(200).json({ message: 'Cantidad restada', inventario: inventory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar inventario
export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await inventarioService.deleteExistingInventory(id);
    res.status(200).json({ message: 'Inventario eliminado', inventario: inventory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener productos con stock bajo
export const getLowStock = async (req, res) => {
  try {
    const products = await inventarioService.getLowStockProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
