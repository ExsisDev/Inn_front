import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './WelcomeText.css'

const WelcomeText = () => {
    return (
        <div className="welcomeTextBox d-flex justify-content-center h-100 flex-column my-lg-5 my-4">
            <p className="welcomeText">
                Bienvenido al portal de impulso TIC de innovalab
                y la Cámara de comercio de Bogotá, para continuar
                por favor inicia sesión
            </p>
            <Button as={Link} to="/login" className="btnDefault mt-3 mt-sm-5" variant="warning" block>Iniciar Sesión</Button>
        </div>
    )
}

export default WelcomeText;