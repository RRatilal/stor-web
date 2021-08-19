import React, { FormEvent, useState } from 'react';

import AuthHader from '../../components/AuthHader';
import Input from '../../components/Input';
import api from '../../services/api';

import './styles.css';

const Logup: React.FC = () => {
    const [name, setName] = useState('');
    const [surname, setsurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleCreateUser(e: FormEvent) {
        e.preventDefault();

        try {
            await api.post('logup', {
                name,
                surname,
                email,
                password
            })
            return alert('Usuário criado')
        } catch (error) {
            console.log(error)
            return alert('O usuário não pode ser criado')
        }
    }

    return (
        <div id="page-logup">
            <div id="page-logup-content" className="container">
                <AuthHader />

                <div className="logup-container">
                    <header>
                        <legend>Cadastro</legend>
                        <p>
                            Preencha os dados abaixo <br />
                            para começar.
                        </p>
                    </header>

                    <main>
                        <form >
                            <fieldset>
                                <Input
                                    className="name"
                                    name="name"
                                    type="text"
                                    span="Nome"
                                    placeholder="Nome"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <Input
                                    className="surname"
                                    name="surname"
                                    type="text"
                                    span="Sobrenome"
                                    placeholder="Sobrenome"
                                    value={surname}
                                    onChange={e => setsurname(e.target.value)}
                                />
                                <Input
                                    className="email"
                                    name="email"
                                    type="email"
                                    span="E-mail"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <div className="password-input">
                                    <Input
                                        name="senha"
                                        type="password"
                                        span="Senha"
                                        placeholder="Senha"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                            </fieldset>

                            <button type="submit" onClick={handleCreateUser} >
                                Concluir cadastro
                            </button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Logup;