function getToken() {
   let token = localStorage.getItem('auth-token');
   // let tokenElements = jwt.verify(token, `${process.env.REACT_APP_PRIVATE_KEY}`);
   return token;
}

export default getToken;