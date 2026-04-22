import * as pedidoModel from '../models/pedido.model.js';

const VALID_STATES = ['pendiente', 'proceso', 'entregado'];

// Obtener todos los pedidos
export const getAllPedidos = async () => {
  const pedidos = await pedidoModel.getAllPedidos();
  return pedidos;
};

// Obtener pedido por ID
export const getPedidoById = async (id_pedido) => {
  if (!id_pedido) {
    throw new Error('ID de pedido es requerido');
  }

  const pedido = await pedidoModel.getPedidoById(id_pedido);
  if (!pedido) {
    throw new Error('Pedido no encontrado');
  }

  return pedido;
};

// Obtener pedidos por usuario
export const getPedidosByUser = async (id_usuario) => {
  if (!id_usuario) {
    throw new Error('ID de usuario es requerido');
  }

  const pedidos = await pedidoModel.getPedidosByUser(id_usuario);
  return pedidos;
};

// Crear nuevo pedido
export const createNewPedido = async (id_usuario, total, estado = 'pendiente') => {
  if (!id_usuario || total === undefined) {
    throw new Error('ID de usuario y total son requeridos');
  }

  if (total <= 0) {
    throw new Error('El total debe ser mayor a 0');
  }

  if (!VALID_STATES.includes(estado)) {
    throw new Error(`Estado inválido. Válidos: ${VALID_STATES.join(', ')}`);
  }

  const pedido = await pedidoModel.createPedido(id_usuario, total, estado);
  return pedido;
};

// Actualizar pedido
export const updateExistingPedido = async (id_pedido, total, estado) => {
  if (!id_pedido) {
    throw new Error('ID de pedido es requerido');
  }

  if (total === undefined || !estado) {
    throw new Error('Total y estado son requeridos');
  }

  if (total <= 0) {
    throw new Error('El total debe ser mayor a 0');
  }

  if (!VALID_STATES.includes(estado)) {
    throw new Error(`Estado inválido. Válidos: ${VALID_STATES.join(', ')}`);
  }

  const pedido = await pedidoModel.getPedidoById(id_pedido);
  if (!pedido) {
    throw new Error('Pedido no encontrado');
  }

  const updatedPedido = await pedidoModel.updatePedido(id_pedido, total, estado);
  return updatedPedido;
};

// Actualizar estado del pedido
export const updatePedidoState = async (id_pedido, estado) => {
  if (!id_pedido || !estado) {
    throw new Error('ID de pedido y estado son requeridos');
  }

  if (!VALID_STATES.includes(estado)) {
    throw new Error(`Estado inválido. Válidos: ${VALID_STATES.join(', ')}`);
  }

  const pedido = await pedidoModel.getPedidoById(id_pedido);
  if (!pedido) {
    throw new Error('Pedido no encontrado');
  }

  const updatedPedido = await pedidoModel.updatePedidoStatus(id_pedido, estado);
  return updatedPedido;
};

// Eliminar pedido
export const deleteExistingPedido = async (id_pedido) => {
  if (!id_pedido) {
    throw new Error('ID de pedido es requerido');
  }

  const pedido = await pedidoModel.getPedidoById(id_pedido);
  if (!pedido) {
    throw new Error('Pedido no encontrado');
  }

  const deletedPedido = await pedidoModel.deletePedido(id_pedido);
  return deletedPedido;
};

// Obtener pedidos por estado
export const getPedidosByStatus = async (estado) => {
  if (!estado) {
    throw new Error('Estado es requerido');
  }

  if (!VALID_STATES.includes(estado)) {
    throw new Error(`Estado inválido. Válidos: ${VALID_STATES.join(', ')}`);
  }

  const pedidos = await pedidoModel.getPedidosByStatus(estado);
  return pedidos;
};
