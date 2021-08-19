import React from 'react';

import { useAuth } from '../../context/auth';

import LandingImg from '../../assets/images/landing.svg';
import outIcon from '../../assets/images/icons/out.svg'

import './styles.css'

function Home() {
    const { logOut } = useAuth();

    function handleLogout() {
        logOut()
    }
    
    return (
        <div className="page-home">
            <div id="page-landing-content" className="container">
                <div className="top-bar-container">
                    <button onClick={handleLogout}>
                        <img src={outIcon} alt="Sair" />
                    </button>
                </div>

                
                <img src={LandingImg} alt="Plataforma de estudos" className="hero-image" />

                <div className="footer">
                    <p className="wellcome">
                        Seja bem-vindo. <br />
                        <span>A sua plataforma de estudos online</span>
                    </p>

                    {/* <span className="total-connections">
                        Total de {totalConnections} conexões <br />
                    já realizadas <img src={purpleHeartIcon} alt="Coracao roxo" />
                    </span> */}
                </div>
            </div>
        </div>
    )
}

export default Home