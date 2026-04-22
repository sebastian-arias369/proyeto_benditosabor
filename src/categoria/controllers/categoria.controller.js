import * as categoriaService from '../services/categoria.service.js';

// Obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const categories = await categoriaService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener categoría por ID
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoriaService.getCategoryById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Crear nueva categoría
export const createCategory = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre de la categoría es requerido' });
    }

    const newCategory = await categoriaService.createNewCategory(nombre, descripcion);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar categoría
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre de la categoría es requerido' });
    }

    const updatedCategory = await categoriaService.updateExistingCategory(id, nombre, descripcion);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar categoría
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoriaService.deleteExistingCategory(id);
    res.status(200).json({ message: 'Categoría eliminada', categoria: deletedCategory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
