import React from 'react';
import { Container, Row, Col, Form, Button, CardDeck } from 'react-bootstrap';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import HumanResourceList from '../utilities/humanResource/HumanResourceList';
import logoCrear from '../../images/RetosTerminados.png';
import imgHumanResourse from '../../images/profileHumanResource.jpg';
import "./CreateAlly.css"

const possibleCategories = [
    "Aplicación Móvil",
    "iOS",
    "Realidad Aumentada",
    "Blockchain",
    "Transformación Digital",
    "Desarrollo Móvil",
    "UX/UI"
]
const humanResources = [
    {
        name: "Simón Arias",
        profile: "Psicologo",
        experience: "Cuenta con X años dentro de la Industria tecnológica en el rol de Analysis de comportamientos de Usuarios",
        img: imgHumanResourse
    },
    {
        name: "Daniela Ossa",
        profile: "Arquitecta de Información",
        experience: "Cuenta con X años creando la basa para diversos proyectis tecnológicos, se asegura que las propuestas funcionen.",
        img: imgHumanResourse
    },
    {
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
            categories: []
        }
    }
    fillSelectedElement = (event) => {
        let selectedElement = event.target.value;
        let currentCategories = this.state.categories;

        if (!currentCategories.includes(selectedElement)) {
            currentCategories.push(selectedElement);
            this.setState({ categories: currentCategories })
        }
        console.log(this.state.categories);
    }
    render() {
        const titleProps = {
            text: "Crear Nuevo Aliado",
            img: logoCrear,
            imgAlt: "logo crear nuevo aliado"
        }
        return (
            <Container className="d-flex flex-column align-items-center">
                <BackNavigator />
                <SectionTitle titleProps={titleProps} />
                <Row className="my-3">
                    <Form>
                        <Form.Row className="m-0">
                            <Col sm="12" md="5">
                                <span>Datos de la empresa: </span>
                                <Form.Group controlId="companyName">
                                    <Form.Control placeholder="Nombre de la Empresa" />
                                </Form.Group>
                                <Form.Group controlId="nit">
                                    <Form.Control placeholder="NIT" />
                                </Form.Group>
                                <Form.Group controlId="companyEmail">
                                    <Form.Control placeholder="Email" />
                                </Form.Group>
                                <Form.Group controlId="webSite">
                                    <Form.Control placeholder="Página Web" />
                                </Form.Group>
                                <Form.Group controlId="companyPhone">
                                    <Form.Control placeholder="Teléfono" />
                                </Form.Group>
                            </Col>

                            <Col sm="12" md="7">
                                <Form.Group as={Row} className="mx-0" controlId="categories">
                                    <Col>
                                        <Form.Label>
                                            Categorías de especialidad:
                                        </Form.Label>
                                        <p>{this.state.categories}</p>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" onChange={this.fillSelectedElement}>
                                            {possibleCategories.map(category => {
                                                return <option key={category}>{category}</option>
                                            })}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mx-0" controlId="ideHours">
                                    <Form.Label column>
                                        Horas de ideación mensuales:
                                    </Form.Label>
                                    <Col>
                                        <Form.Control type="number" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mx-0" controlId="expHours">
                                    <Form.Label column>
                                        Horas de experimentación mensuales:
                                    </Form.Label>
                                    <Col>
                                        <Form.Control type="number" />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row className="m-0">
                            <Col sm="12" md="5">
                                <span> Recursos humanos: </span>
                                <Form.Group controlId="resourceName">
                                    <Form.Control placeholder="Nombre" />
                                </Form.Group>

                                <Form.Group controlId="resourceProfile">
                                    <Form.Control placeholder="Perfil" />
                                </Form.Group>

                                <Form.Group controlId="companyEmail">
                                    <Form.Control placeholder="Email" />
                                </Form.Group>

                                <Form.Group >
                                    <Button type="submit">Sign in</Button>
                                </Form.Group>
                            </Col>

                            <Col sm="12" md="7">
                                <HumanResourceList people={humanResources} />
                            </Col>
                        </Form.Row>
                    </Form>
                </Row>
            </Container>
        );
    }
}

export default CreateAlly;