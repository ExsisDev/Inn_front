import React from 'react';
import { Row, Col } from 'react-bootstrap';

import innovaCamaraLogo from '../../../images/innovaCamaraLogo.png';
import './BackNavigator.css';
import BackButton from '../backButton/BackButton';

const BackNavigator = () => {

    return (
        <Row className="my-3 align-items-center">
            <Col xs={12} sm={3} md={3} className="p-0 order-1 order-sm-0">
                <BackButton/>
            </Col>
            <Col xs={12} sm={9} md={{ span: 3, offset: 6 }} className="order-0 order-sm-1">
                <Row>
                    <div className="ml-auto d-flex justify-content-end">
                        <img className="align-self-center camaraLogo" src={innovaCamaraLogo} alt="logo icon" />
                    </div>
                </Row>
            </Col>
        </Row>
    );
}

export default BackNavigator;