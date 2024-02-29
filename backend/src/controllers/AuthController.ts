import { Request, Response } from 'express';
import { prisma } from "../database/db"

export class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    try {
      const usuario = await prisma.usuario.findUnique({
        where: { email },
      });

      if (!usuario) {
        res.status(401).json({ message: 'Usuário não encontrado' });
        return;
      }

      // Simplesmente retorna o usuário sem verificar a senha ou gerar um token
      res.status(200).json({ id: usuario.id, email: usuario.email, nome: usuario.nome });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  public static async register(req: Request, res: Response): Promise<void> {
    const { nome, email } = req.body;

    try {
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
      });

      if (usuarioExistente) {
        res.status(400).json({ message: 'Este e-mail já está sendo usado por outra conta' });
        return;
      }

      const novoUsuario = await prisma.usuario.create({
        data: { nome, email },
      });

      res.status(201).json({ id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
