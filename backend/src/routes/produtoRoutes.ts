import express from 'express';
import { ProdutoController } from '../controllers/ProdutoController';

const router = express.Router();

// Rota para listar todos os produtos
router.get('/produtos', ProdutoController.listarProdutos);

// Rota para adicionar um novo produto
router.post('/produtos', ProdutoController.adicionarProduto);

// Rota para obter detalhes de um produto específico
router.get('/produtos/:id', ProdutoController.obterProduto);

// Rota para atualizar um produto existente
router.put('/produtos/:id', ProdutoController.atualizarProduto);

// Rota para deletar um produto
router.delete('/produtos/:id', ProdutoController.deletarProduto);

export default router;
