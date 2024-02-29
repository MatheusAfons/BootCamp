import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


interface Usuario {
  [x: string]: any;
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  // Adicione outros campos conforme necessário
}

async function createUsuario() {
  const usuario = await prisma.usuario.create({
    data: {
      nome: 'Nome do Usuário',
      email: 'email@usuario.com',
      telefone: '99999-9999',
      // Adicione outros campos conforme necessário
    },
  });
  console.log(usuario);
}

createUsuario();

async function getUsuarios() {
  const usuarios = await prisma.usuario.findMany();
  console.log(usuarios);
}

getUsuarios();

async function updateUsuario(usuarioId: string) {
  const usuarioAtualizado = await prisma.usuario.update({
    where: { id: usuarioId },
    data: {
      nome: 'Nome Atualizado',
      telefone: '88888-8888',
      // Atualize outros campos conforme necessário
    },
  });
  console.log(usuarioAtualizado);
}

updateUsuario('id-do-usuario-aqui');

async function deleteUsuario(usuarioId: string) {
  const usuarioDeletado = await prisma.usuario.delete({
    where: { id: usuarioId },
  });
  console.log(usuarioDeletado);
}

deleteUsuario('id-do-usuario-aqui');

export { Usuario };
