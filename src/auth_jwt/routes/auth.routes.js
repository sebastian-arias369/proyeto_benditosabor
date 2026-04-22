import { Router } from 'express';
import { register, login, verifyTokenController } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas (sin validación de token)
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas
router.get('/verify', authenticateToken, verifyTokenController);

export default router;
