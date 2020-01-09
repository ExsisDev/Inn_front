import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { USER_ROLES } from '../../../commons/enums';
import authentication from '../../../commons/authentication';


const AllyRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, userRole } = authentication.validateToken();
    return (
        <Route {...rest}
            render={(props) => (
                isAuthenticated && userRole === USER_ROLES.ALLY
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )}
        />
    );
};


export default AllyRoute;