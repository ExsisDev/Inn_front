import jwt from 'jsonwebtoken';
import { USER_ROLES } from './enums';

export function isAuthenticated() {
    let token = localStorage.getItem('auth-token');
    if (!token) {
        return false;
    }
    try {
        let decode = jwt.verify(token, `${process.env.REACT_APP_PRIVATE_KEY}`);
        return true;
    } catch (error) {
        return false;
    }
}

export function isAdmin() {
    console.log("-------------Middleware----------------------");
    
    let token = localStorage.getItem('auth-token');    
    if (!token) {
        return false;
    }
    try {
        let decode = jwt.verify(token, `${process.env.REACT_APP_PRIVATE_KEY}`);
        if (decode.fk_id_role === USER_ROLES.ADMINISTRATOR){
            console.log("-------------Enter------------");
            console.log(decode.fk_id_role);
            console.log(USER_ROLES.ADMINISTRATOR);            
            
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}