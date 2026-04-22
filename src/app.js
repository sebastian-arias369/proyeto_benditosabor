
import express from 'express';
import cors from 'cors';

import usuarioRoutes from './usuario/routes/usuario.routes.js';
import productoRoutes from './producto/routes/producto.routes.js';
import pedidoRoutes from './pedido/routes/pedido.routes.js';
import authRoutes from './auth_jwt/routes/auth.routes.js';
import categoriaRoutes from './categoria/routes/categoria.routes.js';
import detallePedidoRoutes from './detalle_pedido/routes/detalle_pedido.routes.js';
import inventarioRoutes from './inventario/routes/inventario.routes.js';
import { authenticateToken } from './auth_jwt/middlewares/auth.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas públicas (sin validación de token)
app.use('/api/auth', authRoutes);

// Middleware de validación de token para todas las demás rutas
app.use(authenticateToken);

// Rutas protegidas (requieren token)
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/detalles-pedidos', detallePedidoRoutes);
app.use('/api/inventarios', inventarioRoutes);

app.listen(4000, () => {
  console.log('Servidor corriendo en puerto 4000');
});