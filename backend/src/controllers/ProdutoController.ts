import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Função auxiliar para verificar se o objeto é um erro
function isError(error: any): error is Error {
    return error instanceof Error;
}

export class ProdutoController {
    // Adicionar um novo produto
    public static async adicionarProduto(req: Request, res: Response): Promise<void> {
        try {
            const novoProduto = await prisma.produto.create({
                data: req.body,
            });
            res.status(201).json(novoProduto);
        } catch (error) {
            if (isError(error)) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Erro desconhecido ao adicionar produto');
            }
        }
    }

    // Listar todos os produtos
    public static async listarProdutos(req: Request, res: Response): Promise<void> {
        try {
            const produtos = await prisma.produto.findMany();
            res.json(produtos);
        } catch (error) {
            if (isError(error)) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Erro desconhecido ao listar produtos');
            }
        }
    }

    // Obter detalhes de um produto específico
    public static async obterProduto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const produto = await prisma.produto.findUnique({
                where: { id: id }, // Usar 'id' diretamente como string
            });
            if (produto) {
                res.json(produto);
            } else {
                res.status(404).send('Produto não encontrado');
            }
        } catch (error) {
            if (isError(error)) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Erro desconhecido ao obter produto');
            }
        }
    }

    // Atualizar um produto existente
    public static async atualizarProduto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const produtoAtualizado = await prisma.produto.update({
                where: { id: id }, // Usar 'id' diretamente como string
                data: req.body,
            });
            res.status(200).json(produtoAtualizado);
        } catch (error) {
            if (isError(error)) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Erro desconhecido ao atualizar produto');
            }
        }
    }

    // Deletar um produto
    public static async deletarProduto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await prisma.produto.delete({
                where: { id: id }, // Usar 'id' diretamente como string
            });
            res.status(204).send("Produto deletado.");
        } catch (error) {
            if (isError(error)) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Erro desconhecido ao deletar produto');
            }
        }
    }
}
