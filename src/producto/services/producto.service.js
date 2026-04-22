import * as productoModel from '../models/producto.model.js';

// Obtener todos los productos
export const getAllProducts = async () => {
  const products = await productoModel.getAllProducts();
  return products;
};

// Obtener producto por ID
export const getProductById = async (id_producto) => {
  if (!id_producto) {
    throw new Error('ID de producto es requerido');
  }

  const product = await productoModel.getProductById(id_producto);
  if (!product) {
    throw new Error('Producto no encontrado');
  }

  return product;
};

// Obtener productos por categoría
export const getProductsByCategory = async (id_categoria) => {
  if (!id_categoria) {
    throw new Error('ID de categoría es requerido');
  }

  const products = await productoModel.getProductsByCategory(id_categoria);
  return products;
};

// Crear nuevo producto
export const createNewProduct = async (nombre, descripcion, precio, stock, id_categoria, imagen_url) => {
  if (!nombre || !precio) {
    throw new Error('Nombre y precio son requeridos');
  }

  if (precio <= 0) {
    throw new Error('El precio debe ser mayor a 0');
  }

  if (stock === undefined || stock < 0) {
    throw new Error('El stock no puede ser negativo');
  }

  const product = await productoModel.createProduct(nombre, descripcion, precio, stock, id_categoria, imagen_url);
  return product;
};

// Actualizar producto
export const updateExistingProduct = async (id_producto, nombre, descripcion, precio, stock, id_categoria, imagen_url) => {
  if (!id_producto) {
    throw new Error('ID de producto es requerido');
  }

  if (!nombre || !precio) {
    throw new Error('Nombre y precio son requeridos');
  }

  if (precio <= 0) {
    throw new Error('El precio debe ser mayor a 0');
  }

  if (stock === undefined || stock < 0) {
    throw new Error('El stock no puede ser negativo');
  }

  const product = await productoModel.getProductById(id_producto);
  if (!product) {
    throw new Error('Producto no encontrado');
  }

  const updatedProduct = await productoModel.updateProduct(id_producto, nombre, descripcion, precio, stock, id_categoria, imagen_url);
  return updatedProduct;
};

// Eliminar producto
export const deleteExistingProduct = async (id_producto) => {
  if (!id_producto) {
    throw new Error('ID de producto es requerido');
  }

  const product = await productoModel.getProductById(id_producto);
  if (!product) {
    throw new Error('Producto no encontrado');
  }

  const deletedProduct = await productoModel.deleteProduct(id_producto);
  return deletedProduct;
};

// Actualizar stock
export const updateProductStock = async (id_producto, stock) => {
  if (!id_producto || stock === undefined) {
    throw new Error('ID de producto y stock son requeridos');
  }

  if (stock < 0) {
    throw new Error('El stock no puede ser negativo');
  }

  const product = await productoModel.getProductById(id_producto);
  if (!product) {
    throw new Error('Producto no encontrado');
  }

  const updatedProduct = await productoModel.updateStock(id_producto, stock);
  return updatedProduct;
};
