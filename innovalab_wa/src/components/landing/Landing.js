import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import './Landing.css';
import logoInnovalab from '../../images/INVLB_CCB_LOGO.png';
import logoCamara from '../../images/CCB_LOGO.png';

function Landing() {
    return (
        <Container className="landing" fluid>
            <Row className="justify-content-center">
                <Col md={5} lg={4} className="welcomeText">
                    <div className="welcomeBorder">
                        <p>
                            Bienvenido al portal de impulso TIC de innovalab
                            y la Cámara de comercio de Bogotá, para continuar
                            por favor inicia sesión
                        </p>
                        <Button id="btn-login" variant="warning" block>Iniciar Sesión</Button>
                    </div>
                </Col>
            </Row>
            <Row className="logoLanding justify-content-center">
                <Col xs={6} md={4} lg={3} className="imgLogoLanding">
                    <Image src={logoInnovalab} alt="logo innovalab" fluid/>
                </Col >
                <Col xs={4} md={3} lg={2} className="imgLogoLanding">
                    <Image src={logoCamara} alt="logo camara de comercio de bogotá" fluid />
                </Col>
            </Row>
        </Container>
    );
}

export default Landing;
