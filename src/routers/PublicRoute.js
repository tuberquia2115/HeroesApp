import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';


export const PublicRoute = ({
    isAuthenticated,
    component: Componente,
    ...rest
}) => {
    return (
        <Route  {...rest} component={(props) => (
            (!isAuthenticated)
                ? (<Componente {...props} />)
                : (<Redirect to="/" />)
        )} />
    )
}
PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func
}

