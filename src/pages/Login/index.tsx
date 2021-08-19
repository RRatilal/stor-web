import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/auth';

import AuthHader from '../../components/AuthHader';
import Input from '../../components/Input';

import './styles.css';

const Login: React.FC = () => {
    const { logIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = (e: FormEvent) => {
        e.preventDefault();

        try {
            logIn(email, password)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div id="page-login">
            <div id="page-login-content" className="container">
                <AuthHader />

                <div className="login-container">
                    <main>
                        <header>
                            <legend>Fazer login</legend>
                            <Link to="/Logup">Criar uma conta</Link>
                        </header>

                        <form onSubmit={handleLogin} >
                            <fieldset>
                                <Input
                                    className="email"
                                    name="email"
                                    type="email"
                                    span="E-mail"
                                    required={true}
                                    placeholder="E-mail" value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                                <div className="password-input">
                                    <Input
                                        name="senha"
                                        type="password"
                                        span="Senha"
                                        required={true}
                                        placeholder="Senha"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                            </fieldset>

                            <footer>
                                <div className="footer-container">
                                    <div className="remind">
                                        <div className="checkbox"></div>
                                        <span>Lembrar-me</span>
                                    </div>
                                    <Link to="forgot-password" >Esqueci minha senha</Link>
                                </div>

                                <button type="submit" >
                                    Entrar
                                </button>
                            </footer>
                        </form>
                    </main>

                    <footer className="footer">
                        <p>
                            Não tem conta? <br />
                            <span><Link to="/Logup">Cadastre-se</Link></span>
                        </p>
                        <span>
                            É de graça
                        </span>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Login;