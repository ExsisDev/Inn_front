import jwt from 'jsonwebtoken';
import { USER_ROLES } from './enums';

function isAuthenticated() {
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