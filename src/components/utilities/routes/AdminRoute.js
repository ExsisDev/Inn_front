import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdmin } from '../../../commons/authentication';

const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest}
        render={(props) => (
            isAdmin()
                ? <Component {...props} />
                : <Redirect to='/login' />
        )}
    />    
);
 
export default AdminRoute;