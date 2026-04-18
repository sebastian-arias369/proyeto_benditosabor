import { Router } from 'express';
import { getUsuarios, createUsuario } from '../controllers/usuario.controller.js';

const router = Router();

router.get('/', getUsuarios);
router.post('/', createUsuario);

export default router;