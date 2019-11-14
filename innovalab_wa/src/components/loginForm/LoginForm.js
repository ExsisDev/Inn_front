import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./LoginForm.css"

const LoginForm = () => {
    return (
        
            <Form className="centerContent">
                <h5> Iniciar Sesión </h5>
                <Form.Group controlId="email">
                    <Form.Control type="email" placeholder="Correo electrónico" />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>
                <Button id="btnLoginForm" variant="warning" type="submit">
                    Iniciar Sesión
                </Button>
                <Link to="#" id="linkForgetPaswword" >Olvidé mi contraseña</Link>
            </Form>
        
    )
}

export default LoginForm;