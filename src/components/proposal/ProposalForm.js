import React from 'react';
import { Col, Card, Row, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import NumberArrowUpDown from '../utilities/numberArrowUpDown/NumberArrowUpDown';
import { getToken, getTokenData } from '../../commons/tokenManagement';
import './ProposalForm.css';


class ProposalForm extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         experimentationHours: 1,
         maxExperimentationHours: 1,
         ideationHours: 1,
         maxIdeationHours: 1,
         token: getToken()
      }

      this.handleUpIdeationArrow = this.handleUpIdeationArrow.bind(this);
      this.handleDownIdeationArrow = this.handleDownIdeationArrow.bind(this);
      this.handleUpExperimentationArrow = this.handleUpExperimentationArrow.bind(this);
      this.handleDownExperimentationArrow = this.handleDownExperimentationArrow.bind(this);
   }


   componentDidMount() {
      let idAlly = getTokenData(this.state.token).id_user;
      this.getHoursOfAlly(idAlly);
   }


   handleUpIdeationArrow(e) {
      this.setState((state, props) => (
         state.ideationHours < 10 &&
         { ideationHours: state.ideationHours + 1 }
      ));
   }


   handleDownIdeationArrow(e) {
      this.setState((state, props) => (
         state.ideationHours > 0 &&
         { ideationHours: state.ideationHours - 1 }
      ));
   }


   handleUpExperimentationArrow(e) {
      this.setState((state, props) => (
         state.experimentationHours < 10 &&
         { experimentationHours: state.experimentationHours + 1 }
      ));
   }


   handleDownExperimentationArrow(e) {
      this.setState((state, props) => (
         state.experimentationHours > 0 &&
         { experimentationHours: state.experimentationHours - 1 }
      ));
   }


   async getHoursOfAlly(idAlly) {
      let url = `${process.env.REACT_APP_BACK_URL}/allies/${idAlly}`;

      await axios.get(url, {
         headers: { 'x-auth-token': `${this.state.token}` }
      })
         .then(res => {
            this.setState({
               maxIdeationHours: res.data.ally_month_ideation_hours,
               maxExperimentationHours: res.data.ally_month_experimentation_hours,
            });
         })
         .catch(error => {
            console.log(error);
         });
   }


   render() {
      return (
         <Container fluid className="d-flex justify-content-center">
            <Row className="h-100 d-flex justify-content-center">
               <Col sm={11} className="d-flex flex-column align-items-center">
                  <BackNavigator />
                  <Row className="h-100 d-flex justify-content-center align-items-center my-4">
                     <Col className="">
                        <Card className="formBox proposalFormCardBox">
                           <Card.Body className="pr-lg-5">
                              <Row className="mx-0">
                                 <Col className="offset-lg-2">
                                    <Card.Title className="challengeDetailsName text-center text-md-center text-lg-left">
                                       <b>{this.props.location.state.challengeName}</b>
                                    </Card.Title>
                                 </Col>
                              </Row>
                              <Row className="mx-0">
                                 <Col className="offset-lg-2">
                                    <Card.Text className="text-justify">
                                       <i className="proposalFormHeaderText"> Vas a aplicar a este reto con tu propia solución del problema, completa los siguientes campos para continuar</i>
                                    </Card.Text>
                                 </Col>
                              </Row>
                              <Form className="mt-4">
                                 <Form.Row>
                                    <Form.Group as={Col} style={{ paddingLeft: '15px' }} controlId="proposalFormInput1" className="offset-lg-2">
                                       <Form.Label className="proposalFormInputLabels text-left">
                                          Descripción de la solución:
                                       </Form.Label>
                                       <Form.Control as="textarea" className="formInput proposalFormTextArea">
                                       </Form.Control>
                                    </Form.Group>
                                 </Form.Row>
                                 <Form.Row>
                                    <Form.Group as={Col} style={{ paddingLeft: '15px' }} controlId="proposalFormInput2" className="offset-lg-2">
                                       <Form.Label className="proposalFormInputLabels text-left">
                                          Recursos adicionales requeridos:
                                       </Form.Label>
                                       <Form.Control as="textarea" className="formInput proposalFormTextArea">
                                       </Form.Control>
                                    </Form.Group>
                                 </Form.Row>
                                 <Form.Row >
                                    <Form.Group as={Col} lg={{ span: 3, offset: 3 }} className="align-items-baseline proposalFormGreen" controlId="ideaHours">
                                       <Form.Label className="mb-0">
                                          <NumberArrowUpDown handleUpArrow={this.handleUpIdeationArrow} handleDownArrow={this.handleDownIdeationArrow} hours={this.state.ideationHours} />
                                       </Form.Label>
                                       <Form.Label>
                                          <i>Horas de ideación</i>
                                       </Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} lg="3" className="align-items-baseline proposalFormOrange" controlId="ideaHours">
                                       <Form.Label className="mb-0">
                                          <NumberArrowUpDown handleUpArrow={this.handleUpExperimentationArrow} handleDownArrow={this.handleDownExperimentationArrow} hours={this.state.experimentationHours} />
                                       </Form.Label>
                                       <Form.Label>
                                          <i>Horas de experimentación</i>
                                       </Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} lg="3" className="d-flex align-items-end justify-content-end">
                                       <Button variant="link" type="submit" className="w-auto blueLink">Siguiente</Button>
                                    </Form.Group>
                                 </Form.Row>
                              </Form>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
               </Col>
            </Row>
         </Container >
      );
   }

}

export default ProposalForm;