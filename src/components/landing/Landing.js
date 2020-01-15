import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import WelcomeText from '../welcomeText/WelcomeText';
import LoginForm from '../loginForm/LoginForm';
import RecoverPasswordEmail from '../recoverPasswordEmail/RecoverPasswordEmail'
import RecoverNewPassword from '../recoverNewPassword/RecoverNewPassword';
import Image from 'react-bootstrap/Image'
import innovaCamarLogo from '../../images/innovaCamaraLogo.png';
import { getTokenData } from '../../commons/tokenManagement';
import './Landing.css';

/**
* obtener el token desde localStorage
*/
function getToken(token) {
    return localStorage.getItem('auth-token') ? true : false;
}

const Landing = () => {
    const isThereToken = getToken();
    let tokenDecoded;
    isThereToken ? tokenDecoded = getTokenData(localStorage.getItem('auth-token')) : tokenDecoded = undefined;

    if (isThereToken && tokenDecoded.fk_id_role === 2) {
        console.log(isThereToken, tokenDecoded.fk_id_role)

        return (
            <div>
                <Redirect to="/home" />
            </div>
        );
    } else if (isThereToken && tokenDecoded.fk_id_role === 1) {

        return (
            <div>
                <Redirect to="/home_ally" />
            </div>
        );
    } else {

        return (
            <Container className="landing d-flex flex-column align-items-center" fluid>
                <Row id="landingFirstRow" className="d-flex justify-content-center align-items-center">
                    <Col md={5} xl={4} lg={4} sm={6} className="landingMain">
                        <div className="landingBorder">
                            <Switch>
                                <Route path="/" exact component={WelcomeText} />
                                <Route path="/login" exact component={LoginForm} />
                                <Route path="/recover-password/email" exact component={RecoverPasswordEmail} />
                                <Route path="/recover-password" exact component={RecoverNewPassword} />
                                <Redirect from="*" to="/pageNotFound" />
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
        );
    }
}

export default Landing;
