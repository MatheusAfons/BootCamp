import React from 'react';
import 'bulma/css/bulma.min.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                    <strong>Minha Aplicação</strong> por <a href="https://seusite.com">Seu Nome</a>. O código fonte está licenciado pelo <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
