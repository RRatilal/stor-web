import React from 'react';

import LogoImg from '../../assets/images/logo.svg';

import './styles.css';

const AuthHader: React.FC = () => {
    return (
        <header>
            <div id="auth-header" className="logo-container">
                <img src={LogoImg} alt="Proffy" />
                <h2>Sua plataforma de estudos online.</h2>
            </div>
        </header>
    )
}

export default AuthHader;