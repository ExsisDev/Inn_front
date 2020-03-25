import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import alertIcon from '../../images/PropuestasAsignadas.png';
import LogoProposing from '../../images/EmpresaB.png';
import LogoAlly from '../../images/EmpresaA.png';
import { getToken } from "../../commons/tokenManagement";
import "./ChallengeAssignedDetails.css";

class ChallengeAssignedDetails extends Component {

   constructor() {
      super();
      this.state = {
         token: getToken(),
         solutionDescription: "",
         idChallenge: 0,
         loadingNotes: true,
         allNotes: []
      }
   }


   componentDidMount() {
      this.getProposalAssignedByChallenge(this.props.location.state.idChallenge);
   }


   async getProposalAssignedByChallenge(idChallenge) {
      let url = `${process.env.REACT_APP_BACK_URL}/proposals/proposalAssigned/${idChallenge}`;
      const token = this.state.token;

      await axios.get(url, {
         headers: { 'x-auth-token': `${token}` }
      }).then((result) => {
         if (result.data) {
            console.log(result.data)
            this.setState({
               solutionDescription: result.data[0].solution_description,
               idChallenge: result.data[0].fk_id_challenge
            });
         }
      }).catch((error) => {
         this.setState({ proposal: {} });
      })

      await this.getAllNotes();
   }


   async getAllNotes() {
      let URL = `${process.env.REACT_APP_BACK_URL}/notes/${this.state.idChallenge}`;
      const token = this.state.token;
      await this.setState({ loading_notes: true });


      await axios.get(URL, {
         headers: { 'x-auth-token': `${token}` }

      }).then((result) => {
         if (result.data) {
            this.setState({ allNotes: result.data, loadingNotes: false });
         }
      }).catch((error) => {
         this.setState({ allNotes: [], loadingNotes: false });
      });

   }


   render() {

      if (!this.props.location.state) {
         return (
            <Redirect to="/home" />
         );
      }

      return (
         <Container fluid className="d-flex justify-content-center">
            <Row className="h-100 d-flex justify-content-center">
               <Col sm={11} className="d-flex flex-column align-items-center">
                  <BackNavigator />
                  <SectionTitle titleProps={{ img: alertIcon, imgAlt: 'alert', text: 'Reto en Desarrollo' }} />
                  <Row className="d-fex justify-content-center">
                     <Col className="p-0">
                        <div className="formBox">
                           <Row className="m-0 d-flex justify-content-center">
                              <Col xs={9} className="challengeAssignedDetailsPadding">
                                 <Row className="mx-0 my-4 justify-content-center">
                                    <Col md="4" className="d-flex flex-column align-items-center" >
                                       <div className="trackAssignmentImageCenterRounded rounded-circle d-flex align-items-center">
                                          <Image src={LogoProposing} className="trackAssignmentImage" />
                                       </div>
                                       <h5 className="trackAssigmentCompanyTitle my-3">Empresa Proponente</h5>
                                    </Col>
                                    <Col md="4" className="d-flex flex-column align-items-center" >
                                       <div className="trackAssignmentImageCenterRounded rounded-circle d-flex align-items-center">
                                          <Image src={LogoAlly} className="trackAssignmentImage" />
                                       </div>
                                       <h5 className="trackAssigmentCompanyTitle my-3">Empresa Aliada</h5>
                                    </Col>
                                 </Row>
                                 <Row className="mx-0 text-left">
                                    <h6 >Descripción: </h6>
                                    <p className="text-small">{this.state.solutionDescription}</p>
                                 </Row>
                                 <Row className="mx-0 mt-3">
                                    <h6 className="trackAssigmentSubTitle mb-3 text-left">Notas de la empresa aliada: </h6>
                                    {
                                       this.state.loadingNotes ?
                                          (
                                             <div className="d-flex justify-content-center flex-grow-1">
                                                <ReactLoading className="d-flex align-items-center allChallengesSvgContainer" type={"spokes"} color={"#313333"} />
                                             </div>
                                          )
                                          :
                                          (
                                             <div>
                                                {this.state.allNotes === [] ?
                                                   (
                                                      <h6 className="mb-3">No se encontraron elementos</h6>
                                                   )
                                                   :
                                                   (
                                                      this.state.allNotes.map((item, index) => {
                                                         return (
                                                            <Row key={item.note_header + index} className="mx-0 mt-3">
                                                               <Col className="px-0">
                                                                  <div className="form-group shadow-textarea text-left">
                                                                     <label htmlFor="textArea1" className="assignedProposalDetailsLabelBox">{item.note_header}</label>
                                                                     <textarea className="assignedProposalDetailsLabelTextArea form-control z-depth-1" id="textArea1" disabled value={item.note_content}></textarea>
                                                                  </div>
                                                               </Col>
                                                            </Row>
                                                         )
                                                      })
                                                   )
                                                }
                                             </div>
                                          )
                                    }
                                 </Row>
                              </Col>
                           </Row>
                        </div>
                     </Col>
                  </Row>
               </Col>
            </Row>
         </Container>

      )
   }
}

export default ChallengeAssignedDetails
