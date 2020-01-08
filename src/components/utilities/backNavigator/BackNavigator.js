import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { IoIosLogOut } from 'react-icons/io';

import BackButton from '../backButton/BackButton';
import { logOut } from '../../../commons/tokenManagement';
import innovaCamaraLogo from '../../../images/innovaCamaraLogo.png';
import innovaCamaraLogoBlack from '../../../images/innovaCamaraLogoBlack.PNG';
import './BackNavigator.css';


/**
 * Recibe como propiedad: 
 * - dark: para renderizar en fondo negro
 * - logout: para mostrar el cierre de sesión
 * 
 * @param {Object} props 
 */
const BackNavigator = (props) => {

    let black = "";
    let logo = innovaCamaraLogo;

    if (props.dark) {
        black = "black";
        logo = innovaCamaraLogoBlack;
    }

    return (
        <Row className={`mt-3 align-items-center ${black}`}>
            <Col xs={6} sm={2} md={2} className="order-1 order-sm-0 p-0 mt-3 mt-sm-1">
                <BackButton dark={props.dark} />
            </Col>
            <Col xs={12} sm={{ span: 3, offset: 7 }} md={{ span: 3, offset: 7 }} className="order-0 order-sm-1 p-0">
                <div className="ml-auto d-flex justify-content-center justify-content-sm-end">
                    <img className="align-self-center logo" src={logo} alt="logo icon" />
                </div>
            </Col>
            {
                props.logOut &&
                (
                    <Col xs={6} className="d-flex justify-content-end justify-content-sm-start p-0 order-2 order-sm-2 mt-3 mt-sm-5">
                        <Button variant="link" className="headerLogOutButton w-auto d-flex align-items-center" href="/" onClick={logOut}>
                            <IconContext.Provider value={{ color: "white", size: "1.5rem", className: " w-auto mr-2" }}>
                                <IoIosLogOut />
                            </IconContext.Provider>
                            Cerrar Sesión
                        </Button>
                    </Col>
                )
            }
        </Row>
    );
}

export default BackNavigator;