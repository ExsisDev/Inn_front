import React from 'react';
import { Col, Row, Container, Image, Button, Card } from 'react-bootstrap';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import LogoProposing from '../../images/EmpresaB.png';
import './AssignedProposalDetails.css';

class AssignedProposalDetails extends React.Component {
   constructor() {
      super();
      this.state = {
         disabledFinishButton : true
      };
   }

   render() {

      return (
         <Container fluid className="d-flex justify-content-center">
            <Row className="h-100 d-flex justify-content-center">
               <Col sm={11} className="d-flex flex-column align-items-center">
                  <BackNavigator />
                  <Row className="h-100 d-flex justify-content-center align-items-center my-4">
                     <Col className="">
                        <Card className="formBox proposalFormCardBox pb-4">
                           <Card.Body className="pr-lg-5">
                              <Row className="mx-0">
                                 <Col lg={2} className="px-0 d-flex justify-content-center">
                                    <div className="proposalFormImageBox rounded-circle d-flex align-items-center">
                                       <Image src={LogoProposing} className="proposalFormImage" />
                                    </div>
                                 </Col>
                                 <Col lg={10} className="d-flex flex-column justify-content-center">
                                    <Row className="mx-0 mt-2">
                                       <Col className="px-0">
                                          <Card.Title className="challengeDetailsName text-center text-md-center text-lg-left">
                                             <b >{this.props.location.state.challengeName}</b>
                                          </Card.Title>
                                       </Col>
                                    </Row>
                                    <Row className="mx-0">
                                       <Col className="px-0">
                                          <Card.Text className="text-justify mb-3">
                                             <i className="assignedProposalDetailsCompanyDescription"> {this.props.location.state.companyDescription}</i>
                                          </Card.Text>
                                       </Col>
                                    </Row>
                                 </Col>
                              </Row>
                              <Row className="mx-0">
                                 <Col className="offset-lg-2 text-left">
                                    <span className="assignedProposalDetailsHeaders">Descripción de la solución:</span>
                                 </Col>
                              </Row>
                              <Row className="mx-0">
                                 <Col className="offset-lg-2 py-2 text-justify">
                                    <span className="pl-2 text-small d-inline-block">{this.props.location.state.proposalData.solution_description}</span>
                                 </Col>
                              </Row>
                              <Row className="mx-0 mt-3">
                                 <Col className="offset-lg-2 text-left">
                                    <span className="assignedProposalDetailsHeaders">Nuestra solución y recursos:</span>
                                 </Col>
                              </Row>
                              <Row className="mx-0">
                                 <Col className="offset-lg-2 py-2 text-justify">
                                    <span className="pl-2 text-small d-inline-block">{this.props.location.state.proposalData.resources_description}</span>
                                 </Col>
                              </Row>
                              <Row className="mx-0">
                                 <Col className="offset-lg-2 py-2 text-left text-small">
                                    <h6 className="trackAssigmentSubTitle d-inline">Categorías: </h6>
                                    <i className="w-auto challengeCardHashTags d-inline">{this.props.location.state.categories.map((item) => { return (`#${item.split(' ').map(a => a.trim()).map(a => a[0].toUpperCase() + a.substring(1)).join("")} `) })}</i>
                                 </Col>
                              </Row>
                              <Row className="mx-0 mt-3">
                                 <Col className="offset-lg-2 py-2 text-left">
                                    <h6 className="trackAssigmentSubTitle mb-3">Notas: </h6>
                                    <Row className="mx-0">
                                       <Col>
                                          <div class="form-group shadow-textarea">
                                             <label for="textArea1" className="assignedProposalDetailsLabelBox">Notas sesión I</label>
                                             <textarea class="assignedProposalDetailsLabelTextArea form-control z-depth-1" id="textArea1" disabled value="asdasdasdaasdasdasdaasdasdasdaasdasdasdaasdasdasdaasdasdasdaasdasdasdaasdasdasdaasdasdasdaasdasdasda"></textarea>
                                          </div>
                                       </Col>
                                    </Row>
                                    <Row className="mx-0">
                                       <Col>
                                          <div class="form-group shadow-textarea">
                                             <label for="textArea2" className="assignedProposalDetailsLabelBox">Notas sesión II</label>
                                             <textarea class="assignedProposalDetailsLabelTextArea form-control z-depth-1" id="textArea2" disabled value="asdasdasdaasdasdasdaasdasdasdaasdasdasdaasdasdasdaasdasdasdaasdasdasdaasdasdasdaasdasdasdaasdasdasda"></textarea>
                                          </div>
                                       </Col>
                                    </Row>
                                    <Row className="mx-0">
                                       <Col>
                                          <div class="form-group shadow-textarea">
                                             <label for="textArea3" className="assignedProposalDetailsLabelBox assignedProposalDetailsNewNote">Nueva Nota</label>
                                             <textarea class="assignedProposalDetailsLabelTextArea form-control z-depth-1" id="textArea3"></textarea>
                                          </div>
                                       </Col>
                                    </Row>
                                    <Row className="mx-0">
                                       <Col className="d-flex justify-content-end">
                                          <Button id="assignedProposalDetailsAggregateNoteBtn">Añadir Nota</Button>
                                       </Col>
                                    </Row>
                                 </Col>
                              </Row>
                              <Row className="mx-0">
                                 <Col className="offset-lg-2 py-2 text-left">
                                    <Row className="mx-0">
                                       <Col>
                                          <label for="textArea4" className="trackAssigmentSubTitle">Comentarios: </label>
                                          <textarea class="form-control z-depth-1" id="textArea4" rows="4"></textarea>
                                       </Col>
                                    </Row>
                                 </Col>
                              </Row>
                              <Row className="mx-0">
                                 <Col className="offset-lg-2 py-2 text-left">
                                    <Row className="mx-0 mt-4">
                                       <Col className="d-flex justify-content-center">
                                          <Button id="assignedProposalDetailsAggregateNoteBtn" className="assignedProposalDetailsFinishBtn" disabled={this.state.disabledFinishButton}>Finalizar reto</Button>
                                       </Col>
                                    </Row>
                                 </Col>
                              </Row>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
               </Col>
            </Row>
         </Container>
      );
   }
}

export default AssignedProposalDetails;