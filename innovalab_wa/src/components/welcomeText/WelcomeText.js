import React from 'react';
import Button from 'react-bootstrap/Button';
import './WelcomeText.css'

const WelcomeText = () => {
    return (
        <div>
            <p>
                Bienvenido al portal de impulso TIC de innovalab
                y la Cámara de comercio de Bogotá, para continuar
                por favor inicia sesión
            </p>
            <Button href="/login" id="btn-login" variant="warning" block>Iniciar Sesión</Button>
        </div>
    )
}

export default WelcomeText;