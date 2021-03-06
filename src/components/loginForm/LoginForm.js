import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./LoginForm.css"

class LoginForm extends React.Component {

   constructor() {
      super();
      this.state = {
         isLogged: this.getToken(),
         email: "",
         password: "",
         validated: false,
         isLoading: false
      };
   }

   toastConfiguration = {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
      containerId: 'A'
   }

   /**
    * Cambiar estado de la entrada mientras se ingresa un valor
    * @return {VoidFunction}
    */
   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   /**
    * Guardar el token en localStorage
    */
   saveToken(token) {
      localStorage.setItem('auth-token', token);
   }


   /**
    * obtener el token desde localStorage
    */
   getToken(token) {
      return localStorage.getItem('auth-token') ? true : false;
   }

   /**
    * Enviar credenciales para autenticación
    * @return {VoidFunction}
    */
   handleSubmit = e => {
      e.preventDefault();

      this.deactivateButton(true);

      const credentials = {
         user_email: this.state.email,
         user_password: this.state.password,
      };
      const url = `${process.env.REACT_APP_BACK_URL}/login`;

      axios.post(url, credentials)
         .then(res => {
            this.saveToken(res.headers['x-auth-token']);
            this.setState({ isLogged: true });
         })
         .catch(error => {
            if (!error.response) {
               this.notifyError("Algo salió mal.");
               this.deactivateButton(false);
               return;
            }

            const res = error.response;
            let msg = "";
            if (res.status === 429) {
               msg = `${res.data.msj}.`;
               msg += `Intente ingresar de nuevo en ${this.getIntegerPart(res.data.minutes)} minutos.`
            }
            else if (res.status === 400) {
               msg = res.data;
            } else {
               msg = "Error inesperado, intente más tarde."
            }
            this.notifyError(msg);
            this.deactivateButton(false);
         })
   }

   /**
    * Habilita o desabilita el botón dependiendo del argumento.
    * Si bool es true el boton se desactiva.
    * Si bool es false el boton se activa.
    * @param {Boolean} bool
    * @returns {VoidFunction}
    */
   deactivateButton = (bool) => {
      this.setState({ isLoading: bool })
   }

   
   /**
	 * Toast de error
	 */
   notifyError = (errorMessage) => toast.error(errorMessage, this.toastConfiguration);


   getIntegerPart(decimal) {
      return Math.ceil(decimal)
   }

   render() {
      let { isLoading, isLogged } = this.state;

      if (isLogged) {
         return <Redirect to="/home" />
      }

      return (
         <div>
            {
               isLogged && <Redirect to="/home" />
            }
            <div className="loginFormCenterContent">
               <h6 className="mt-3 mb-3"> Iniciar Sesión </h6>
               <Form validated={this.state.validated} onSubmit={this.handleSubmit}>
                  <Form.Group controlId="email">
                     <Form.Control className="formInput"
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        values={this.state.email}
                        onChange={this.handleChange}
                        required
                     />
                  </Form.Group>
                  <Form.Group controlId="password">
                     <Form.Control className="formInput"
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        values={this.state.password}
                        onChange={this.handleChange}
                        maxLength={8}
                        required
                     />
                  </Form.Group>
                  <Button id="btnLoginForm"
                     className="sendButton mt-4"
                     variant="warning"
                     type="submit"
                     disabled={isLoading}
                  >
                     {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                  </Button>
               </Form>
               <Link to="/recover-password/email" id="loginFormLinkForgetPassword" >Olvidé mi contraseña</Link>
            </div>
         </div>
      );
   }
}

export default withRouter(LoginForm);