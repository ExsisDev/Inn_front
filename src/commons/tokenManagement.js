import jwt from 'jsonwebtoken'

export function getToken() {
   let token = localStorage.getItem('auth-token');
   // let tokenElements = jwt.verify(token, `${process.env.REACT_APP_PRIVATE_KEY}`);
   return token;
}

export function logOut() {
   localStorage.removeItem('auth-token');
}

export function getTokenData(token) {
   return jwt.verify(token, `${process.env.REACT_APP_PRIVATE_KEY}`);
}