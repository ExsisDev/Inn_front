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
            count_questions:0,
            array_answers: [],
            token: getToken()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    // questions_test = [
    //     {
    //         question_body: "De acuerdo con la propuesta recibida inicialmente, ¿crees que la propuesta fue la manera maás adecuada de proceder con tu reto?",
    //         answer_option: ["Si", "No"],
    //         id_question: 3,
    //         id_survey: 5
    //     },
    //     {
    //         question_body: "¿Cómo clasificarias el servicio presentado por la empresa que realizo el reto que propusiste?",
    //         answer_option: ["Muy Satisfecho", "Puede mejorar", "Insatisfecho", "Trsite", "Contento"],
    //         id_question: 4,
    //         id_survey: 5
    //     }
    // ]

    componentDidMount(){
        // this.getQuestionData();
    }

    async getQuestionData(){
        const URL = `${process.env.REACT_APP_BACK_URL}/surveys/${this.props.location.state.idChallenge}`;
        const token= this.state.token;
        await axios.get(URL,{
            headers: { 'x-auth-token': `${token}` }
        })
        .then( (result) => {
            console.log(result);
            
            // if(result.data){
            //     this.setState({
            //        all_questions: result.data,
            //        count_questions: result.data.length
            //     });
            // }

        }).catch((error) => {
            this.setState({all_questions:[], count_questions: 0});
        });
    }

    handleSubmit(e) {
        debugger;
        let URL=`${process.env.REACT_APP_BACK_URL}/surveys`;
        const token= this.state.token;
        const answer_object_array = this.state.array_answers;
        axios.post(URL, answer_object_array, {
            headers: { 'x-auth-token': `${token}` }
         }).then((result)=>{
            
        }).catch((error) => {

        });
       alert("Se envio la información");
       console.log(answer_object_array);
       
    }

    async handleChange(e) {
        var answer_temp = e.currentTarget.value;
        var id_q_temp = e.currentTarget.name;
        var flag= false;
        await this.setState((state) => {
            let oldArray = state.array_answers;
            
            oldArray.find((answer_item) => {
                if( answer_item.id_q === id_q_temp ){
                    answer_item.answer = answer_temp;
                    flag=true;
                    return flag;
                }
                
                return flag;
            })
            
            let newArray = flag===false ? oldArray.concat([{ id_q: id_q_temp, answer: answer_temp }]) : oldArray;
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
                                        this.state.all_questions.map(async (question, index) => {
                                            return (
                                                <Card key={"map_" + index} className="surveysViewCard mb-4">
                                                    <Card.Body>
                                                        <Card.Title className="text-left mb-2">Pregunta {(index + 1)}</Card.Title>
                                                        <Card.Text className="surveyViewText text-justify"> {question.question_body}</Card.Text>
                                                        {
                                                            question.answer_option.map((option, index_option) => {
                                                                return (
                                                                    <div key={"map_" + index_option} className="surveyViewRadio form-check form-check-inline">
                                                                        <input type="radio"
                                                                            value={option}
                                                                            onChange={this.handleChange}
                                                                            name={'question_' + question.id_question}
                                                                            className="surveyViewRadio form-check-input"
                                                                            id={"answer_" + index_option}>
                                                                        </input>
                                                                        <label className="survayViewRadio form-check-label" htmlFor="inlineRadio1">{option}</label>
                                                                    </div>
                                                                )
                                                            })
                                                        }


                                                    </Card.Body>

                                                </Card>
                                            )
                                        })
                                    }
                                    <input type="submit" value="Enviar" className="surveySubmitBotton"/>
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