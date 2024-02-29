import express from 'express';
import { PedidoController } from '../controllers/PedidoController';

const router = express.Router();

// Rota para criar um novo pedido
router.post('/pedidos', PedidoController.criarPedido);

// Rota para listar todos os pedidos
router.get('/pedidos', PedidoController.listarPedidos);

// Rota para obter detalhes de um pedido específico
router.get('/pedidos/:id', PedidoController.obterPedido);

// Rota para atualizar um pedido existente
router.put('/pedidos/:id', PedidoController.atualizarPedido);

// Rota para deletar um pedido
router.delete('/pedidos/:id', PedidoController.deletarPedido);

export default router;
