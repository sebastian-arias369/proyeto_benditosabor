import * as pedidoService from '../services/pedido.service.js';

// Obtener todos los pedidos
export const getPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.getAllPedidos();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener pedido por ID
export const getPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoService.getPedidoById(id);
    res.status(200).json(pedido);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener pedidos por usuario
export const getPedidosByUser = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const pedidos = await pedidoService.getPedidosByUser(id_usuario);
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Crear nuevo pedido
export const createPedido = async (req, res) => {
  try {
    const { id_usuario, total, estado } = req.body;

    if (!id_usuario || total === undefined) {
      return res.status(400).json({
        error: 'ID de usuario y total son requeridos'
      });
    }

    const pedido = await pedidoService.createNewPedido(id_usuario, total, estado);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar pedido
export const updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { total, estado } = req.body;

    if (total === undefined || !estado) {
      return res.status(400).json({
        error: 'Total y estado son requeridos'
      });
    }

    const pedido = await pedidoService.updateExistingPedido(id, total, estado);
    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar estado del pedido
export const updatePedidoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ error: 'Estado es requerido' });
    }

    const pedido = await pedidoService.updatePedidoState(id, estado);
    res.status(200).json({ message: 'Estado actualizado', pedido });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar pedido
export const deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoService.deleteExistingPedido(id);
    res.status(200).json({ message: 'Pedido eliminado', pedido });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener pedidos por estado
export const getPedidosByStatus = async (req, res) => {
  try {
    const { estado } = req.params;
    const pedidos = await pedidoService.getPedidosByStatus(estado);
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
