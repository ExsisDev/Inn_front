import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import WelcomeText from '../welcomeText/WelcomeText';
import LoginForm from '../loginForm/LoginForm';
import RecoverPasswordEmail from '../recoverPasswordEmail/RecoverPasswordEmail'
import RecoverNewPassword from '../recoverNewPassword/RecoverNewPassword';

import Image from 'react-bootstrap/Image'
import innovaCamarLogo from '../../images/innovaCamaraLogo.png';
<<<<<<< HEAD
 
=======

>>>>>>> 984207714ecb4c8a7bb28d467b873e495f227460
import './Landing.css';

const Landing = () => {
    return (
<<<<<<< HEAD
        <Router>
            <Container className="landing d-flex flex-column align-items-center" fluid>
                <Row id="landingFirstRow" className="d-flex justify-content-center align-items-center">
                    <Col md={5} xl={4} lg={4} sm={6} className="landingMain">
                        <div className="landingBorder">
                            <Switch>
                                <Route path="/" exact component={WelcomeText} />
                                <Route path="/login" component={LoginForm} />
                                <Route path="/recover-password/email" component={RecoverPasswordEmail} />
                                <Route path="/recover-password" component={RecoverNewPassword} />
                            </Switch>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={6} md={4} lg={4} className="imgLogoLanding">
                        <Image src={innovaCamarLogo} alt="logo innovalab" fluid />
                    </Col >
                </Row>
            </Container>
        </Router>
=======
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
                <Col xs={6} md={4} lg={4} className="imgLogoLanding">
                    <Image src={innovaCamarLogo} alt="logo innovalab" fluid />
                </Col >
            </Row>
        </Container>
>>>>>>> 984207714ecb4c8a7bb28d467b873e495f227460
    );
}

export default Landing;
