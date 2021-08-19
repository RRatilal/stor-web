import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

interface IImage {
    url: string;
    name: string
}

interface IUser {
    id: string;
    name: string;
    surname: string;
    email: string;
    image: IImage;
    bio: string;
    whatsapp: string;
}

interface IAuthContextData {
    signed: boolean;
     user: IUser | null;
    loading: boolean;
    logIn(
        email: string,
        password: string
    ): Promise<void>;
    logOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = localStorage.getItem('@Proffy:user');
            const storegedToken = localStorage.getItem('@Proffy:token');

            if (storagedUser && storegedToken) {
                api.defaults.headers.Authorization = `Bearer ${storegedToken}`;
                setUser(JSON.parse(storagedUser))
                setLoading(false)
            }
            if (!storagedUser && !storegedToken) {
                setLoading(false)
            }
        }

        loadStorageData();
    }, [])

    async function logIn(email: String, password: String) {
        try {
            const response = await api.post("/login", {
                email,
                password
            })

            const { user, token } = response.data;

            console.log(response.data)

            setUser(user);

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            localStorage.setItem('@Proffy:user', JSON.stringify(user));
            localStorage.setItem('@Proffy:token', token);

        } catch (error) {
            console.log(error)
            // alert('Falha no login, tente novamente')
        }
    }

    function logOut() {
        setUser(null);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, logIn, logOut }} >
            { children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export {
    AuthProvider,
    useAuth
}