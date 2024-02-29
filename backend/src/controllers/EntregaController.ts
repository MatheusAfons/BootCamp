import { Request, Response } from 'express';
import { prisma } from '../database/db'; // Verifique o caminho para sua conexão com o banco de dados

export class EntregaController {
    // Listar todas as entregas
    public static async listarTodas(req: Request, res: Response): Promise<void> {
        try {
            const entregas = await prisma.entrega.findMany();
            res.json(entregas);
        } catch (error) {
            console.error('Erro ao listar entregas:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Obter uma entrega específica
    public static async obterEntrega(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const entrega = await prisma.entrega.findUnique({
                where: { id: parseInt(id) },
            });
            if (entrega) {
                res.json(entrega);
            } else {
                res.status(404).json({ message: 'Entrega não encontrada' });
            }
        } catch (error) {
            console.error('Erro ao obter entrega:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Criar uma nova entrega
    public static async criarEntrega(req: Request, res: Response): Promise<void> {
        const { endereco, status, pedidoId, nomeDestinatario, dataDeEntrega, pontoDestino } = req.body;
        try {
            const novaEntrega = await prisma.entrega.create({
                data: {
                    endereco,
                    status,
                    pedidoId, // Certifique-se de que este valor seja uma string, já que o pedidoId foi alterado para String
                    nomeDestinatario,
                    dataDeEntrega: new Date(dataDeEntrega),
                    pontoDestino,
                },
            });
            res.status(201).json(novaEntrega);
        } catch (error) {
            console.error('Erro ao criar entrega:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Atualizar uma entrega
    public static async atualizarEntrega(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { endereco, status, pedidoId, nomeDestinatario, dataDeEntrega, pontoDestino } = req.body;
        try {
            const entregaAtualizada = await prisma.entrega.update({
                where: { id: parseInt(id) },
                data: {
                    endereco,
                    status,
                    pedidoId,
                    nomeDestinatario,
                    dataDeEntrega: new Date(dataDeEntrega),
                    pontoDestino,
                },
            });
            res.json(entregaAtualizada);
        } catch (error) {
            console.error('Erro ao atualizar entrega:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    // Deletar uma entrega
    public static async deletarEntrega(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.entrega.delete({
                where: { id: parseInt(id) },
            });
            res.status(204).send();
        } catch (error) {
            console.error('Erro ao deletar entrega:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
