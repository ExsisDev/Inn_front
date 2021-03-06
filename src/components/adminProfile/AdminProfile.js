import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

import { getToken } from '../../commons/tokenManagement';
import HeaderWithUserLogo from '../utilities/headerWithUserLogo/HeaderWithUserLogo';
import AdminImage from '../../images/innovaLogo.png';
import './AdminProfile.css';

class AdminProfile extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			token: getToken(),
			actualPassword: "",
			newPassword: "",
			confirmNewPassword: "",
			isLoading: false
		}

		this.toastConfiguration = {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			closeButton: false,
			containerId: 'A' 
		}

		this.NewPassword = React.createRef();
	}


	/**
	 * Enviar la petición para cambio de contraseña
	 * @param {Event} e 
	 */
	async handlePasswordChange(e) {
		e.preventDefault();

		const url = `${process.env.REACT_APP_BACK_URL}/login/changePassword`;

		let bodyPasswordChange = {
			actual_password: this.state.actualPassword,
			new_password: this.state.newPassword,
			confirm_new_password: this.state.confirmNewPassword
		}

		await this.setState({ isLoading: true });

		await axios.post(url, bodyPasswordChange, {
			headers: { 'x-auth-token': `${this.state.token}` }
		})
			.then((result) => {
				this.notifySuccess("Contraseña cambiada.");
			})
			.catch((error) => {
				const res = error.response;
				let msg = "";
				if (res.status === 400) {
					msg = `${res.data}.`;
				} else {
					msg = "No se pudo actualizar la contraseña";
				}
				this.notifyError(msg);
			});

		await this.setState({ isLoading: false });

	}


	/**
		 * Cambiar estado de la entrada mientras se ingresa un valor
		 * @return {VoidFunction}
		 */
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}


	/**
		 * Cambiar estado de la entrada mientras se ingresa un valor
		 * @return {VoidFunction}
		 */
	handleChangeConfirmPassword(e) {
		this.setState({ [e.target.name]: e.target.value });

	}


	/**
	 * Toast de error
	 */
	notifyError = (errorMessage) => toast.error(errorMessage, this.toastConfiguration);


	/**
	 * Toast de exito
	 */
	notifySuccess = (successMessage) => toast.success(successMessage, this.toastConfiguration);


	render() {
		return (
			<Container fluid className="adminProfile p-0">
				<HeaderWithUserLogo source={AdminImage} />
				<Row className="mt-5 mx-0">
					<Col className="px-0">
						<Row className="mt-5 mx-0 d-flex justify-content-center">
							<Col xs={11} sm={9} lg={6} className="d-flex flex-column align-items-center">
								<h4 className="mb-5 mt-5 mt-sm-3 adminProfileHeaderColor"><b>Administrador</b></h4>
								<div className="d-flex flex-column flex-sm-row">
									<h5 className="adminProfileHeaderColor mt-3"><b>Cambio de Contraseña: </b></h5>
									<Form className="d-flex flex-column" onSubmit={this.handlePasswordChange.bind(this)}>
										<Form.Group controlId="changeActualPassword" className="w-auto d-flex justify-content-center">
											<Form.Control name="actualPassword" className="formInput adminProfilePasswordInputs" type="password" placeholder="Contraseña Actual" autoComplete="new-password" required onChange={this.handleChange} />
										</Form.Group>
										<Form.Group controlId="changeNewPassword" className="w-auto d-flex justify-content-center">
											<Form.Control name="newPassword" className="formInput adminProfilePasswordInputs" type="password" placeholder="Nueva Contraseña" autoComplete="new-password" required onChange={this.handleChange} />
										</Form.Group>
										<Form.Group controlId="changeConfirmPassword" className="w-auto d-flex justify-content-center">
											<Form.Control name="confirmNewPassword" className="formInput adminProfilePasswordInputs" type="password" placeholder="Confirmar Contraseña" autoComplete="new-password" ref={this.NewPassword} required onChange={(e) => this.handleChangeConfirmPassword(e, this.NewPassword)} />
										</Form.Group>
										<Button className="adminProfileAcceptButtonChangePassword sendButton mt-3 mb-4 align-self-end" variant="warning" type="submit" disabled={this.state.isLoading}>
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