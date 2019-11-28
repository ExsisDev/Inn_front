import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import WelcomeText from '../welcomeText/WelcomeText';
import LoginForm from '../loginForm/LoginForm';
import RecoverPasswordEmail from '../recoverPasswordEmail/RecoverPasswordEmail'
import RecoverNewPassword from '../recoverNewPassword/RecoverNewPassword';

import Image from 'react-bootstrap/Image'
import innovaCamarLogo from '../../images/innovaCamaraLogo.png';
 
import './Landing.css';

const Landing = () => {
    return (
        <Container className="landing d-flex flex-column align-items-center" fluid>
            <Row id="landingFirstRow" className="d-flex justify-content-center align-items-center">
                <Col md={5} xl={4} lg={4} sm={6} className="landingMain">
                    <div className="landingBorder">
                        <Switch>
                            <Route path="/login" component={LoginForm} />
                            <Route path="/recover-password/email" component={RecoverPasswordEmail} />
                            <Route path="/recover-password" component={RecoverNewPassword} />
                            <Route path="/" exact component={WelcomeText} />
                        </Switch>
                    </div>
                </Col>
            </Row>
                <Row className="justify-content-center">
                    <Col xs={6} md={4} lg={3} className="imgLogoLanding">
                        <Image src={logoInnovalab} alt="logo innovalab" fluid />
                    </Col >
                    <Col xs={4} md={3} lg={2} className="imgLogoLanding">
                        <Image src={logoCamara} alt="logo camara de comercio de bogotá" fluid />
                    </Col>
                </Row>
<<<<<<< HEAD
        </Container>        
    );
}
        
=======
                <Row className="justify-content-center">
                    <Col xs={6} md={4} lg={4} className="imgLogoLanding">
                        <Image src={innovaCamarLogo} alt="logo innovalab" fluid />
                    </Col >
                </Row>
            </Container>
        </Router>
    );
}

>>>>>>> createChallenge
export default Landing;
