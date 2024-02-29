/*
  Warnings:

  - You are about to drop the `Entrega` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pedido` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Entrega";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pedido";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "entregas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "endereco" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "pedidoId" TEXT NOT NULL,
    "nomeDestinatario" TEXT NOT NULL,
    "dataDeEntrega" DATETIME NOT NULL,
    "pontoDestino" TEXT NOT NULL,
    CONSTRAINT "entregas_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" REAL NOT NULL,
    "enderecoEntrega" TEXT,
    "metodoPagamento" TEXT NOT NULL,
    "observacoes" TEXT,
    CONSTRAINT "pedidos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemPedido" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pedidoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco" REAL NOT NULL,
    CONSTRAINT "ItemPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemPedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemPedido" ("id", "pedidoId", "preco", "produtoId", "quantidade") SELECT "id", "pedidoId", "preco", "produtoId", "quantidade" FROM "ItemPedido";
DROP TABLE "ItemPedido";
ALTER TABLE "new_ItemPedido" RENAME TO "ItemPedido";
CREATE UNIQUE INDEX "ItemPedido_pedidoId_produtoId_key" ON "ItemPedido"("pedidoId", "produtoId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
