import React from 'react';
import 'bulma/css/bulma.min.css';

const Header: React.FC = () => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        Minha Aplicação
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="/">
                            Home
                        </a>
                        <a className="navbar-item" href="/carrinho">
                            Carrinho
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
