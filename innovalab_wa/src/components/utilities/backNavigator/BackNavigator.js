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
            <Col md={2} className="p-0">
                <Button variant="link" className="backButton px-0 d-flex justify-content-start align-items-center" onClick={()=>history.goBack()}>
                    <Image src={backButton} alt="Back button" 
                           className="backButtonImg" />
                    Volver
                </Button>
            </Col>
            <Col md={{ span: 4, offset: 6 }}>
                <div className="ml-auto">
                    <img className="align-self-center" src={innovaCamaraLogo} alt="logo icon" />
                </div>
            </Col>
        </Row> 
    );
}
 
export default BackNavigator;