import { Router } from 'express';
import {
  getProductos,
  getProducto,
  getProductosByCategory,
  createProducto,
  updateProducto,
  deleteProducto,
  updateStock
} from '../controllers/producto.controller.js';

const router = Router();

router.get('/', getProductos);
router.get('/categoria/:id_categoria', getProductosByCategory);
router.get('/:id', getProducto);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.patch('/:id/stock', updateStock);
router.delete('/:id', deleteProducto);

export default router;
