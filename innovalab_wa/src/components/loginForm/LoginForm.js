import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./LoginForm.css"

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = { 
            email: null,
            password: null
        };
    }
    /**
     * Cambiar estado del componente mientras se ingresa un valor
     * @return {VoidFunction}
     */
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    /**
     * Enviar credenciales para autenticación
     * @return {VoidFunction}
     */
    handleSubmit =  event => {
        event.preventDefault();

        const credentials = {
            user_email: this.state.email,
            user_password: this.state.password,
        };        
        const url = `${process.env.REACT_APP_BACK_URL}/login`;
        
        axios.post( url,
            credentials
        )
            .then(res => console.log(res))
            .catch(error => console.error(error))
    }

    render() {

        return (
            <div className="centerContent">
                <h6> Iniciar Sesión </h6>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Control className="loginFormInput" 
                                      type="email" 
                                      placeholder="Correo electrónico" 
                                      onChange={this.handleChange} 
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Control className="loginFormInput" 
                                      type="password" 
                                      placeholder="Contraseña" 
                                      onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button id="btnLoginForm" variant="warning" type="submit">
                        Iniciar Sesión
                </Button>
                </Form>
                <Link to="#" id="linkForgetPassword" >Olvidé mi contraseña</Link>
            </div>
        );
    }
}

export default LoginForm;