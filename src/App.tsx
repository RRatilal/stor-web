import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import MainToutes from './Routes/routes';

import './assets/styles/global.css'
import { AuthProvider } from './context/auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainToutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
