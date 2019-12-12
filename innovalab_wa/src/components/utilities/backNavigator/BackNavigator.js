import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BackButton from '../backButton/BackButton';

import backButtonImg from '../../../images/backButton.png';
import innovaCamaraLogo from '../../../images/innovaCamaraLogo.png';
import backButtonBlackImg from '../../../images/backButtonBlack.PNG';
import innovaCamaraLogoBlack from '../../../images/innovaCamaraLogoBlack.PNG';
import './BackNavigator.css';


const BackNavigator = (props) => {

    let black = "";
    let logo = innovaCamaraLogo;
    let dark = props.dark;

    if (props.dark) {
        black = "black";
        logo = innovaCamaraLogoBlack;
    }

    return (
        <Row className={`my-3 align-items-center ${black}`}>
            <Col md={2} className="p-0">
                <BackButton dark={dark} className="mt-3" />
            </Col>
            <Col md={{ span: 3, offset: 7 }}>
                <div className="ml-auto">
                    <img className="align-self-center logo" src={logo} alt="logo icon" />
                </div>
            </Col>
        </Row>
    );
}

export default BackNavigator;