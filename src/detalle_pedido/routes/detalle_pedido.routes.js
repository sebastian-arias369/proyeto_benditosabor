import { Router } from 'express';
import {
  getDetailsPedido,
  getDetailsByPedido,
  getDetail,
  createDetail,
  updateDetail,
  deleteDetail
} from '../controllers/detalle_pedido.controller.js';

const router = Router();

router.get('/', getDetailsPedido);
router.get('/pedido/:id_pedido', getDetailsByPedido);
router.get('/:id', getDetail);
router.post('/', createDetail);
router.put('/:id', updateDetail);
router.delete('/:id', deleteDetail);

export default router;
