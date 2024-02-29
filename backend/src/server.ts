import express, { Application } from 'express';
import 'dotenv/config';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import produtoRoutes from './routes/produtoRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import entregaRoutes from './routes/entregaRoutes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors()); // Habilita o CORS
    // Outras configurações...
  }

  private routes(): void {
    this.app.use(authRoutes);
    this.app.use(produtoRoutes);
    this.app.use(pedidoRoutes);
    this.app.use(entregaRoutes);
    // Adicione mais rotas conforme necessário

    this.app.post('/produtos', async (req, res) => {
      try {
          const { nome, descricao, preco, categoriaId } = req.body;
          const novoProduto = await prisma.produto.create({
              data: {
                  nome,
                  descricao,
                  preco,
                  categoriaId,
              },
          });
          return res.status(201).json(novoProduto);
      } catch (error) {
          console.error("Erro ao criar produto:", error);
          return res.status(500).send("Erro ao criar produto");
      }
  });

    // Middleware de erro global
    this.app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(error);
      res.status(error.status || 500).send(error.message || 'Unexpected error');
    });
  }

  public start(): void {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

const server = new Server();
server.start();
