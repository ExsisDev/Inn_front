import React from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { IoIosLogOut } from 'react-icons/io';
import BackButton from '../backButton/BackButton';

import innovaCamaraLogoBlack from '../../../images/innovaCamaraLogoBlack.PNG';
import './HeaderWithUserLogo.css';


const HeaderProfile = (props) => {

	return (
		<Row className="headerProfile">
			<Col xs={4} className="d-flex align-items-center flex-column">
				<Row className="mb-5">
					<Col>
						<BackButton dark className="mt-4" />
					</Col>
				</Row>
				<Row>
					<Col className="d-flex justify-content-start">
						<Button variant="link" className="headerLogOutButton w-auto d-flex align-items-center">
							<IconContext.Provider value={{ color: "white", size: "1.5rem", className: " w-auto mr-2" }}>
								<IoIosLogOut />
							</IconContext.Provider>
							Cerrar Sesión
                  </Button>
					</Col>
				</Row>
			</Col>
			<Col xs={4} className="d-flex justify-content-center mt-4">
				<div className="imageCenterRounded position-absolute rounded-circle border border-dark"></div>
			</Col>
			<Col xs={4} className="d-flex justify-content-end">
				<img className="align-self-start logo mt-4" src={innovaCamaraLogoBlack} alt="logo icon" />
			</Col>
		</Row>
	);
}

export default HeaderProfile;