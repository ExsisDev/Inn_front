import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { IoIosCloseCircle } from 'react-icons/io';
import HeaderWithUserLogo from '../utilities/headerWithUserLogo/HeaderWithUserLogo';
import img from '../../images/EmpresaA.png';
import './EditAlly.css';

class EditAlly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ally: {},
            categories: [],
            ideaHours: 0,
            expeHours: 0,
            isCreated: false,
            isLoading: true,
            token: this.getToken()
        }       

        this.toastConfiguration = {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			closeButton: false
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
     * Obtener el token desde localStorage
     * @return {String} token 
     */
    getToken() {
        return localStorage.getItem('auth-token');
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
                console.log(error);
            });
    }

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
                    isLoading: false
                });
            })
            .catch(error => {
                console.log(error);
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
                    <Form.Label column sm="12" md="6" className="labelInputEditAlly titleEditAlly textStyle">
                        {`${this.fromKeyToName(key)}:`}
                    </Form.Label>
                    <Col>
                        <Form.Control plaintext readOnly className="inputReadOnlyEditAlly textStyle"
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
            default: throw `No se reconoce ${key} como una llave válida.`;
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
                this.setState({ isCreated: true });
            }, 2000);
        }).catch(error => {
            msg = "Algo salio mal. Intentalo de nuevo."
            this.updateError(msg);
        });
    }

    notify = () => this.toastId = toast.info("Actualizando...", this.toastConfiguration);

    updateSuccess = (msg) => {
        toast.update(this.toastId, { render: msg, type: toast.TYPE.SUCCESS, autoClose: 2000 });
    }

    updateError = (msg) => {
        toast.update(this.toastId, { render: msg, type: toast.TYPE.ERROR, autoClose: 2000 });
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

    handleHoursChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        let properties = _.pick(this.state.ally, ['user_email', 'ally_nit', 'ally_web_page', 'ally_phone']);
        return (
            <Container className="p-0" fluid>
                {
                    this.state.isCreated &&
                    <Redirect to="/home" />
                }
                <ToastContainer />
                <HeaderWithUserLogo source={img} />
                {this.state.isLoading ?
                    (
                        <div className="d-flex justify-content-center flex-grow-1">
                            <ReactLoading className="d-flex align-items-center svgContainerEditAlly" type={"spokes"} color={"#313333"} />
                        </div>
                    )
                    :
                    (
                        <Row className="contentDataEditAlly mx-0">
                            <h3 className="titleEditAlly textStyle">{this.state.ally.ally_name}</h3>
                            <Form >
                                {
                                    this.renderReadOnlyProperties(properties)
                                }
                                <Form.Group as={Row} className="mx-0 align-items-baseline ">
                                    <Form.Label column sm="12" md="6" className="labelInputEditAlly titleEditAlly textStyle">
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
                                    <Form.Label column sm="12" md="6" className="labelInputEditAlly titleEditAlly textStyle">
                                        Horas de ideación mensuales:
                            </Form.Label>
                                    <Col>
                                        <Form.Control className="formInput backgndColor hoursEditAlly"
                                            type="number"
                                            name="ideaHours"
                                            value={this.state.ideaHours}
                                            onChange={this.handleHoursChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className=" mx-0 align-items-baseline" controlId="expHours">
                                    <Form.Label column sm="12" md="6" className="labelInputEditAlly titleEditAlly textStyle">
                                        Horas de experimentación mensuales:
                                    </Form.Label>
                                    <Col>
                                        <Form.Control className="formInput backgndColor hoursEditAlly"
                                            type="number"
                                            name="expeHours"
                                            value={this.state.expeHours}
                                            onChange={this.handleHoursChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mx-0 mb-5">
                                    <Col md={{ span: 2, offset: 9 }} >
                                        <Button className="formButton"
                                            size="sm"
                                            variant="warning"
                                            onClick={this.handleSubmit}
                                        >
                                            Guardar
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