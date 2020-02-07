import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import _ from "lodash";
import { toast } from 'react-toastify';

import HeaderWithUserLogo from '../utilities/headerWithUserLogo/HeaderWithUserLogo';
import HumanResourceList from '../utilities/humanResource/HumanResourceList';
import { getToken } from '../../commons/tokenManagement';
import img from '../../images/EmpresaA.png';
import ReactLoading from 'react-loading';
import './AllyProfile.css';
import 'react-toastify/dist/ReactToastify.css';

const categories = [{ id: 12354, name: "Block Chain" }, { id: 15436, name: "Transformacion digital" }];

class AllyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ally: {},
            allyResources: [],
            allyId: 77,
            isLoading: true,
            token: getToken()
        };
        this.hoursIdea = React.createRef();
        this.hoursExpe = React.createRef();
        this.isUpdated = false;
    }

    toastConfiguration = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
        containerId: 'A'
    }

    toastId = null;

    componentDidMount() {
        this.chargeAllyProfileToState();
        // this.chargeResourcesToState();
    }

    /**
     * Obtener informacion y recursos del perfil del aliado y guardarlos en el estado
     */
    chargeAllyProfileToState() {
        const url = `${process.env.REACT_APP_BACK_URL}/allies/me`;
        axios.get(url, { headers: { 'x-auth-token': `${this.state.token}` } })
            .then(res => {
                console.log(res);
                this.setState({ ally: res.data, isLoading: false });
            }).then(() => {
                const url = `${process.env.REACT_APP_BACK_URL}/resources/${this.state.ally.id_ally}`;
                axios.get(url, { headers: { 'x-auth-token': `${this.state.token}` } })
                    .then(res => {
                        this.setState({ allyResources: res.data, isLoading: false });
                    })
            })
            .catch(error => {
                console.log(error);
                console.log("Algo salió mal");
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let msg;
        const url = `${process.env.REACT_APP_BACK_URL}/allies/${this.state.ally.id_ally}`;

        const updateHoursAlly = {
            ally_challenge_ideation_hours: parseInt(this.hoursIdea.current.value),
            ally_challenge_experimentation_hours: parseInt(this.hoursExpe.current.value),
        }

        this.notifyUpdate("Actualizando");

        if (!this.validateChallengeHours(updateHoursAlly)) {
            msg = "Algo salio mal... ";
            this.notifyError(msg);
            return;
        }

        axios.post(
            url,
            updateHoursAlly,
            { headers: { 'x-auth-token': `${this.state.token}`, 'Content-Type': 'application/json' } }
        ).then(res => {
            msg = "Aliado actualizado con éxito."
            this.notifySuccess(msg);
        })
            .catch(error => {
                msg = "Algo salio mal. " + error.response.data;
                this.notifyError(msg);
            })

    }

    /**
     * Valida que las horas por reto no sean mayores a las hora mensuales
     * @returns {Boolean} - Booleano que indica si los campos son validos.
     */
    validateChallengeHours = (newHours) => {
        let isValid = true;
        this.setState({ errorIdea: null, errorExp: null });
        if (newHours.ally_challenge_ideation_hours > this.state.ally.ally_month_ideation_hours) {
            let message = "Las horas de ideación por reto no pueden ser mayores a las horas de ideación mensuales.";
            // this.setState({ errorIdea: message });
            isValid = false;
        }
        if (newHours.ally_challenge_experimentation_hours > this.state.ally.ally_month_experimentation_hours) {
            let message = "Las horas de experimentación por reto no pueden ser mayores a las horas de experimentación mensuales.";
            // this.setState({ errorExp: message });
            isValid = false;
        }
        return isValid;
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
     * Renderizar las propiedades del aliado que no pueden ser
     * editadas.
     * @param {Object[]} properties - Un arreglo con las propiedades que se van a renderizar
     * @returns {Object[]} Arreglo con los Form.Group que se van a renderizar
     */
    renderReadOnlyProperties = (properties) => {
        return Object.keys(properties).map(property => {
            return (
                <Form.Group as={Row} className="mx-3 align-items-center" key={property}>
                    <Form.Label column sm="12" md="6" className="editAllyLabelInput editAllyTitle editAllyTextStyle" >
                        {`${this.fromKeyToName(property)}:`}
                    </Form.Label>
                    <Col>
                        <Form.Control plaintext
                            readOnly
                            defaultValue={this.renderProperty(properties[property])}
                            className="editAllyInputReadOnly editAllyTextStyle"
                        />
                    </Col>
                </Form.Group>
            );
        })
    }

    /*
    *   Notificacion Tosat
    */
    notifyUpdate = (msg) => toast.info(msg, this.toastConfiguration);

    /**
     *  Success Toast
     */
    notifySuccess = (msg) => toast.success(msg, this.toastConfiguration);

    /**
     *  Error Toast
     */
    notifyError = (msg) => toast.error(msg, this.toastConfiguration);

    /**
     * Convertir el nombre de un atributo a la palabra
     * que corresponde en el form de renderizado.
     * @param {String} key
     * @returns {String}
     */
    fromKeyToName = (key) => {
        switch (key) {
            case "user_email": return "Correo";
            case "ally_web_page": return "Acerca de";
            case "ally_categories": return "Categorías de especialidad";
            case "ally_month_ideation_hours": return "Horas de ideación mensulaes";
            case "ally_month_experimentation_hours": return "Horas de experimentación mensulaes";
            default: return `No se reconoce ${key} como una llave válida.`;
        }
    }

    isEditableProperty(field) {
        return field === "ideaHoursC" || field === "expeHoursC" ? true : false;
    }

    renderProperty(value) {
        if (Array.isArray(value)) {
            let compValue = "";
            for (let category of value) {
                compValue += "#" + category.name;
            }
            return compValue;
        } else {
            return value;
        }
    }

    render() {
        const properties = _.pick(this.state.ally, ["user_email", "ally_web_page", "ally_month_ideation_hours", "ally_month_experimentation_hours"]);
        return (
            <Container className="p-0" fluid>
                <HeaderWithUserLogo source={img} />
                {this.state.isLoading ?
                    (
                        <div className="d-flex allyProfileLoadingChart justify-content-center flex-grow-1">
                            <ReactLoading className="d-flex align-items-center allChallengesSvgContainer" type={"spokes"} color={"#313333"} />
                        </div>
                    )
                    :
                    (
                        <div>
                            <Row className="allyProfileContentData mx-0">
                                <Col>
                                    <h3 className="mb-4 allyProfileTitle allyProfileTextStyle">{this.state.ally.ally_name}</h3>
                                    <Form>
                                        {this.renderReadOnlyProperties(properties)}
                                        <Form.Group as={Row} className="mx-0 align-items-baseline" >
                                            <Form.Label column sm="12" md="6" className="text-right allyProfileTextStyle allyProfileTitle" >
                                                Horas de ideación por reto:
                                        </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    defaultValue={this.state.ally.ally_challenge_ideation_hours}
                                                    className="allyProfileTextStyle formInput backgndColor editAllyHoursEdit"
                                                    ref={this.hoursIdea}
                                                />
                                            </Col>
                                        </Form.Group><Form.Group as={Row} className="mx-0 align-items-baseline" >
                                            <Form.Label column sm="12" md="6" className="text-right allyProfileTextStyle allyProfileTitle " >
                                                Horas de experimentación por reto:
                                        </Form.Label>
                                            <Col>
                                                <Form.Control
                                                    type="number"
                                                    min="1"
                                                    defaultValue={this.state.ally.ally_challenge_experimentation_hours}
                                                    className="allyProfileTextStyle formInput backgndColor editAllyHoursEdit"
                                                    ref={this.hoursExpe}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <div >
                                            <Button className="formButton allyProfileFormButton"
                                                size="sm"
                                                variant="warning"
                                                onClick={this.handleSubmit}
                                            >
                                                Guardar
                                        </Button>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                            <Row className="mx-0 mt-5 d-flex justify-content-center">
                                <Col lg={10}>
                                    <HumanResourceList cols="3"
                                        people={this.state.allyResources} />
                                </Col>
                            </Row>
                            <Row className="mt-5 mx-0">
                                <Col className="px-0">
                                    <Row className="mx-0 d-flex justify-content-center">
                                        <Col xs={11} sm={9} lg={10} className="d-flex flex-column align-items-left">
                                            <div className="d-flex flex-column flex-sm-row col-lg-9">
                                                <h5 className="allyProfileHeaderColor mt-3 col-lg-6"><b>Cambio de Contraseña: </b></h5>
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
                        </div>
                    )
                }

            </Container>

        );
    }
}

export default AllyProfile;