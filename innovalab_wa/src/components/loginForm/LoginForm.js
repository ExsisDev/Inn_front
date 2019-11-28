import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./LoginForm.css"

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = { 
            email: "",
            password: "",
            validated: false,
            isLoading: false
        };
    }
    /**
     * Cambiar estado de la entrada mientras se ingresa un valor
     * @return {VoidFunction}
     */
    handleChange = event => {        
        this.setState({ [event.target.name]: event.target.value });
    }

    /**
     * Enviar credenciales para autenticación
     * @return {VoidFunction}
     */
    handleSubmit = event => {
        event.preventDefault();

        this.deactivateButton(true);

        const credentials = {
            user_email: this.state.email,
            user_password: this.state.password,
        };
        const url = `${process.env.REACT_APP_BACK_URL}/login`;
        
        axios.post( url, credentials )
            .then( res => {
                this.props.history.push('/home')
            })
            .catch(error => {
                const res = error.response;
                let msg = "";
                if(res.status === 429){                    
                    msg =  `${res.data.msj}.`;
                    msg += `Intente ingresar de nuevo en ${this.getIntegerPart(res.data.minutes)} minutos.`
                }
                else{
                    msg = res.data;
                }                    
                this.notify(msg);
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
        this.setState({isLoading: bool})
    }

    notify = (error) => toast.error(error, 
        {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        }
    );

    getIntegerPart(decimal) {
        return Math.ceil(decimal)
    }

    render() {
        let { isLoading } = this.state;
        return (
            <div className="centerContent">
                <ToastContainer />
                <h6 className="mt-3 mb-3"> Iniciar Sesión </h6>                
                <Form validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Control className="loginFormInput" 
                                      name="email"
                                      type="email"
                                      placeholder="Correo electrónico" 
                                      values={this.state.email}
                                      onChange={this.handleChange}
                                      required
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Control className="loginFormInput" 
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
                <Link to="/recover-password/email" id="linkForgetPassword" >Olvidé mi contraseña</Link>
            </div>
        );
    }
}

export default LoginForm;