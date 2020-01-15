import jwt from 'jsonwebtoken';
import logOut from './logOut';
 
/**
 * Validar que el usuario esté autenticado y obtener el rol del usuario.
 * @returns {Object} Objeto con dos atributos: isAuthenticated indica si el token es válido, userRole rol del usuario 
 */
function validateToken() {
    let token = localStorage.getItem('auth-token');
    if (!token) {
        return { isAuthenticated: false, userRole: undefined };
    }
    try {
        let decode = jwt.verify(token, `${process.env.REACT_APP_PRIVATE_KEY}`);
        return { isAuthenticated: true, userRole: decode.fk_id_role };
    } catch (error) {
        logOut();
        return { isAuthenticated: false, userRole: undefined };        
    }
}

const authentication = {
    validateToken
}

export default authentication;