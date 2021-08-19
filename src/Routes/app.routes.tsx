import React from 'react';

import { AdminProvider } from '../context/admin';

import Dashboard from '../pages/Dashboard';

function AppRoutes() {
    return (
        <AdminProvider>
            <Dashboard />
        </AdminProvider>
    )
}

export default AppRoutes;