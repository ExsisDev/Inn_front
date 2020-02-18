import React from "react";
import axios from 'axios';
import { Col, Card, Row, Container, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

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
            loadingQuestions: true,
            token: getToken()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    toastConfiguration = {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
        containerId: 'A'
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
                let newArray = result.data.slice();
                if (newArray) {
                    this.setState({
                        loadingQuestions: false,
                        all_questions: newArray
                    });
                }
            }).catch((error) => {
                this.setState({ all_questions: [], loadingQuestions: false });
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        let URL = `${process.env.REACT_APP_BACK_URL}/surveys`;
        const token = this.state.token;
        const answer_object_array = this.state.array_answers;
        axios.put(URL, answer_object_array, {
            headers: { 'x-auth-token': `${token}` }
        }).then((result) => {
            this.setState({ redirect: true });
            this.notifySuccess("La encuesta fue enviada");
        }).catch((error) => {
            this.notifyError("La encuesta no pudo ser enviada ");
        });
    }

    async handleChange(e, fk_id_survey) {
        var answer_temp = e.currentTarget.value;
        var id_q_temp = e.currentTarget.name;
        var flag = false;
        this.setState((state) => {
            let oldArray = state.array_answers;

            oldArray.find((answer_item) => {
                if (answer_item.fk_id_question === id_q_temp) {
                    answer_item.answer = answer_temp;
                    flag = true;
                }
            });

            let newArray = flag ? oldArray : oldArray.concat([{ fk_id_survey, fk_id_question: id_q_temp, answer: answer_temp }]);
            return { array_answers: newArray };
        })
    }

    /**
	 * Toast de error
	 */
    notifyError = (errorMessage) => toast.error(errorMessage, this.toastConfiguration);

    /**
	 * Toast de exito
	 */
    notifySuccess = (successMessage) => toast.success(successMessage, this.toastConfiguration);


    render() {
        if (!this.props.location.state || this.state.redirect) {
            return (
                <Redirect to="/home" />
            );
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
                                {
                                    this.state.loadingQuestions ?
                                        (
                                            <div className="d-flex justify-content-center flex-grow-1">
                                                <ReactLoading className="d-flex align-items-center allChallengesSvgContainer" type={"spokes"} color={"#313333"} />
                                            </div>

                                        )
                                        :
                                        (
                                            <div>
                                                {
                                                    this.state.all_questions.length === 0 ?
                                                        (
                                                            <h3 className="mb-5">No se encontraron elementos</h3>
                                                        )
                                                        :
                                                        (

                                                            (
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
                                                                                                            required
                                                                                                            type={'radio'}
                                                                                                            value={option}
                                                                                                            onChange={(event) => { this.handleChange(event, question.id_survey) }}
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
                                                                    <input type="submit" value="Enviar" className="surveySubmitBotton" />
                                                                </Form>
                                                            )


                                                        )
                                                } </div>
                                        )
                                }

                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container >
        )
    }
}

export default SurveysView;