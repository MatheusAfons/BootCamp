import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define a interface para representar a estrutura do modelo Pedido
interface Pedido {
    id: string;
    status: string;
    usuarioId: string;
    // Adicione outros campos conforme necessário
}

// Define a função para criar um novo pedido
async function createPedido(usuarioId: string) {
    const novoPedido = await prisma.pedido.create({
        data: {
            status: 'pendente',
            usuarioId: usuarioId,
            total: 0, // Adicione o valor correto aqui
            metodoPagamento: 'cartao', // Adicione o valor correto aqui
        },
    });
    console.log(novoPedido);
}

// Define a função para obter todos os pedidos
async function getPedidos() {
    const pedidos = await prisma.pedido.findMany({
        include: {
            usuario: true, // Para incluir detalhes do usuário no resultado
            itens: true, // Para incluir itens do pedido
        },
    });
    console.log(pedidos);
}

// Define a função para atualizar um pedido
async function updatePedido(pedidoId: string) {
    const pedidoAtualizado = await prisma.pedido.update({
        where: { id: pedidoId },
        data: {
            status: 'concluído',
        },
    });
    console.log(pedidoAtualizado);
}

// Define a função para deletar um pedido
async function deletePedido(pedidoId: string) {
    const pedidoDeletado = await prisma.pedido.delete({
        where: { id: pedidoId },
    });
    console.log(pedidoDeletado);
}

// Exporta as funções relacionadas ao modelo Pedido e o próprio tipo Pedido
export { createPedido, getPedidos, updatePedido, deletePedido, Pedido };
