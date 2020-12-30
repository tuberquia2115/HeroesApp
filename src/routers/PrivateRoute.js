import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    isAuthenticated,
    component: Componente,
    ...rest
}) => {
    localStorage.setItem('lastPath', rest.location.pathname)
    return (
        <Route {...rest} component={(props) => (
            (isAuthenticated)
                ? (<Componente {...props} />)
                : (<Redirect to="/login" />)
        )}
        />
    )
}
PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func
}
