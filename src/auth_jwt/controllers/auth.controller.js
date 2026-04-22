import * as authService from '../services/auth.service.js';

// Controlador de registro
export const register = async (req, res) => {
  try {
    const { nombre, correo, password, telefono, direccion } = req.body;

    // Validar datos requeridos
    if (!nombre || !correo || !password || !telefono || !direccion) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos (nombre, correo, password, telefono, direccion)' 
      });
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({ error: 'Correo inválido' });
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const newUser = await authService.registerUser(nombre, correo, password, telefono, direccion);

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      token: null,
      user: {
        id_usuario: newUser.id_usuario,
        nombre: newUser.nombre,
        correo: newUser.correo,
        rol: newUser.rol
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador de login
export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Validar datos requeridos
    if (!correo || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
    }

    const result = await authService.loginUser(correo, password);

    res.status(200).json({
      token: result.token,
      user: result.user
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Controlador para verificar token
export const verifyTokenController = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = authService.verifyToken(token);

    res.status(200).json({
      message: 'Token válido',
      user: decoded
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
