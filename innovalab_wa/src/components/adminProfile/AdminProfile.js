import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import HeaderWithUserLogo from '../utilities/headerWithUserLogo/HeaderWithUserLogo';
import AdminImage from '../../images/innovaLogo.png';

import './AdminProfile.css';

class AdminProfile extends React.Component {
	render() {
		return (
			<Container fluid className="adminProfile p-0">
				<HeaderWithUserLogo source={AdminImage} />
				<Row className="mt-5 mx-0">
					<Col className="px-0">
						<Row className="mt-5 mx-0 d-flex justify-content-center">
							<Col xs={11} sm={9} lg={6} className="d-flex flex-column align-items-center">
								<h4 className="mb-5 mt-5 mt-sm-3 headerColor"><b>Administrador</b></h4>
								<div className="d-flex flex-column flex-sm-row">
									<h5 className="headerColor mt-3"><b>Cambio de Contraseña: </b></h5>
									<Form className="d-flex flex-column">
										<Form.Group controlId="changeActualPassword" className="w-auto d-flex justify-content-center">
											<Form.Control className="formInput passwordInputs" type="password" placeholder="Contraseña Actual" autoComplete="new-password"/>
										</Form.Group>
										<Form.Group controlId="changeNewPassword" className="w-auto d-flex justify-content-center">
											<Form.Control className="formInput passwordInputs" type="password" placeholder="Nueva Contraseña" autoComplete="new-password"/>
										</Form.Group>
										<Form.Group controlId="changeConfirmPassword" className="w-auto d-flex justify-content-center">
											<Form.Control className="formInput passwordInputs" type="password" placeholder="Confirmar Contraseña" autoComplete="new-password"/>
										</Form.Group>
										<Button className="acceptButtonChangePassword sendButton mt-3 mb-4 align-self-end" variant="warning" type="submit">
											Aceptar
            						</Button>
									</Form>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>

		);
	}
}

export default AdminProfile;