import { Router } from 'express';
import { EntregaController } from '../controllers/EntregaController';

const router = Router();

// Definindo as rotas para Entrega
router.get('/entrega', EntregaController.listarTodas);
router.get('/entrega/:id', EntregaController.obterEntrega);
router.post('/entrega', EntregaController.criarEntrega);
router.put('/entrega/:id', EntregaController.atualizarEntrega);
router.delete('/entrega/:id', EntregaController.deletarEntrega);

export default router;
