import React from "react";
import { Col, Card, Row, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import './SendedOrRejectedProposalDetails.css';

const SendedOrRejectedProposalDetails = (props) => {

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
                     <Card className="formBox proposalFormCardBox py-3">
                        <Card.Body className="pr-lg-5">
                           <Row className="mx-0">
                              <Col className="offset-lg-2">
                                 <Card.Title className="challengeDetailsName text-center text-md-center text-lg-left">
                                    <b>{props.location.state.challengeName}</b>
                                 </Card.Title>
                              </Col>
                           </Row>
                           <Row className="mx-0">
                              <Col className="offset-lg-2">
                                 <Card.Text className="text-justify">
                                    <i className="proposalFormHeaderText">{props.location.state.companyDescription}</i>
                                 </Card.Text>
                              </Col>
                           </Row>
                           <Row className="mx-0 my-3">
                              <Col className="offset-lg-2 text-left">
                                 <span><b>Descripción de la solución:</b></span>
                              </Col>
                           </Row>
                           <Row className="mx-0">
                              <Col className="offset-lg-2 formInput backgndColor py-2 text-justify">
                                 <span>{props.location.state.proposalData.solution_description}</span>
                              </Col>
                           </Row>
                           <Row className="mx-0 my-3">
                              <Col className="offset-lg-2 text-left">
                                 <span><b>Nuestra solución y recursos:</b></span>
                              </Col>
                           </Row>
                           <Row className="mx-0">
                              <Col className="offset-lg-2 formInput backgndColor py-2 text-justify">
                                 <span>{props.location.state.proposalData.resources_description}</span>
                              </Col>
                           </Row>
                        </Card.Body>
                     </Card>
                     <Row>
                        <Col>
                           {(() => {
                              if (props.location.state.proposalData.proposal_state_name === "SEND") {
                                 return (
                                    <div>
                                       <span className="sendedOrRejectedProposalDetailsGreenNotification">
                                          Propuesta en proceso de revisión
                                       </span>
                                    </div>
                                 );
                              } else {
                                 return (
                                    <div >
                                       <span className="sendedOrRejectedProposalDetailsRedNotification">
                                          Propuesta rechazada
                                       </span>
                                    </div>
                                 );
                              }
                           })()}
                        </Col>
                     </Row>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Container >
   );

}
export default SendedOrRejectedProposalDetails;