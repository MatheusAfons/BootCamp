import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createItemPedido() {
    const itemPedido = await prisma.itemPedido.create({
        data: {
            quantidade: 2,
            preco: 15.99,
            pedidoId: 'id-do-pedido-aqui', // Substitua por um ID de Pedido válido
            produtoId: 'id-do-produto-aqui', // Substitua por um ID de Produto válido
        },
    });
    console.log(itemPedido);
}

createItemPedido();

async function getItemPedidos() {
    const itensPedido = await prisma.itemPedido.findMany();
    console.log(itensPedido);
}

getItemPedidos();

async function updateItemPedido(itemId: string) {
    const itemAtualizado = await prisma.itemPedido.update({
        where: { id: itemId },
        data: {
            quantidade: 3, // Nova quantidade
            preco: 17.99, // Novo preço
        },
    });
    console.log(itemAtualizado);
}

updateItemPedido('id-do-item-pedido-aqui'); // Substitua pelo ID do item de pedido

async function deleteItemPedido(itemId: string) {
    const itemDeletado = await prisma.itemPedido.delete({
        where: { id: itemId },
    });
    console.log(itemDeletado);
}

deleteItemPedido('id-do-item-pedido-aqui'); // Substitua pelo ID do item de pedido
