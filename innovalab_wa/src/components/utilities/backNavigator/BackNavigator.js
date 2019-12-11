import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Image } from 'react-bootstrap';
import backButtonImg from '../../../images/backButton.png';
import backButtonBlackImg from '../../../images/backButtonBlack.PNG';
import innovaCamaraLogo from '../../../images/innovaCamaraLogo.png';
import innovaCamaraLogoBlack from '../../../images/innovaCamaraLogoBlack.PNG';
import './BackNavigator.css';

const BackNavigator = (props) => {
    let history = useHistory();
    let black = "";
    let logo = innovaCamaraLogo;
    let backBtn = backButtonImg;

    if(props.dark){
        black = "black";
        logo = innovaCamaraLogoBlack;
        backBtn = backButtonBlackImg;
    }        
    
    return ( 
        <Row className={`my-3 align-items-center ${black}`}>
            <Col md={2} className="p-0">
                <Button variant="link" 
                        className={`backButton px-0 d-flex justify-content-start align-items-center ${black}`} 
                        onClick={()=>history.goBack()}
                >
                    <Image src={backBtn} alt="Back button" 
                           className="backButtonImg" />
                    Volver
                </Button>
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