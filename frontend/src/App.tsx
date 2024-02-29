// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link> | <Link to="/carrinho">Carrinho</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/carrinho" element={<CartPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
