import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import WelcomeText from '../welcomeText/WelcomeText';
import LoginForm from '../loginForm/LoginForm';
import RecoverPasswordEmail from '../recoverPasswordEmail/RecoverPasswordEmail'
import RecoverNewPassword from '../recoverNewPassword/RecoverNewPassword';
import Image from 'react-bootstrap/Image'
import innovaCamarLogo from '../../images/innovaCamaraLogo.png';
import { getToken } from '../../commons/tokenManagement';
import './Landing.css';

const Landing = () => {
    const isThereToken = getToken();

    if (isThereToken) {
        return (
            <div>
                <Redirect to="/home" />
            </div>
        );
    } else {

        return (
            <Container fluid className="landing">
                <Row className="landingLoginBox d-flex justify-content-center ">
                    <Col lg={{ span: 4 }} md={{ span: 6 }} sm={{ span: 8 }} xs={{ span: 10 }} className="landingChartWidth d-flex align-items-center">
                        <div className="landingLogin w-100 mx-4">
                            <div className="landingSquareLine h-100 w-100">
                                <Switch>
                                    <Route path="/" exact component={WelcomeText} />
                                    <Route path="/login" exact component={LoginForm} />
                                    <Route path="/recover-password/email" exact component={RecoverPasswordEmail} />
                                    <Route path="/recover-password" exact component={RecoverNewPassword} />
                                    <Redirect from="*" to="/pageNotFound" />
                                </Switch>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="landingImage d-flex justify-content-center">
                    <Col lg={{ span: 5 }} md={{ span: 7 }} sm={{ span: 9 }} xs={{ span: 11 }}>
                        <div className="landingImageBox">
                            <Image src={innovaCamarLogo} alt="logo innovalab" height="100%" width="100%" />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Landing;
