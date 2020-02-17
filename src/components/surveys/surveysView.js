import React from "react";
import axios from 'axios';
import { Col, Card, Row, Container, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import LogoProposing from '../../images/EmpresaB.png';
import { getToken } from '../../commons/tokenManagement';
import './surveysView.css';

class SurveysView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all_questions: [],
            array_answers: [],
            fk_id_survey_temp: 0,
            token: getToken()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
 

    componentDidMount() {
        this.getQuestionData();
    }

    async getQuestionData() {
        const URL = `${process.env.REACT_APP_BACK_URL}/surveys/${this.props.match.params.idChallenge}`;
        const token = this.state.token;

        await axios.get(URL, {
            headers: { 'x-auth-token': `${token}` }
        })
            .then((result) => {
                console.log(result.data);
                let newArray = result.data.slice();

                if (newArray) {
                    this.setState((state, props) => {
                        return {
                            all_questions: newArray

                        }

                    });
                }

            }).catch((error) => {
                this.setState({ all_questions: [] });
            });
    }

    handleSubmit(e) {
        let URL = `${process.env.REACT_APP_BACK_URL}/surveys`;
        const token = this.state.token;
        const answer_object_array = this.state.array_answers;
        axios.put(URL, answer_object_array, {
            headers: { 'x-auth-token': `${token}` }
        }).then((result) => {

        }).catch((error) => {

        });
        alert("Se envio la información");
        console.log(answer_object_array);

    }

    async handleChange(e, fk_id_survey) {
        var answer_temp = e.currentTarget.value;
        var id_q_temp = e.currentTarget.name;
        var flag = false;
        await this.setState((state) => {
            let oldArray = state.array_answers;

            oldArray.find((answer_item) => {
                if (answer_item.id_q === id_q_temp) {
                    answer_item.answer = answer_temp;
                    flag = true;
                    return flag;
                }

                return flag;
            })

            let newArray = flag === false ? oldArray.concat([{ fk_id_survey, fk_id_question: id_q_temp, answer: answer_temp }]) : oldArray;
            return {
                array_answers: newArray
            }
        })
        console.log(this.state.array_answers);
    }


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
                                        this.state.all_questions.map((question, index) => {
                                            return (
                                                <Card key={"map_" + index} className="surveysViewCard mb-4">
                                                    <Card.Body>
                                                        <Card.Title className="text-left mb-2">Pregunta {(index + 1)}</Card.Title>
                                                        <Card.Text className="surveyViewText text-justify"> {question.question_body}</Card.Text>
                                                        {
                                                            question.answer_option.map((option, index_option) => {
                                                                return (
                                                                    <div key={"map_" + index_option}>
                                                                        <Form.Check inline
                                                                            type={'radio'}
                                                                            value={option}
                                                                            onChange={(event) => {this.handleChange(event, question.id_survey)}}
                                                                            name={question.id_question}
                                                                            id={question.id_question}
                                                                            label={option}
                                                                            className="surveyViewRadioAndLabel"
                                                                        />
                                                                    </div>
                                                                )
                                                            })
                                                        }


                                                    </Card.Body>

                                                </Card>
                                            )
                                        })
                                    }
                                    <input type="submit" value="Enviar" className="surveySubmitBotton " />
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