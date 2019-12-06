import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { IoIosCloseCircle } from 'react-icons/io';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import HumanResourceList from '../utilities/humanResource/HumanResourceList';
import logoCrear from '../../images/RetosTerminados.png';
import "./CreateAlly.css"

class CreateAlly extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            categoriesSelected: [],
            resources: [],
            resourceName: "",
            resourceProfile: "",
            resourceExperience: "",
            companyName: "",
            nit: "",
            companyEmail: "",
            webSite: "",
            companyPhone: "",
            ideaHours: "",
            expHours: "",
            token: this.getSession()
        }
    }

    componentDidMount() {
        if (this.state.token) {
            this.getAllCategories();
        }
    }

    /**
     * Obtener el token de sesion
     * @return {String} token 
     */
    getSession() {
        return sessionStorage.getItem('auth-token');
    }

    /**
    * Obtener todas las categorias para compañia
    * @return {Object} categories
    */
    getAllCategories() {
        const url = `${process.env.REACT_APP_BACK_URL}/ally_categories`;

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
    /**
     * Gestionar el envío del nuevo aliado al back para su creación.
     * Toma los atributos necesarios del state y construye el aliado.
     * @return {VoidFunction}
     */
    handleSubmit = event => {
        event.preventDefault();
        const url = `${process.env.REACT_APP_BACK_URL}/allies`;
        const newAlly = {
            user_email: this.state.companyEmail,
            user_password: "default",
            ally_name: this.state.companyName,
            ally_nit: this.state.nit,
            ally_web_page: this.state.webSite,
            ally_phone: this.state.companyPhone,
            ally_month_ideation_hours: this.state.ideaHours,
            ally_month_experimentation_hours: this.state.expHours,
            fk_id_role: 2,
            fk_user_state: 1,
            ally_resources: this.state.resources
        }
        
        axios.post(
            url,
            newAlly,
            { headers: { 'x-auth-token': `${this.state.token}` } }
        ).then(res => {                       
            console.log(res);
        }).catch(error => {
            console.log(error);
        })
    }

    /**
     * Agregar elemento seleccionado en la lista desplegable al
     * estado del componente
     * @return {VoidFunction}
     */
    fillSelectedElement = (event) => {
        let selectedElement = event.target.value;
        let currentCategories = this.state.categoriesSelected;

        if (!currentCategories.includes(selectedElement)) {
            currentCategories.push(selectedElement);
            this.setState({ categoriesSelected: currentCategories })
        }
    }

    handleDeleteClick = e => {
        const categoryToDelete = e.currentTarget.dataset.id;
        let newArray = this.state.categoriesSelected;
        newArray = _.remove(newArray, function (n) {
            return n !== categoryToDelete;
        });
        this.setState({ categoriesSelected: newArray });
    }

    /**
     * Añadir un nuevo recurso al estado del componente.
     * Se toman del estado el nombre, perfil y experiencia del recurso.
     * @returns {VoidFunction}
     */
    addResource = event => {
        event.preventDefault();
        let newResources = this.state.resources;
        const resource = {
            resource_name: this.state.resourceName,
            resource_profile: this.state.resourceProfile,
            resource_experience: this.state.resourceExperience
        }
        newResources.push(resource);
        this.setState({
            resources: newResources,
            resourceName: "",
            resourceProfile: "",
            resourceExperience: ""
        })
    }

    /**
    * Cambiar estado de la entrada mientras se ingresa un valor
    * @return {VoidFunction}
    */
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const titleProps = {
            text: "Crear Nuevo Aliado",
            img: logoCrear,
            imgAlt: "logo crear nuevo aliado"
        }
        return (
            <Container className="d-flex flex-column align-items-center px-5">
                <BackNavigator />
                <SectionTitle titleProps={titleProps} />
                <Row className="my-3 formBox paddingBox">
                    <Form>
                        <Form.Row className="mx-0">
                            <Col sm="12" md="5" className="textLeft pr-4">
                                <h5 className="formAllyTitles mb-4">Datos de la empresa: </h5>
                                <Form.Group>

                                    <Form.Control className="formInput backgndColor"
                                        placeholder="Nombre de la Empresa"
                                        name="companyName"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control className="formInput backgndColor"
                                        placeholder="NIT"
                                        name="nit"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control className="formInput backgndColor"
                                        placeholder="Email"
                                        name="companyEmail"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control className="formInput backgndColor"
                                        placeholder="Página Web"
                                        name="webSite"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control className="formInput backgndColor"
                                        placeholder="Teléfono"
                                        name="companyPhone"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                            </Col>

                            <Col sm="12" md="7" className="textLeft">
                                <Form.Group as={Row} className="mx-0 align-items-baseline" controlId="categories">
                                    <Col>
                                        <Form.Label className="formAllyTitles">
                                            Categorías de especialidad:
                                        </Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select"
                                            onChange={this.fillSelectedElement}
                                            className="formSelect backgndColor"
                                            defaultValue="default"
                                        >
                                            <option disabled value="default">Seleccione las categorias</option>
                                            {this.state.categories.map(category => {
                                                return <option key={category.id_category}>{category.category_name}</option>
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Row className="mx-0">
                                    <Col md="6">
                                        <ul className="listRemovable p-0 d-flex flex-column align-items-center flex-wrap" >
                                            {this.state.categoriesSelected.map((item) => {
                                                return (
                                                    <IconContext.Provider key={item} value={{ color: "gray", className: "logoutIcon" }}>
                                                        <li key={item} className="w-auto" >
                                                            <span data-id={item} className="crossLink" onClick={this.handleDeleteClick}>
                                                                <IoIosCloseCircle />
                                                            </span>
                                                            {item}
                                                        </li>
                                                    </IconContext.Provider>
                                                )
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                                <Form.Group as={Row} className="mx-0 align-items-baseline" controlId="ideHours">
                                    <Form.Label column className="formAllyTitles">
                                        Horas de ideación mensuales:
                                    </Form.Label>
                                    <Col md="3">
                                        <Form.Control className="formInput backgndColor"
                                            type="number"
                                            name="ideaHours"
                                            onChange={this.handleInputChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mx-0 align-items-baseline" controlId="expHours">
                                    <Form.Label column className="formAllyTitles">
                                        Horas de experimentación mensuales:
                                    </Form.Label>
                                    <Col md="3">
                                        <Form.Control className="formInput backgndColor"
                                            type="number"
                                            name="expHours"
                                            onChange={this.handleInputChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row className="mx-0 my-4">
                            <Col sm="12" md="5" className="textLeft pr-4">
                                <h5 className="formAllyTitles mb-4"> Recursos humanos: </h5>
                                <Form.Group>
                                    <Form.Control placeholder="Nombre"
                                        value={this.state.resourceName}
                                        className="formInput backgndColor"
                                        name="resourceName"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control placeholder="Perfil"
                                        value={this.state.resourceProfile}
                                        className="formInput backgndColor"
                                        name="resourceProfile"
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control as="textarea" rows="3"
                                        placeholder="Experiencia"
                                        value={this.state.resourceExperience}
                                        className="formInput backgndColor"
                                        name="resourceExperience"
                                        style={{ resize: "none" }}
                                        onChange={this.handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="d-flex justify-content-end">
                                    <Col sm="3" className="p-0">
                                        <Button size="sm"
                                            variant="warning"
                                            className="formButton"
                                            onClick={this.addResource}
                                        >
                                            Añadir
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col sm="12" md="7">
                                <HumanResourceList cols="2" people={this.state.resources} />
                                <Form.Group className="d-flex justify-content-end">
                                    <Col sm="3" className="p-0">
                                        <Button className="formButton"
                                                size="sm"
                                                variant="success"
                                                onClick={this.handleSubmit}
                                        >
                                            Crear
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </Form>
                </Row>
            </Container>
        );
    }
}

export default CreateAlly;