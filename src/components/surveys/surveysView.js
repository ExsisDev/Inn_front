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
                    <Row className="mb-4">
                        <Col>

                            <Form className="">
                                <Card className="surveysViewCard">
                                    <Card.Body>
                                        <Card.Title className="text-left mb-2">Pregunta 1</Card.Title>
                                        <Card.Text className="surveyViewText text-justify"> De acuerdo con la propuesta recibida inicialmente, ¿crees que la propuesta fue la manera maás adecuada de proceder con tu reto?</Card.Text>
                                        <div className="survayViewRadio form-check form-check-inline">
                                            <input className="survayViewRadio form-check-input" type="radio" id="left"></input>
                                            <label className="survayViewRadio form-check-label" for="inlineRadio1">Si</label>
                                        </div>
                                        <div className="survayViewRadio form-check form-check-inline">
                                            <input className="survayViewRadio form-check-input" type="radio" id="rigth"></input>
                                            <label className="survayViewRadio form-check-label" for="inlineRadio2">No</label>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Form>


                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>

                            <Form className="">
                                <Card className="surveysViewCard">
                                    <Card.Body>
                                        <Card.Title className="text-left mb-2">Pregunta 2</Card.Title>
                                        <Card.Text className="surveyViewText text-justify">¿Cómo clasificarias el servicio presentado por la empresa que realizo el reto que propusiste? </Card.Text>
                                        <div className="survayViewRadio form-check form-check-inline">
                                            <input className="survayViewRadio form-check-input" type="radio" id="left"></input>
                                            <label className="survayViewRadio form-check-label" for="inlineRadio1">Muy satisfecho</label>
                                        </div>
                                        <div className="survayViewRadio form-check form-check-inline">
                                            <input className="survayViewRadio form-check-input" type="radio" id="rigth"></input>
                                            <label className="survayViewRadio form-check-label" for="inlineRadio2">Puede mejorar</label>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Form>


                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>

                            <Form className="">
                                <Card className="surveysViewCard">
                                    <Card.Body>
                                        <Card.Title className="text-left mb-2">Pregunta 3</Card.Title>
                                        <Card.Text className="surveyViewText text-justify">¿Crees que la experiencia que asegura tener la empresa que realizó tu reto es acertada? </Card.Text>
                                        <div className="survayViewRadio form-check form-check-inline">
                                            <input className="survayViewRadio form-check-input" type="radio" id="left"></input>
                                            <label className="survayViewRadio form-check-label" for="inlineRadio1">Si</label>
                                        </div>
                                        <div className="survayViewRadio form-check form-check-inline">
                                            <input className="survayViewRadio form-check-input" type="radio" id="rigth"></input>
                                            <label className="survayViewRadio form-check-label" for="inlineRadio2">No</label>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Form>


                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container >
                )
            }
            
export default SurveysView;