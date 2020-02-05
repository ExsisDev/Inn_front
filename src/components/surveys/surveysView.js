import React from "react";
import { Col, Card, Row, Container, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import LogoProposing from '../../images/EmpresaB.png';
import './surveysView.css';

const SurveysView = (props) => {
    function question() {
        return (
            <div></div>
        )
    }
    return (
        <Container fluid className="d-flex justify-content-center">
            <Row className="h-100 d-flex justify-content-center">
                <Col sm={11} className="d-flex flex-column align-items-center">
                    <BackNavigator />
                    <Row className="">
                        <Col className="">
                            <h3 className="surveyViewTitle ">Encuesta</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className="surveysViewCard">
                                <Card.Body>
                                    <Card.Title className="text-left mb-2">Pregunta 1</Card.Title>
                                    <Card.Text className="text-justify"> De acuerdo con la propuesta recibida inicialmente, ¿crees que la propuesta fue la manera maás adecuada de proceder con tu reto?</Card.Text>
                                    <Form className="form-inline">
                                        
                                        <Form.Check label="Si" type={"radio"} id="left" className="form-inline form-check-inline" />
                                        <Form.Check label="No" type={"radio"} id="rigth" className="form-inline form-check-inline" />
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container >
    )
}

export default SurveysView;