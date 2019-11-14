import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import WelcomeText from '../welcomeText/WelcomeText';
import LoginForm from '../loginForm/LoginForm';
import Image from 'react-bootstrap/Image'
import './Landing.css';
import logoInnovalab from '../../images/INVLB_CCB_LOGO.png';
import logoCamara from '../../images/CCB_LOGO.png';

const Landing = () => {
    return (
        <Router>
            <Container className="landing" fluid>
                <Row className="justify-content-center">
                    <Col md={5} lg={4} className="welcomeText">
                        <div className="welcomeBorder">
                            <Switch>
                                <Route path="/" exact component={WelcomeText} />
                                <Route path="/login" component={LoginForm} />
                            </Switch>
                        </div>
                    </Col>
                </Row>
                <Row className="logoLanding justify-content-center">
                    <Col xs={6} md={4} lg={3} className="imgLogoLanding">
                        <Image src={logoInnovalab} alt="logo innovalab" fluid />
                    </Col >
                    <Col xs={4} md={3} lg={2} className="imgLogoLanding">
                        <Image src={logoCamara} alt="logo camara de comercio de bogotá" fluid />
                    </Col>
                </Row>
            </Container>
        </Router>
    );
}

export default Landing;
