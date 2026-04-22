import * as usuarioService from '../services/usuario.service.js';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const users = await usuarioService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener usuario por ID
export const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usuarioService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Crear nuevo usuario
export const createUsuario = async (req, res) => {
  try {
    const { nombre, correo, password, telefono, direccion, rol } = req.body;

    if (!nombre || !correo || !password || !telefono || !direccion) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos (nombre, correo, password, telefono, direccion)'
      });
    }

    const user = await usuarioService.createNewUser(nombre, correo, password, telefono, direccion, rol);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar usuario
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, telefono, direccion, rol } = req.body;

    if (!nombre || !correo || !telefono || !direccion || !rol) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos'
      });
    }

    const user = await usuarioService.updateExistingUser(id, nombre, correo, telefono, direccion, rol);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar usuario
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usuarioService.deleteExistingUser(id);
    res.status(200).json({ message: 'Usuario eliminado', usuario: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
