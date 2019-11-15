import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./LoginForm.css"

const LoginForm = () => {
    return (
        <div className="centerContent">
            <h6> Iniciar Sesión </h6>
            <Form >
                <Form.Group  controlId="email">
                    <Form.Control className="loginFormInput" type="email" placeholder="Correo electrónico" />
                </Form.Group>
                <Form.Group  controlId="password">
                    <Form.Control className="loginFormInput" type="password" placeholder="Contraseña" />
                </Form.Group>
                <Button id="btnLoginForm" variant="warning" type="submit">
                    Iniciar Sesión
                </Button>
            </Form>
            <Link to="#" id="linkForgetPassword" >Olvidé mi contraseña</Link>
        </div>
    );
}

export default LoginForm;