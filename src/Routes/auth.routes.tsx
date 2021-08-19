import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Logup from '../pages/Logup';
import SuccessPage from '../components/SuccessPage';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

function AuthRoutes() {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/logup" component={Logup} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:token" component={ResetPassword} />
            <Route exact path="/success" component={SuccessPage} />
        </Switch>
    )
}

export default AuthRoutes;