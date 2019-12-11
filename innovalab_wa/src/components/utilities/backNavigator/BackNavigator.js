import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Image } from 'react-bootstrap';
import backButton from '../../../images/backButton.png';
import innovaCamaraLogo from '../../../images/innovaCamaraLogo.png';
import './BackNavigator.css';

const BackNavigator = () => {
    let history = useHistory();
    return (
        <Row className="my-3 align-items-center">
            <Col xs={12} sm={3} md={3} className="p-0 order-1 order-sm-0">
                <Button variant="link" className="backButton px-0 d-flex justify-content-start align-items-center" onClick={() => history.goBack()}>
                    <Image src={backButton} alt="Back button" className="backButtonImg" />
                    Volver
                </Button>
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