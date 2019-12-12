import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BackButton from '../backButton/BackButton';

import './HeaderProfile.css';


const HeaderProfile = (props) => {

	return (
		<Row className="headerProfile">
			<Col>
				<Row>
					<Col>
						<BackButton className="mt-3" />
					</Col>
				</Row>
				<Row>
					<Col>
						
					</Col>
				</Row>
			</Col>
			<Col>

			</Col>
			<Col>

			</Col>
		</Row>
	);
}

export default HeaderProfile;