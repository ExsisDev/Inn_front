import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect, Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { IoIosCloseCircle } from 'react-icons/io';

import { getToken } from '../../commons/tokenManagement';
import HeaderWithUserLogo from '../utilities/headerWithUserLogo/HeaderWithUserLogo';
import img from '../../images/EmpresaA.png';
import 'react-toastify/dist/ReactToastify.css';
import './EditAlly.css';

class EditAlly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ally: {},
            categories: [],
            ideaHours: 0,
            expeHours: 0,
            challengeIdeaHours: 0,
            challengeExpeHours: 0,
            isUpdated: false,
            isLoading: true,
            errorIdea: "",
            errorExp: "",
            token: getToken()
        }

        this.toastConfiguration = {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            closeButton: false,
            containerId: 'A'
        }
    }

    toastId = null;

    componentDidMount() {
        if (this.state.token) {
            this.getAllCategories();
            this.getAlly();
        }
    }

    /**
    * Obtener todas las categorias para compañia
    * @return {Object} categories
    */
    getAllCategories() {
        const url = `${process.env.REACT_APP_BACK_URL}/al_categories`;

        axios.get(url, {
            headers: { 'x-auth-token': `${this.state.token}` }
        })
            .then(res => {
                this.setState({ categories: res.data });
            })
            .catch(error => {
            });
    }

    /**
     * Obtener un aliado por su id
     */
    getAlly() {
        const idAlly = this.props.match.params.idAlly;
        const url = `${process.env.REACT_APP_BACK_URL}/allies/${idAlly}`;

        axios.get(url, {
            headers: { 'x-auth-token': `${this.state.token}` }
        })
            .then(res => {
                this.setState({
                    ally: res.data,
                    ideaHours: res.data.ally_month_ideation_hours,
                    expeHours: res.data.ally_month_experimentation_hours,
                    challengeIdeaHours: res.data.ally_challenge_ideation_hours,
                    challengeExpeHours: res.data.ally_challenge_experimentation_hours,
                    isLoading: false
                });
            })
            .catch(error => {
            });
    }

    /**
     * Renderizar las propiedades del aliado que no pueden ser
     * editadas.
     * @param {Object[]} properties - Un arreglo con las propiedades que se van a renderizar
     * @returns {Object[]} Arreglo con los Form.Group que se van a renderizar
     */
    renderReadOnlyProperties = (properties) => {
        return Object.keys(properties).map(key => {
            return (
                <Form.Group as={Row} className="mx-0 align-items-center" key={key}>
                    <Form.Label column sm="12" md="6" className="editAllyLabelInput editAllyTitle editAllyTextStyle">
                        {`${this.fromKeyToName(key)}:`}
                    </Form.Label>
                    <Col>
                        <Form.Control plaintext readOnly className="editAllyInputReadOnly editAllyTextStyle"
                            defaultValue={properties[key]}
                        />
                    </Col>
                </Form.Group>
            );
        })
    }

    /**
     * Convertir el nombre de un atributo a la palabra
     * que corresponde en el form de renderizado.
     * @param {String} key
     * @returns {String}
     */
    fromKeyToName = (key) => {
        switch (key) {
            case "user_email": return "Correo";
            case "ally_nit": return "NIT";
            case "ally_web_page": return "Página web";
            case "ally_phone": return "Teléfono";
            default: return `No se reconoce ${key} como una llave válida.`;
        }
    }

    /**
     * Enviar datos del aliado que van a ser actualizados.
     * 1. Se extraen solo los ids de las nuevas categorias
     * 2. Se construye el objeto a ser enviado
     * 3. Se realiza la petición
     * 4. Se redirige a Home
     */
    handleSubmit = (event) => {
        event.preventDefault();
        let msg;
        let newCategories = [];
        // Step 1
        this.state.ally.ally_categories.map(category => {
            newCategories.push(category.id_category);
        });
        // Step 2
        const fieldsToUpdate = {
            ally_month_experimentation_hours: this.state.expeHours,
            ally_month_ideation_hours: this.state.ideaHours,
            ally_challenge_ideation_hours: this.state.challengeIdeaHours,
            ally_challenge_experimentation_hours: this.state.challengeExpeHours,
            ally_categories: newCategories
        }
        const apiEndPoint = `${process.env.REACT_APP_BACK_URL}/allies/${this.state.ally.id_ally}`;

        // Step 3
        this.notify();
        axios.put(
            apiEndPoint,
            fieldsToUpdate,
            { headers: { 'x-auth-token': `${this.state.token}` } }
        ).then(res => {
            msg = "Aliado actualizado con éxito."
            this.updateSuccess(msg);
            setTimeout(() => {
                // redirección a Home
                this.setState({ isUpdated: true });
            }, 2000);
        }).catch(error => {
            msg = "Algo salio mal. Intentalo de nuevo."
            this.updateError(msg);
        });
    }


    /**
     * Notificación de actualización
     */
    notify = () => this.toastId = toast.info("Actualizando...", this.toastConfiguration);


    /**
     * Notificación de éxito
     */
    updateSuccess = (msg) => {
        toast.update(this.toastId, { render: msg, type: toast.TYPE.SUCCESS, autoClose: 3000 });
    }


    /**
     * Notificación de error
     */
    updateError = (msg) => {
        toast.update(this.toastId, { render: msg, type: toast.TYPE.ERROR, autoClose: 3000 });
    }


    /**
     * Agregar la categoria seleccionada al aliado
     * estado del componente
     * @return {VoidFunction}
     */
    fillSelectedElement = (event) => {
        let currentCategories = [];
        let index = event.nativeEvent.target.selectedIndex;
        let selectedCategory = {
            category_name: event.nativeEvent.target[index].text,
            id_category: parseInt(event.nativeEvent.target.value)
        }
        _.assign(currentCategories, this.state.ally.ally_categories);
        //se revisa que la categoria no haya sido seleccionada anteriormente
        for (let category of currentCategories) {
            if (category.id_category === selectedCategory.id_category) {
                return;
            }
        }
        currentCategories.push(selectedCategory);
        // se hace una copia del alidado y se sobreescribe la propiedad ally_categories
        const ally = { ...this.state.ally, ally_categories: currentCategories };
        this.setState({ ally });
    }

    /**
     * Eliminar categoria del aliado
     * @return {VoidFunction}
     */
    handleDeleteClick = (event) => {
        const idCategoryToDelete = parseInt(event.currentTarget.dataset.id);
        let currentCategories = [];
        _.assign(currentCategories, this.state.ally.ally_categories);
        _.remove(currentCategories, function (category) {
            return category.id_category === idCategoryToDelete;
        });
        const ally = { ...this.state.ally, ally_categories: currentCategories };
        this.setState({ ally });
    }

    /**
     * Manejar el cambio de horas
     */
    handleHoursChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let isValueValid = true;

        if (_.includes(name, "Hours") && value < 0) {
            let regex = /^[1-9]\d*$/;
            isValueValid = regex.test(value);
        }
        if (isValueValid) {
            this.setState({ [name]: value }, () => {
                if (name === "challengeIdeaHours" || name === "challengeExpeHours") {
                    this.validateChallengeHours();
                }
            });
        }
    }


    /**
     * Valida que las horas por reto no sean mayores a las hora mensuales
     * @returns {Boolean} - Booleano que indica si los campos son validos.
     */
    validateChallengeHours = () => {
        let isValid = true;
        this.setState({ errorIdea: null, errorExp: null });
        if (parseInt(this.state.ideaHours) < parseInt(this.state.challengeIdeaHours)) {
            let message = "Las horas de ideación por reto no pueden ser mayores a las horas de ideación mensuales.";
            this.setState({ errorIdea: message });
            isValid = false;
        }
        if (this.state.expeHours < this.state.challengeExpeHours) {
            let message = "Las horas de experimentación por reto no pueden ser mayores a las horas de experimentación mensuales.";
            this.setState({ errorExp: message });
            isValid = false;
        }
        return isValid;
    }

    render() {
        let properties = _.pick(this.state.ally, ['user_email', 'ally_nit', 'ally_web_page', 'ally_phone']);
        const idAlly = this.props.match.params.idAlly;
        if (this.state.isUpdated) {
            return <Redirect to="/home/ally" />;
        }
        return (
            <Container className="p-0" fluid>
                <HeaderWithUserLogo source={img} />
                {this.state.isLoading ?
                    (
                        <div className="d-flex justify-content-center flex-grow-1">
                            <ReactLoading className="d-flex align-items-center loadingSvgContainer" type={"spokes"} color={"#313333"} />
                        </div>
                    )
                    :
                    (
                        <Row className="editAllyContentData mx-0">
                            <h3 className="mb-4 editAllyTitle editAllyTextStyle">{this.state.ally.ally_name}</h3>
                            <Form >
                                {
                                    this.renderReadOnlyProperties(properties)
                                }
                                <Form.Group as={Row} className="mx-0 align-items-baseline ">
                                    <Form.Label column sm="12" md="6" className="editAllyLabelInput editAllyTitle editAllyTextStyle">
                                        Categorías de especialidad:
                                    </Form.Label>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <Form.Control as="select"
                                                    onChange={this.fillSelectedElement}
                                                    className="formSelect backgndColor"
                                                    defaultValue="default"
                                                >
                                                    <option disabled value="default">Seleccione las categorias</option>
                                                    {this.state.categories.map(category => {
                                                        return <option key={category.id_category} value={category.id_category}>{category.category_name}</option>
                                                    })}
                                                </Form.Control>
                                            </Col>
                                            <Col sm="12" md="6" >
                                                <ul className="listRemovable p-0 d-flex flex-column flex-wrap align-items-md-start" >
                                                    {this.state.ally.ally_categories && this.state.ally.ally_categories.map((item) => {
                                                        return (
                                                            <IconContext.Provider key={item.id_category} value={{ className: "logoutIcon" }}>
                                                                <li className="w-auto" >
                                                                    <span data-id={item.id_category} className="crossLink"
                                                                        onClick={this.handleDeleteClick}>
                                                                        <IoIosCloseCircle />
                                                                    </span>
                                                                    {item.category_name}
                                                                </li>
                                                            </IconContext.Provider>
                                                        )
                                                    })}
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mx-0 align-items-baseline" controlId="ideHours">
                                    <Form.Label column sm="12" md="6" className="editAllyLabelInput editAllyTitle editAllyTextStyle">
                                        Horas de ideación mensuales:
                                    </Form.Label>
                                    <Col>
                                        <Form.Control className="formInput backgndColor editAllyHoursEdit"
                                            type="number"
                                            name="ideaHours"
                                            value={this.state.ideaHours}
                                            onChange={this.handleHoursChange}
                                            min="1"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className=" mx-0 align-items-baseline" controlId="expHours">
                                    <Form.Label column sm="12" md="6" className="editAllyLabelInput editAllyTitle editAllyTextStyle">
                                        Horas de experimentación mensuales:
                                    </Form.Label>
                                    <Col>
                                        <Form.Control className="formInput backgndColor editAllyHoursEdit"
                                            type="number"
                                            name="expeHours"
                                            value={this.state.expeHours}
                                            onChange={this.handleHoursChange}
                                            min="1"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mx-0 align-items-baseline" controlId="ideHours">
                                    <Form.Label column sm="12" md="6" className="editAllyLabelInput editAllyTitle editAllyTextStyle">
                                        Horas de ideación por reto:
                                    </Form.Label>
                                    <Col>
                                        <Form.Control className="formInput backgndColor editAllyHoursEdit"
                                            type="number"
                                            name="challengeIdeaHours"
                                            value={this.state.challengeIdeaHours}
                                            onChange={this.handleHoursChange}
                                            min="1"
                                        />
                                    </Col>
                                    <p className="errorMessage">{this.state.errorIdea}</p>
                                </Form.Group>
                                <Form.Group as={Row} className=" mx-0 align-items-baseline" controlId="expHours">
                                    <Form.Label column sm="12" md="6" className="editAllyLabelInput editAllyTitle editAllyTextStyle">
                                        Horas de experimentación por reto:
                                    </Form.Label>
                                    <Col>
                                        <Form.Control className="formInput backgndColor editAllyHoursEdit"
                                            type="number"
                                            name="challengeExpeHours"
                                            value={this.state.challengeExpeHours}
                                            onChange={this.handleHoursChange}
                                            min="1"
                                        />
                                    </Col>
                                    <p className="errorMessage">{this.state.errorExp}</p>
                                </Form.Group>
                                <Form.Group as={Row} className="mx-0 mb-5">
                                    <Col md={{ span: 2, offset: 5, order: 2 }} >
                                        <Button className="formButton"
                                            size="sm"
                                            variant="warning"
                                            onClick={this.handleSubmit}
                                        >
                                            Guardar
                                        </Button>
                                    </Col>
                                    <Col md={{ span: 3, offset: 1, order: 1 }}
                                        lg={{ span: 2, offset: 1, order: 1 }}
                                    >
                                        <Button className="formButton"
                                            size="sm"
                                            variant="info"
                                            as={Link}
                                            to={`/ally/edit/${idAlly}/resources`}
                                        >
                                            Administrar recursos
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Row>
                    )
                }
            </Container>
        );
    }
}

export default EditAlly;