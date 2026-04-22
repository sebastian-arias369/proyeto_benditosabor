import { Router } from 'express';
import {
  getPedidos,
  getPedido,
  getPedidosByUser,
  createPedido,
  updatePedido,
  updatePedidoStatus,
  deletePedido,
  getPedidosByStatus
} from '../controllers/pedido.controller.js';

const router = Router();

router.get('/', getPedidos);
router.get('/estado/:estado', getPedidosByStatus);
router.get('/usuario/:id_usuario', getPedidosByUser);
router.get('/:id', getPedido);
router.post('/', createPedido);
router.put('/:id', updatePedido);
router.patch('/:id/estado', updatePedidoStatus);
router.delete('/:id', deletePedido);

export default router;
