import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Produto{
    id: string
    descricao: string
    nome: string
    preco: number
}

async function createProduto() {
    const produto = await prisma.produto.create({
        data: {
            nome: 'Nome do Produto',
            descricao: 'Descrição do Produto',
            preco: 19.99,
            categoriaId: 'id-da-categoria-aqui', // Opcional, dependendo do seu schema
        },
    });
    console.log(produto);
}

createProduto();

async function getProdutos() {
    const produtos = await prisma.produto.findMany();
    console.log(produtos);
}

getProdutos();

async function updateProduto(produtoId: string) {
    const produtoAtualizado = await prisma.produto.update({
        where: { id: produtoId },
        data: {
            preco: 29.99, // Novo preço
            // Atualize outros campos conforme necessário
        },
    });
    console.log(produtoAtualizado);
}

updateProduto('id-do-produto-aqui');

async function deleteProduto(produtoId: string) {
    const produtoDeletado = await prisma.produto.delete({
        where: { id: produtoId },
    });
    console.log(produtoDeletado);
}

deleteProduto('id-do-produto-aqui');

export {Produto};
