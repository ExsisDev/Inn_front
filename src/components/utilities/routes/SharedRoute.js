import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authentication from '../../../commons/authentication';

const SharedRoute = ({ component: Component, ...rest }) => {
    const {isAuthenticated} = authentication.validateToken();
    return (
        <Route {...rest}
            render={(props) => (
                isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )}
        />
    );
};

export default SharedRoute;