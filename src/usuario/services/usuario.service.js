import * as usuarioModel from '../models/usuario.model.js';

// Obtener todos los usuarios
export const getAllUsers = async () => {
  const users = await usuarioModel.getAllUsers();
  return users;
};

// Obtener usuario por ID
export const getUserById = async (id_usuario) => {
  if (!id_usuario) {
    throw new Error('ID de usuario es requerido');
  }

  const user = await usuarioModel.getUserById(id_usuario);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return user;
};

// Crear nuevo usuario
export const createNewUser = async (nombre, correo, password, telefono, direccion, rol = 'cliente') => {
  if (!nombre || !correo || !password || !telefono || !direccion) {
    throw new Error('Todos los campos son requeridos');
  }

  // Validar formato de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    throw new Error('Correo inválido');
  }

  // Validar que el correo no exista
  const existingUser = await usuarioModel.getUserByEmail(correo);
  if (existingUser) {
    throw new Error('El correo ya está registrado');
  }

  const user = await usuarioModel.createUser(nombre, correo, password, telefono, direccion, rol);
  return user;
};

// Actualizar usuario
export const updateExistingUser = async (id_usuario, nombre, correo, telefono, direccion, rol) => {
  if (!id_usuario) {
    throw new Error('ID de usuario es requerido');
  }

  if (!nombre || !correo || !telefono || !direccion || !rol) {
    throw new Error('Todos los campos son requeridos');
  }

  const user = await usuarioModel.getUserById(id_usuario);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const updatedUser = await usuarioModel.updateUser(id_usuario, nombre, correo, telefono, direccion, rol);
  return updatedUser;
};

// Eliminar usuario
export const deleteExistingUser = async (id_usuario) => {
  if (!id_usuario) {
    throw new Error('ID de usuario es requerido');
  }

  const user = await usuarioModel.getUserById(id_usuario);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const deletedUser = await usuarioModel.deleteUser(id_usuario);
  return deletedUser;
};
