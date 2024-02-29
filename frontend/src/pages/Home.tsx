// src/pages/Home.tsx
import React from 'react';
import ProductList from '../components/ProductList'; // Ajuste o caminho conforme necessário
import 'bulma/css/bulma.min.css';

const Home: React.FC = () => {
    return (
        <div className="container">
            <h1 className="title is-1"></h1>
            <ProductList />
        </div>
    );
};

export default Home;
