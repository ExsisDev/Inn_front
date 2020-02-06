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
            // <Container className="landing d-flex flex-column align-items-center" fluid>
            //     <Row id="landingFirstRow" className="d-flex justify-content-center align-items-center">
            //         <Col md={5} xl={4} lg={4} sm={6} className="landingMain">
            //             <div className="landingBorder">
            //                 <Switch>
            //                     <Route path="/" exact component={WelcomeText} />
            //                     <Route path="/login" exact component={LoginForm} />
            //                     <Route path="/recover-password/email" exact component={RecoverPasswordEmail} />
            //                     <Route path="/recover-password" exact component={RecoverNewPassword} />
            //                     <Redirect from="*" to="/pageNotFound" />
            //                 </Switch>
            //             </div>
            //         </Col>
            //     </Row>
            //     <Row className="justify-content-center">
            //         <Col xs={6} md={4} lg={4} className="landingImgLogo">
            //             <Image src={innovaCamarLogo} alt="logo innovalab" fluid />
            //         </Col >
            //     </Row>
            // </Container>
            <Container fluid className="landing">
                <Row className="landingLoginBox d-flex justify-content-center ">
                    <Col lg={{ span: 4 }} md={{ span: 6 }} sm={{ span: 8 }} xs={{ span: 10 }} className=" d-flex align-items-center">
                        <div className="landingLogin w-100 mx-4">
                            <div className="landingSquareLine h-100 w-100">
                                <Switch>
                                    <Route path="/" exact component={WelcomeText} />
                                    <Route path="/login" exact component={LoginForm} />
                                    <Route path="/recover-password/email" exact component={RecoverPasswordEmail} />
                                    <Route path="/recover-password" exact component={RecoverNewPassword} />
                                </Switch>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="landingImage d-flex justify-content-center">
                    <Col lg={{ span: 5 }} md={{ span: 7 }} sm={{ span: 9 }} xs={{ span: 11 }}>
                        <div className="landingImageBox">
                            <Image src={innovaCamarLogo} alt="logo innovalab" height="100%" width="100%"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Landing;
