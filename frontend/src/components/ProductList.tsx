// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';

interface Produto {
    id: string;
    nome: string;
    descricao?: string;
    preco: number;
}

interface ProdutoCarrinho extends Produto {
    quantidade: number;
}

const ProductList: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:3000/produtos');
                if (!response.ok) {
                    throw new Error('Falha na resposta da rede');
                }
                const data: Produto[] = await response.json();
                setProdutos(data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProdutos();
    }, []);

    const addToCart = (produto: Produto) => {
        const currentCart: ProdutoCarrinho[] = JSON.parse(localStorage.getItem('cart') || '[]');

        const produtoIndex = currentCart.findIndex((item) => item.id === produto.id);
        if (produtoIndex !== -1) {
            currentCart[produtoIndex].quantidade += 1;
        } else {
            currentCart.push({...produto, quantidade: 1});
        }

        localStorage.setItem('cart', JSON.stringify(currentCart));
        alert(`${produto.nome} adicionado ao carrinho!`);
    };

    return (
        <div className="container">
            <h1 className="title is-1">Produtos Disponíveis</h1>
            <div className="columns is-multiline">
                {produtos.map((produto) => (
                    <div className="column is-one-quarter" key={produto.id}>
                        <div className="card">
                            <div className="card-content">
                                <p className="title">{produto.nome}</p>
                                <p>{produto.descricao || 'Descrição não disponível'}</p>
                                <p className="subtitle">${produto.preco.toFixed(2)}</p>
                                <button onClick={() => addToCart(produto)} className="button is-primary">
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
