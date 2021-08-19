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

interface IAdminContextData {
    updatedUser: IUser | null;
    logOut(): void;
    getUpdatedUserData(): Promise<void>;
}

const AdminContext = createContext<IAdminContextData>({} as IAdminContextData);

const AdminProvider: React.FC = ({ children }) => {
    const [updatedUser, setUpdatedUser] = useState<IUser | null>(null);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = localStorage.getItem('@Proffy:user');

            if (storagedUser) {
                setUpdatedUser(JSON.parse(storagedUser))
            }
        }
        loadStorageData();
        getUpdatedUserData()
    }, [])

    async function getUpdatedUserData() {
        const user: IUser = JSON.parse(String(localStorage.getItem('@Proffy:user')));
        try {
            const response = await api.get(`update-user/${user.id}`);

            const newUser = response.data[0];

            setUpdatedUser(newUser);

            localStorage.setItem('@Proffy:user', JSON.stringify(newUser));

        } catch (error) {
            console.log(error)
        }
    }

    function logOut() {
        setUpdatedUser(null);
        localStorage.clear();
    }

    return (
        <AdminContext.Provider value={{ updatedUser, getUpdatedUserData, logOut }} >
            { children}
        </AdminContext.Provider>
    )
}

function useAdmin() {
    const context = useContext(AdminContext);

    return context;
}

export {
    AdminProvider,
    useAdmin
}