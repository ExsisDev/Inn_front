import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './WelcomeText.css'

const WelcomeText = () => {
    return (
        <div className="d-flex justify-content-center h-100 flex-column p-5 py-lg-5">
            <p className="welcomeText my-lg-5">
                Bienvenido al portal de impulso TIC de innovalab
                y la Cámara de comercio de Bogotá, para continuar
                por favor inicia sesión
            </p>
            <Button as={Link} to="/login" className="btnDefault mt-4 mt-md-5 mt-lg-5 text-white" variant="warning" block>Iniciar Sesión</Button>
        </div>
    )
}

export default WelcomeText;