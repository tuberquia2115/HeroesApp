import React, { useContext } from 'react';
import { LoginScreen } from '../components/login/LoginScreen';
import {
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom'
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { AuthContext } from '../auth/AuthContext';

const AppRouter = () => {
    const { user } = useContext(AuthContext);
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAuthenticated={user.logged}
                        exact
                        path="/login"
                        component={LoginScreen} />
                    <PrivateRoute
                        path="/"
                        isAuthenticated={user.logged}
                        component={DashboardRoutes} />
                </Switch>
            </div>
        </Router>
    )
}
export { AppRouter }