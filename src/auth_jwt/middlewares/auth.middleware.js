import * as authService from '../services/auth.service.js';

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    const decoded = authService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    if (!allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({ error: 'No tienes permisos para acceder a este recurso' });
    }

    next();
  };
};
