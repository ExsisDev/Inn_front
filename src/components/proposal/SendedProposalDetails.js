import React from "react";
import { Col, Card, Row, Container, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import './SendedProposalDetails.css';

const SendedProposalDetails = (props) => {

   if (!props.location.state) {
      return (
         <Redirect to="/home" />
      );
   }
   
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

                                 </Card.Title>
                              </Col>
                           </Row>
                           {/*<Row className="mx-0">
                                 <Col className="offset-lg-2">
                                    <Card.Text className="text-justify">
                                    </Card.Text>
                                 </Col>
                              </Row>
                              <Form className="mt-4" onSubmit={this.handleSubmition}>
                                 <Form.Row>
                                    <Form.Group as={Col} style={{ paddingLeft: '15px' }} controlId="proposalFormInput1" className="offset-lg-2">
                                       <Form.Label className="proposalFormInputLabels text-left">
                                          Descripción de la solución:
                                          </Form.Label>
                                       <Form.Control as="textarea" className="formInput proposalFormTextArea" name="description" onChange={this.handleChange}>
                                       </Form.Control>
                                    </Form.Group>
                                 </Form.Row>
                                 <Form.Row>
                                    <Form.Group as={Col} style={{ paddingLeft: '15px' }} controlId="proposalFormInput2" className="offset-lg-2">
                                       <Form.Label className="proposalFormInputLabels text-left">
                                          Recursos adicionales requeridos:
                                          </Form.Label>
                                       <Form.Control as="textarea" className="formInput proposalFormTextArea" name="resources" onChange={this.handleChange}>
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
                                       <Button variant="link" type="submit" className="w-auto blueLink" disabled={this.state.isLoading}>
                                          {this.state.isLoading ? "Enviando..." : "Siguiente"}
                                       </Button>
                                    </Form.Group>
                                 </Form.Row>
                              </Form> */}
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Container >
   );

}
export default SendedProposalDetails;