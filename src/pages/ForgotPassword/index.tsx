import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthHader from '../../components/AuthHader';
import Input from '../../components/Input';
import api from '../../services/api';

import './styles.css';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');

    const history = useHistory();

    async function hendleForgotPassword(e: FormEvent) {
        e.preventDefault();

        try {
            const response = await api.post("forgot-password", {
                email
            })

            if (response.status === 200) {
                localStorage.setItem('@Proffy:email', email)
                history.push("success", {
                    title: "Redefinição enviada!",
                    pText: "Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.",
                    buttonText: "Ok"
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div id="page-forgot">
            <div id="page-forgot-content" className="container">
                <AuthHader />

                <div className="forgot-container">
                    <main>
                        <header>
                            <legend>
                                Eita, esqueceu <br />
                                sua senha?
                            </legend>
                            <p>
                                Não esquenta, vamos dar um jeito nisso.
                            </p>
                        </header>

                        <form onSubmit={hendleForgotPassword} >
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
                            </fieldset>

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

export default ForgotPassword;