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
								<h4 className="mb-5 mt-5 mt-sm-3">Administrador</h4>
								<div className="d-flex flex-column flex-sm-row">
									<h5> Cambio de contraseña: </h5>
									<Form className="d-flex flex-column">
										<Form.Group controlId="changeActualPassword" className="w-auto d-flex justify-content-center">
											<Form.Control className="formInput passwordInputs" type="input" placeholder="Contraseña Actual" />
										</Form.Group>
										<Form.Group controlId="changeNewPassword" className="w-auto d-flex justify-content-center">
											<Form.Control className="formInput passwordInputs" type="input" placeholder="Nueva Contraseña" />
										</Form.Group>
										<Form.Group controlId="changeConfirmPassword" className="w-auto d-flex justify-content-center">
											<Form.Control className="formInput passwordInputs" type="input" placeholder="Confirmar Contraseña" />
										</Form.Group>
										<Button className="acceptButtonChangePassword sendButton mt-3 mb-4 align-self-end" variant="warning" type="submit">
											Aceptar
            						</Button>
									</Form>
								</div>
							</Col>
						</Row>
					</Col>
					{/* <Form >
						<Form.Label className="mb-4"> Recuperar Contraseña </Form.Label>
						<Form.Group controlId="formBasicEmail">
							<Form.Control className="formInput mb-4" type="password" placeholder="Nueva contraseña" />
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Control className="formInput" type="password" placeholder="Confirmar nueva contraseña" />
						</Form.Group>
						<Button className="sendButton mt-3 mb-4" variant="warning" type="submit">
							Aceptar
            		</Button>
					</Form> */}
				</Row>
			</Container>

		);
	}
}

export default AdminProfile;