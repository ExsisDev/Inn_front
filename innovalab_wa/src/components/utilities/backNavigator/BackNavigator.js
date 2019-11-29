import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Image } from 'react-bootstrap';
import backButton from '../../../images/backButton.png';
import innovaCamaraLogo from '../../../images/innovaCamaraLogo.png';
import './BackNavigator.css';

const BackNavigator = () => {
    let history = useHistory();
    return ( 
        <Row className="my-3">
            <Col md={2}>
                <Button variant="link" className="backButton" onClick={()=>history.goBack()}>
                    <Image src={backButton} alt="Back button" 
                           className="backButtonImg" />
                    Volver                    
                </Button>
            </Col>
            <Col md={{ span: 4, offset: 6 }}>
                <div className="camaraLogoBox ml-auto">
                    <img className="camaraLogo align-self-center" src={innovaCamaraLogo} alt="logo icon" />
                </div>
            </Col>
        </Row> 
    );
}
 
export default BackNavigator;