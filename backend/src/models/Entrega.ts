import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createEntrega() {
  // Supondo que seu modelo `Entrega` no Prisma tenha os campos correspondentes
  const novaEntrega = await prisma.entrega.create({
    data: {
      endereco: "Endereço de exemplo", // Valor real necessário
      status: "Status de exemplo", // Valor real necessário
      pedidoId: "1", // Supondo que pedidoId seja uma string. Ajuste conforme necessário
      nomeDestinatario: "Nome do Destinatário",
      dataDeEntrega: new Date(), // Ajuste conforme necessário
      pontoDestino: "Localização de destino",
      // pontoPartida não foi incluído no seu exemplo de criação - adicione se necessário
    },
  });
  console.log(novaEntrega);
}

createEntrega();

// Não é necessário exportar Entrega se você está utilizando os tipos gerados pelo Prisma
