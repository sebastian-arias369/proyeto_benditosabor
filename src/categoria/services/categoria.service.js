import * as categoriaModel from '../models/categoria.model.js';

// Obtener todas las categorías
export const getAllCategories = async () => {
  const categories = await categoriaModel.getAllCategories();
  return categories;
};

// Obtener categoría por ID
export const getCategoryById = async (id_categoria) => {
  if (!id_categoria) {
    throw new Error('ID de categoría es requerido');
  }

  const category = await categoriaModel.getCategoryById(id_categoria);
  if (!category) {
    throw new Error('Categoría no encontrada');
  }

  return category;
};

// Crear nueva categoría
export const createNewCategory = async (nombre, descripcion) => {
  if (!nombre) {
    throw new Error('El nombre de la categoría es requerido');
  }

  const newCategory = await categoriaModel.createCategory(nombre, descripcion || '');
  return newCategory;
};

// Actualizar categoría
export const updateExistingCategory = async (id_categoria, nombre, descripcion) => {
  if (!id_categoria) {
    throw new Error('ID de categoría es requerido');
  }

  if (!nombre) {
    throw new Error('El nombre de la categoría es requerido');
  }

  const category = await categoriaModel.getCategoryById(id_categoria);
  if (!category) {
    throw new Error('Categoría no encontrada');
  }

  const updatedCategory = await categoriaModel.updateCategory(id_categoria, nombre, descripcion || '');
  return updatedCategory;
};

// Eliminar categoría
export const deleteExistingCategory = async (id_categoria) => {
  if (!id_categoria) {
    throw new Error('ID de categoría es requerido');
  }

  const category = await categoriaModel.getCategoryById(id_categoria);
  if (!category) {
    throw new Error('Categoría no encontrada');
  }

  const deletedCategory = await categoriaModel.deleteCategory(id_categoria);
  return deletedCategory;
};
