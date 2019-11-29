import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import logoCrear from '../../images/RetosTerminados.png';
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

class CreateAlly extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: []
        }
    }
    fillSelectedElement = ( event ) => {
        let selectedElement = event.target.value;        
        let currentCategories = this.state.categories;
        
        if(!currentCategories.includes(selectedElement)){
            currentCategories.push(selectedElement);
            this.setState({categories: currentCategories})
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
                            <Col>
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

                            <Col>
                                <Form.Group as={Row} className="mx-0" controlId="categories">
                                    <Col>
                                        <Form.Label>
                                            Categorías de especialidad:
                                        </Form.Label>
                                        <p>{this.state.categories}</p>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" onChange={this.fillSelectedElement}>
                                            {possibleCategories.map( category => {
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
                            <Col>
                                c
                            </Col>

                            <Col>
                                d
                            </Col>
                        </Form.Row>
                    </Form>
                </Row>
            </Container>
        );
    }
}

export default CreateAlly;