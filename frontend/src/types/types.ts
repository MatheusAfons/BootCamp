// types.ts

import { ReactNode } from "react";

export interface Produto {
    descricao: ReactNode;
    id: string;
    nome: string;
    preco: number;
    foto: string;
    quantidade?: number;
}