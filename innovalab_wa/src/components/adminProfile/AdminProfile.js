import React from 'react';
import HeaderWithUserLogo from '../utilities/headerWithUserLogo/HeaderWithUserLogo';
import AdminImage from '../../images/innovaLogo.png';

import './AdminProfile.css';
import { Container } from 'react-bootstrap';

class AdminProfile extends React.Component {
	render() {
		return (
			<Container fluid className="adminProfile d-flex justify-content-center p-0">
				<HeaderWithUserLogo source={AdminImage}/>
			</Container>
		);
	}
}

export default AdminProfile;