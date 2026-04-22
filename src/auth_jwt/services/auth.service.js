import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authModel from '../models/auth.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura_2024';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '24h';

// Registrar nuevo usuario
export const registerUser = async (nombre, correo, password, telefono, direccion) => {
  // Validar que el usuario no exista
  const existingUser = await authModel.getUserByEmail(correo);
  if (existingUser) {
    throw new Error('El correo ya está registrado');
  }

  // Hash de la contraseña
  const passwordHash = await bcrypt.hash(password, 10);

  // Crear usuario
  const newUser = await authModel.createUser(nombre, correo, passwordHash, telefono, direccion, 'cliente');

  return newUser;
};

// Login de usuario
export const loginUser = async (correo, password) => {
  // Buscar usuario
  const user = await authModel.getUserByEmail(correo);
  if (!user) {
    throw new Error('Correo o contraseña incorrectos');
  }

  // Verificar contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Correo o contraseña incorrectos');
  }

  // Generar JWT
  const token = jwt.sign(
    { id_usuario: user.id_usuario, correo: user.correo, rol: user.rol },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );

  return {
    token,
    user: {
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      correo: user.correo,
      rol: user.rol
    }
  };
};

// Verificar token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};
