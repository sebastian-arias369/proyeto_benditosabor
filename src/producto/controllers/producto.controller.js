import * as productoService from '../services/producto.service.js';

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const products = await productoService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener producto por ID
export const getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productoService.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener productos por categoría
export const getProductosByCategory = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const products = await productoService.getProductsByCategory(id_categoria);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Crear nuevo producto
export const createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, id_categoria, imagen_url } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({
        error: 'Nombre y precio son requeridos'
      });
    }

    const product = await productoService.createNewProduct(nombre, descripcion, precio, stock || 0, id_categoria, imagen_url);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar producto
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, id_categoria, imagen_url } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({
        error: 'Nombre y precio son requeridos'
      });
    }

    const product = await productoService.updateExistingProduct(id, nombre, descripcion, precio, stock, id_categoria, imagen_url);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar producto
export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productoService.deleteExistingProduct(id);
    res.status(200).json({ message: 'Producto eliminado', producto: product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar stock
export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    if (stock === undefined) {
      return res.status(400).json({ error: 'Stock es requerido' });
    }

    const product = await productoService.updateProductStock(id, stock);
    res.status(200).json({ message: 'Stock actualizado', producto: product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
