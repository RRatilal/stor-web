import React from 'react';
import { useAuth } from '../context/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

function MainToutes() {
    const { signed, loading } = useAuth();

    if (loading) {
        return (
            <p>Loading screen</p>
        )
    }

    return signed ? <AppRoutes /> : <AuthRoutes />
}

export default MainToutes;