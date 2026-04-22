import * as detallePedidoModel from '../models/detalle_pedido.model.js';

// Obtener todos los detalles de pedidos
export const getAllDetailsPedido = async () => {
  const details = await detallePedidoModel.getAllDetailsPedido();
  return details;
};

// Obtener detalles de un pedido específico
export const getDetailsByPedidoId = async (id_pedido) => {
  if (!id_pedido) {
    throw new Error('ID de pedido es requerido');
  }

  const details = await detallePedidoModel.getDetailsByPedidoId(id_pedido);
  return details;
};

// Obtener detalle específico por ID
export const getDetailById = async (id_detalle) => {
  if (!id_detalle) {
    throw new Error('ID de detalle es requerido');
  }

  const detail = await detallePedidoModel.getDetailById(id_detalle);
  if (!detail) {
    throw new Error('Detalle de pedido no encontrado');
  }

  return detail;
};

// Crear nuevo detalle de pedido
export const createNewDetailPedido = async (id_pedido, id_producto, cantidad, precio_unitario) => {
  if (!id_pedido || !id_producto || !cantidad || !precio_unitario) {
    throw new Error('Todos los campos son requeridos (id_pedido, id_producto, cantidad, precio_unitario)');
  }

  if (cantidad <= 0 || precio_unitario <= 0) {
    throw new Error('La cantidad y precio deben ser mayores a 0');
  }

  const detail = await detallePedidoModel.createDetailPedido(id_pedido, id_producto, cantidad, precio_unitario);
  return detail;
};

// Actualizar detalle de pedido
export const updateExistingDetailPedido = async (id_detalle, cantidad, precio_unitario) => {
  if (!id_detalle) {
    throw new Error('ID de detalle es requerido');
  }

  if (!cantidad || !precio_unitario) {
    throw new Error('Cantidad y precio son requeridos');
  }

  if (cantidad <= 0 || precio_unitario <= 0) {
    throw new Error('La cantidad y precio deben ser mayores a 0');
  }

  const detail = await detallePedidoModel.getDetailById(id_detalle);
  if (!detail) {
    throw new Error('Detalle de pedido no encontrado');
  }

  const updatedDetail = await detallePedidoModel.updateDetailPedido(id_detalle, cantidad, precio_unitario);
  return updatedDetail;
};

// Eliminar detalle de pedido
export const deleteExistingDetailPedido = async (id_detalle) => {
  if (!id_detalle) {
    throw new Error('ID de detalle es requerido');
  }

  const detail = await detallePedidoModel.getDetailById(id_detalle);
  if (!detail) {
    throw new Error('Detalle de pedido no encontrado');
  }

  const deletedDetail = await detallePedidoModel.deleteDetailPedido(id_detalle);
  return deletedDetail;
};
