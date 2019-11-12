import React from 'react';
import { Form, Button } from 'react-bootstrap';
import "./LoginForm.css"

const LoginForm = () => {
    return (
        
            <Form>
                <h5> Iniciar Sesión </h5>
                <Form.Group controlId="email">
                    <Form.Control type="email" placeholder="Correo electrónico" />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Iniciar Sesión
                </Button>
            </Form>
        
    )
}

export default LoginForm;