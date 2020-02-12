import React from "react";
import { Col, Card, Row, Container, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import LogoProposing from '../../images/EmpresaB.png';
import './surveysView.css';

class SurveysView extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            answers:{}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    questions_test = [
        {
            question_body: "De acuerdo con la propuesta recibida inicialmente, ¿crees que la propuesta fue la manera maás adecuada de proceder con tu reto?",
            answer_option: ["Si", "No"],
            id_question: 3,
            id_survey: 5
        },
        {
            question_body: "¿Cómo clasificarias el servicio presentado por la empresa que realizo el reto que propusiste?",
            answer_option: ["Muy Satisfecho", "Puede mejorar", "Insatisfecho", "Trsite", "Contento"],
            id_question: 4,
            id_survey: 5
        }
    ]
    handleSubmit(event) {
        debugger;
        event.preventDefault();
    }
    handleChange(e) {
        
        alert(e.target.value);
    }
    // question() {
    //     return (
    //         <div></div>
    //     )
    // }
    render() {
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

                                <Form className="" onSubmit={this.handleSubmit}>
                                    {
                                        this.questions_test.map((question, index) => {
                                            return (
                                                <Card className="surveysViewCard mb-4">
                                                    <Card.Body>
                                                        <Card.Title className="text-left mb-2">Pregunta {(index + 1)}</Card.Title>
                                                        <Card.Text className="surveyViewText text-justify"> {question.question_body}</Card.Text>
                                                        {
                                                            question.answer_option.map((option, index_option) => {
                                                                return (
                                                                    <div className="survayViewRadio form-check form-check-inline">
                                                                        <input type="radio"
                                                                            value={option}
                                                                            onChange={this.handleChange}
                                                                            name={'question_' + question.id_question}
                                                                            value={this.state}
                                                                            className="survayViewRadio form-check-input"
                                                                            id={"answer_" + index_option}>
                                                                        </input>
                                                                        <label className="survayViewRadio form-check-label" for="inlineRadio1">{option}</label>
                                                                    </div>
                                                                )
                                                            })
                                                        }


                                                    </Card.Body>

                                                </Card>
                                            )
                                        })
                                    }
                                    <input type="submit" value="Submit" />
                                </Form>


                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container >
        )
    }
}

export default SurveysView;