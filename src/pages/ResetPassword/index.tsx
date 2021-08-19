import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';


import AuthHader from '../../components/AuthHader';
import Input from '../../components/Input';
import api from '../../services/api';

import './styles.css';

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [tokenURL, setTokenURL] = useState('');
    const [email, setEmail] = useState('')

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const { pathname } = location;
        const forgotEmail = localStorage.getItem('@Proffy:email')

        setTokenURL(pathname)
        if (forgotEmail) {
            setEmail(forgotEmail)
        }
    }, [location])

    async function hendleResetPassword(e: FormEvent) {
        e.preventDefault();

        try {
            const response = await api.post(tokenURL, {
                email,
                password
            })

            if (response.status === 200) {

                history.push("success", {
                    title: "Senha redefinida!",
                    pText: "Boa, agora é só fazer login com sua nova senha",
                    buttonText: "Voltar ao login"
                })
            }
        } catch (error) {

        }
    }

    return (
        <div id="page-reset">
            <div id="page-reset-content" className="container">
                <AuthHader />

                <div className="reset-container">
                    <main>
                        <header>
                            <legend>
                                Nova senha
                    </legend>
                            <p>
                                Redifina a sua nova senha
                    </p>
                        </header>

                        <form onSubmit={hendleResetPassword} >
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

                            <button type="submit" >
                                Enviar
                    </button>

                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;