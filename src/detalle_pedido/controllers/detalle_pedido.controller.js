import * as detallePedidoService from '../services/detalle_pedido.service.js';

// Obtener todos los detalles de pedidos
export const getDetailsPedido = async (req, res) => {
  try {
    const details = await detallePedidoService.getAllDetailsPedido();
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener detalles de un pedido específico
export const getDetailsByPedido = async (req, res) => {
  try {
    const { id_pedido } = req.params;
    const details = await detallePedidoService.getDetailsByPedidoId(id_pedido);
    res.status(200).json(details);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener detalle específico por ID
export const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await detallePedidoService.getDetailById(id);
    res.status(200).json(detail);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Crear nuevo detalle de pedido
export const createDetail = async (req, res) => {
  try {
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;

    if (!id_pedido || !id_producto || !cantidad || !precio_unitario) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos (id_pedido, id_producto, cantidad, precio_unitario)'
      });
    }

    const detail = await detallePedidoService.createNewDetailPedido(id_pedido, id_producto, cantidad, precio_unitario);
    res.status(201).json(detail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar detalle de pedido
export const updateDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad, precio_unitario } = req.body;

    if (!cantidad || !precio_unitario) {
      return res.status(400).json({ error: 'Cantidad y precio son requeridos' });
    }

    const detail = await detallePedidoService.updateExistingDetailPedido(id, cantidad, precio_unitario);
    res.status(200).json(detail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar detalle de pedido
export const deleteDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await detallePedidoService.deleteExistingDetailPedido(id);
    res.status(200).json({ message: 'Detalle eliminado', detalle: detail });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
