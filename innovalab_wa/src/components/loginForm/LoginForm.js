import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./LoginForm.css"

const LoginForm = () => {
    return (
        <div className="centerContent">
            <h6 className="mt-3 mb-3"> Iniciar Sesión </h6>
            <Form >
                <Form.Group  controlId="email">
                    <Form.Control className="formInput" type="email" placeholder="Correo electrónico" />
                </Form.Group>
                <Form.Group  controlId="password">
                    <Form.Control className="formInput" type="password" placeholder="Contraseña" />
                </Form.Group>
                <Button className="sendButton mt-4" variant="warning" type="submit">
                    Iniciar Sesión
                </Button>
            </Form>
            <Link to="/recover-password/email" id="linkForgetPassword" >Olvidé mi contraseña</Link>
        </div>
    );
}

export default LoginForm;