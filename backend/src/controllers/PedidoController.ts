import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function isError(error: any): error is Error {
    return error instanceof Error;
}

export class PedidoController {
    public static async criarPedido(req: Request, res: Response): Promise<void> {
        try {
            // Supondo que o corpo da requisição já contenha os detalhes do pedido e itens do pedido
            const novoPedido = await prisma.pedido.create({
                data: req.body,
                include: {
                    itens: true,
                },
            });
            // Retorna o pedido criado juntamente com o link do WhatsApp
            res.status(201).json({
                mensagem: "Pedido criado com sucesso.",
                pedido: novoPedido,
            });
        } catch (error) {
            if (isError(error)) {
                console.error('Erro ao criar pedido:', error.message);
                res.status(500).send(error.message);
            } else {
                console.error('Erro desconhecido ao criar pedido');
                res.status(500).send('Erro desconhecido ao criar pedido');
            }
        }
    }

    public static async listarPedidos(req: Request, res: Response): Promise<void> {
        try {
            const pedidos = await prisma.pedido.findMany();
            res.json(pedidos);
        } catch (error) {
            if (isError(error)) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Erro desconhecido ao listar pedidos');
            }
        }
    }

    public static async obterPedido(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const pedido = await prisma.pedido.findUnique({
                where: { id },
            });
            if (pedido) {
                res.json(pedido);
            } else {
                res.status(404).send('Pedido não encontrado');
            }
        } catch (error) {
            if (isError(error)) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Erro desconhecido ao obter pedido');
            }
        }
    }

    public static async atualizarPedido(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const pedidoAtualizado = await prisma.pedido.update({
                where: { id },
                data: req.body,
            });
            res.status(200).json(pedidoAtualizado);
        } catch (error) {
            if (isError(error)) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Erro desconhecido ao atualizar pedido');
            }
        }
    }

    public static async deletarPedido(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await prisma.pedido.delete({
                where: { id },
            });
            res.status(204).send("Pedido deletado.");
        } catch (error) {
            if (isError(error)) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('Erro desconhecido ao deletar pedido');
            }
        }
    }

    private static gerarLinkWhatsApp(pedido: any): string {
        const numeroWhatsApp = "5591987654321"; // Substitua pelo número do WhatsApp da lanchonete
        let mensagem = `Olá, gostaria de fazer o seguinte pedido:\n`;
        
        // Adiciona os itens do pedido à mensagem
        if (pedido.itens && pedido.itens.length > 0) {
            pedido.itens.forEach((item: any) => {
                mensagem += `${item.quantidade}x ${item.nome} - R$ ${item.preco}\n`;
            });
        }

        // Adiciona o total do pedido à mensagem
        mensagem += `Total: R$ ${pedido.total}\n`;

        // Adiciona informações adicionais se necessário
        mensagem += `Nome: ${pedido.clienteNome}\n`; // Supondo que 'clienteNome' seja uma propriedade do pedido
        mensagem += `Endereço de entrega: ${pedido.enderecoEntrega}\n`; // Supondo que 'enderecoEntrega' seja uma propriedade do pedido

        // Codifica a mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        return `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    }
}
