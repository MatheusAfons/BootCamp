import React, { useState, useEffect } from 'react';

interface ProdutoCarrinho {
    id: string;
    nome: string;
    descricao?: string;
    preco: number;
    quantidade: number;
}

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<ProdutoCarrinho[]>([]);
    const [showFinalizeCard, setShowFinalizeCard] = useState(false);
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');

    useEffect(() => {
        // Carregar o carrinho do localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);
    }, []);

    // Cálculo do total do carrinho
    const totalCarrinho = cartItems.reduce((total, item) => total + item.preco * item.quantidade, 0);

    const enviarPedido = async () => {
        try {
            const response = await fetch('http://localhost:3000/pedidos', { // Substitua pela URL correta do seu backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    endereco,
                    formaPagamento,
                    itens: cartItems.map(item => ({
                        produtoId: item.id,
                        quantidade: item.quantidade
                    })),
                    total: totalCarrinho,
                }),
            });

            if (!response.ok) {
                // Captura mais detalhes do erro, se disponível
                const errorBody = await response.text();
                throw new Error(`Erro ao enviar o pedido: ${response.status} ${errorBody}`);
            }

            const dadosPedido = await response.json();
            alert(`Pedido confirmado com sucesso! Número do pedido: ${dadosPedido.id}`);

            // Limpeza e atualização do estado
            localStorage.removeItem('cart');
            setCartItems([]);
            setShowFinalizeCard(false);
            // Reset dos campos do formulário
            setNome('');
            setEndereco('');
            setFormaPagamento('');
        } catch (error) {
            console.error('Erro ao enviar o pedido:', error);
            alert('Erro ao enviar o pedido. Tente novamente.');
        }
    };

    return (
        <div className="container">
            <h1 className="title is-1">Seu Carrinho</h1>
            <div className="columns">
                <div className="column is-three-quarters">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.id} className="box">
                                <p className="title is-4">{item.nome}</p>
                                <p>{item.descricao || 'Descrição não disponível'}</p>
                                <p>Quantidade: {item.quantidade}</p>
                                <p className="subtitle is-6">Preço unitário: ${item.preco.toFixed(2)}</p>
                            </div>
                        ))
                    ) : (
                        <p>Seu carrinho está vazio.</p>
                    )}
                </div>
                <div className="column is-one-quarter">
                    <div className="box">
                        <h2 className="title is-4">Resumo do Pedido</h2>
                        <p className="subtitle is-6">Total: ${totalCarrinho.toFixed(2)}</p>
                        <button className="button is-success" onClick={() => setShowFinalizeCard(true)}>Finalizar Pedido</button>
                    </div>
                </div>
            </div>

            {showFinalizeCard && (
                <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Finalizar Pedido</p>
                            <button className="delete" onClick={() => setShowFinalizeCard(false)} aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            <div className="field">
                                <label className="label">Nome</label>
                                <input className="input" type="text" placeholder="Seu nome completo" value={nome} onChange={e => setNome(e.target.value)} />
                            </div>
                            <div className="field">
                                <label className="label">Endereço de Entrega</label>
                                <input className="input" type="text" placeholder="Seu endereço completo" value={endereco} onChange={e => setEndereco(e.target.value)} />
                            </div>
                            <div className="field">
                                <label className="label">Forma de Pagamento</label>
                                <div className="select">
                                    <select value={formaPagamento} onChange={e => setFormaPagamento(e.target.value)}>
                                        <option>Selecione uma opção</option>
                                        <option value="Cartão de Crédito">Cartão de Crédito</option>
                                        <option value="Boleto Bancário">Boleto Bancário</option>
                                        <option value="Pix">Pix</option>
                                    </select>
                                </div>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={enviarPedido}>Confirmar Pedido</button>
                            <button className="button" onClick={() => setShowFinalizeCard(false)}>Cancelar</button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
