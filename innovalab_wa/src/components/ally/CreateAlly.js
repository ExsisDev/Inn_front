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
import imgHumanResourse from '../../images/profileHumanResource.jpg';
import "./CreateAlly.css"

const humanResources = [
    {
        id: 1,
        name: "Simón Arias",
        profile: "Psicologo",
        experience: "Cuenta con X años dentro de la Industria tecnológica en el rol de Analysis de comportamientos de Usuarios",
        img: imgHumanResourse
    },
    {
        id: 2,
        name: "Daniela Ossa",
        profile: "Arquitecta de Información",
        experience: "Cuenta con X años creando la basa para diversos proyectis tecnológicos, se asegura que las propuestas funcionen.",
        img: imgHumanResourse
    },
    {
        id: 3,
        name: "Oscar Mahecha",
        profile: "Gerente de Proyectos",
        experience: "Cuenta con X años dirigiendo proyectos, ha trabajado en Proyectos como X,Y y Z en los últimos 3 años.",
        img: imgHumanResourse
    }
]

class CreateAlly extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            categoriesSelected: [],
            resources: [],
            token: this.getSession()
        }
    }

    componentDidMount() {
        if (this.state.token) {
            this.getAllCategories();
        }
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
     * Obtener el token de sesion
     * @return {String} token 
     */
    getSession() {
        return sessionStorage.getItem('auth-token');
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
                                <Form.Group controlId="companyName">
                                    <Form.Control placeholder="Nombre de la Empresa"
                                        className="formInput backgndColor"
                                    />
                                </Form.Group>
                                <Form.Group controlId="nit">
                                    <Form.Control placeholder="NIT"
                                        className="formInput backgndColor"
                                    />
                                </Form.Group>
                                <Form.Group controlId="companyEmail">
                                    <Form.Control placeholder="Email"
                                        className="formInput backgndColor"
                                    />
                                </Form.Group>
                                <Form.Group controlId="webSite">
                                    <Form.Control placeholder="Página Web"
                                        className="formInput backgndColor"
                                    />
                                </Form.Group>
                                <Form.Group controlId="companyPhone">
                                    <Form.Control placeholder="Teléfono"
                                        className="formInput backgndColor"
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
                                        >
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
                                        <Form.Control type="number"
                                            className="formInput backgndColor"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mx-0 align-items-baseline" controlId="expHours">
                                    <Form.Label column className="formAllyTitles">
                                        Horas de experimentación mensuales:
                                    </Form.Label>
                                    <Col md="3">
                                        <Form.Control type="number"
                                            className="formInput backgndColor"
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Row className="mx-0 my-4">
                            <Col sm="12" md="5" className="textLeft pr-4">
                                <h5 className="formAllyTitles mb-4"> Recursos humanos: </h5>
                                <Form.Group controlId="resourceName">
                                    <Form.Control placeholder="Nombre"
                                        className="formInput backgndColor"
                                    />
                                </Form.Group>
                                <Form.Group controlId="resourceProfile">
                                    <Form.Control placeholder="Perfil"
                                        className="formInput backgndColor"
                                    />
                                </Form.Group>
                                <Form.Group controlId="companyEmail">
                                    <Form.Control placeholder="Email"
                                        className="formInput backgndColor"
                                    />
                                </Form.Group>
                                <Form.Group className="d-flex justify-content-end">
                                    <Col sm="3" className="p-0">
                                        <Button size="sm" variant="warning" className="formButton" >Añadir</Button>
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col sm="12" md="7">
                                <HumanResourceList cols="2" people={humanResources} />
                                <Form.Group className="d-flex justify-content-end">
                                    <Col sm="3" className="p-0">
                                        <Button size="sm" variant="success" className="formButton" >Crear</Button>
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