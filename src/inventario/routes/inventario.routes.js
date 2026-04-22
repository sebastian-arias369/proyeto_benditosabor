import { Router } from 'express';
import {
  getInventories,
  getInventory,
  getInventoryByProduct,
  createInventory,
  updateInventory,
  addQuantity,
  removeQuantity,
  deleteInventory,
  getLowStock
} from '../controllers/inventario.controller.js';

const router = Router();

router.get('/', getInventories);
router.get('/bajo-stock', getLowStock);
router.get('/:id', getInventory);
router.get('/producto/:id_producto', getInventoryByProduct);
router.post('/', createInventory);
router.put('/:id', updateInventory);
router.patch('/:id/agregar', addQuantity);
router.patch('/:id/restar', removeQuantity);
router.delete('/:id', deleteInventory);

export default router;
