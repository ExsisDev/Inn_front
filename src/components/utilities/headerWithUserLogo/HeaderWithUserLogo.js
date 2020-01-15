import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BackNavigator from '../backNavigator/BackNavigator';
import './HeaderWithUserLogo.css';


const HeaderProfile = (props) => {

	return (
		<Row className="headerWithUserLogoProfile m-0">
			<Col className="d-flex align-items-center flex-column">
				<Row>
					<Col xs={12} className="d-flex align-items-center flex-column">
						<BackNavigator dark logOut/>
					</Col>
				</Row>
				<Row className="d-flex order-1 order-sm-0">
					<Col xs={12} className="headerWithUserLogoImageCenterRoundedBox d-flex justify-content-center">
						<div className="headerWithUserLogoImageCenterRounded rounded-circle border border-dark" style={{backgroundImage: `url(${props.source})`}}></div>
					</Col>
				</Row>
			</Col>
		</Row>
	);
}

export default HeaderProfile;