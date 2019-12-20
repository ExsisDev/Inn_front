import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './WelcomeText.css'

const WelcomeText = () => {
    return (
        <div className="welcomeText">
            <p>
                Bienvenido al portal de impulso TIC de innovalab
                y la Cámara de comercio de Bogotá, para continuar
                por favor inicia sesión
            </p>            
            <Button as={Link} to="/login" id="btnLoginWelcome" variant="warning" block>Iniciar Sesión</Button>
        </div>
    )
}

export default WelcomeText;