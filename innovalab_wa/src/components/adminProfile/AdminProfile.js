import React from 'react';
import HeaderProfile from '../utilities/headerProfile/HeaderProfile';

import './AdminProfile.css';
import { Container } from 'react-bootstrap';

class AdminProfile extends React.Component {
	render() {
		return (
			<Container fluid className="adminProfile d-flex justify-content-center">
				<HeaderProfile/>
			</Container>
		);
	}
}

export default AdminProfile;