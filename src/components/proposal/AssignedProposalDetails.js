import React from 'react';
import axios from 'axios';
import { Col, Row, Container, Image, Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import { CHALLENGE_STATE, PROPOSAL_STATE } from '../../commons/enums';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import LogoProposing from '../../images/EmpresaB.png';
import './AssignedProposalDetails.css';
import { getToken } from '../../commons/tokenManagement';

class AssignedProposalDetails extends React.Component {
   constructor() {
      super();
      this.state = {
         showCompleteForm: true,
         all_notes: [],
         count_notes: 0,
         loadingNotes: true,
         creatingNewNote: false,
         showAddComment: false,
         noteBody: "",
         finalComment: "",
         redirect: false,
         token: getToken()
      };

      this.handleFinishButton = this.handleFinishButton.bind(this);
      this.createNewNote = this.createNewNote.bind(this);
      this.updateChallengeAndProposal = this.updateChallengeAndProposal.bind(this);
      this.getFinalComment = this.getFinalComment.bind(this);
      this.newNoteArea = React.createRef();
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
      if (this.props.location.pathname === "/home/challengesFinished/details") {
         this.setState({ showCompleteForm: false })
      }
      this.getNotesByChallenges();
      this.getFinalComment();
   }


   getFinalComment() {
      let URL = `${process.env.REACT_APP_BACK_URL}/challenges/finalComment/${this.props.location.state.idChallenge}`;
      const token = this.state.token;

      axios.get(URL, {
         headers: { 'x-auth-token': `${token}` }
      }).then((result) => {
         if (result.data) {
            this.setState({ finalComment: result.data });
         }
      }).catch((error) => {

      });

   }


   async getNotesByChallenges() {
      let URL = `${process.env.REACT_APP_BACK_URL}/notes/${this.props.location.state.idChallenge}`;
      const token = this.state.token;
      await this.setState({ loading_notes: true });


      await axios.get(URL, {
         headers: { 'x-auth-token': `${token}` }

      }).then((result) => {
         if (result.data) {
            this.setState({ all_notes: result.data, count_notes: result.data.length, loadingNotes: false });
         }
      }).catch((error) => {
         this.setState({ all_notes: [], loadingNotes: false });
      });

   }


   async createNewNote(e) {
      if (this.state.noteBody === "") {
         this.notifyError("No puede estar vacía la nueva nota");
         return;
      }

      let URL = `${process.env.REACT_APP_BACK_URL}/notes`;
      const token = this.state.token;

      let newNote = {
         fk_id_challenge: this.props.location.state.idChallenge,
         note_content: this.state.noteBody,
         note_header: "Notas Sesión " + (this.state.count_notes + 1)
      }

      await this.setState((state, props) => {
         let count = state.count_notes + 1;
         return {
            count_notes: count,
            creatingNewNote: true
         }
      })

      await axios.post(URL, newNote, {
         headers: { 'x-auth-token': `${token}` }
      }).then((result) => {
         if (result.data) {
            this.setState((state, props) => {
               let allNotesOld = state.all_notes;
               let allNotesNew = allNotesOld.concat([result.data])
               return {
                  all_notes: allNotesNew,
                  creatingNewNote: false
               };
            });

         }
      }).catch((error) => {

      });

      this.newNoteArea.current.value = "";
      await this.setState({ noteBody: "" });
   }


   updateComment() {
      let URL = `${process.env.REACT_APP_BACK_URL}/challenges/${this.props.location.state.idChallenge}`;
      const token = this.state.token;

      let newComment = {
         final_comment: this.state.finalComment
      };

      return axios.put(URL, newComment, {
         headers: { 'x-auth-token': `${token}` }
      }).then((response) => {
      }).catch((error) => {

      })
   }


   async updateChallengeAndProposal() {
      let URL_CHALLENGE = `${process.env.REACT_APP_BACK_URL}/challenges/${this.props.location.state.idChallenge}`;
      let URL_PROPOSAL = `${process.env.REACT_APP_BACK_URL}/proposals/${this.props.location.state.idChallenge}/${this.props.location.state.proposalData.fk_id_ally}`;

      const token = this.state.token;

      let challengeUpdate = {
         fk_id_challenge_state: CHALLENGE_STATE.FINISHED
      };

      let proposalUpdate = {
         fk_id_proposal_state: PROPOSAL_STATE.FINISHED
      }

      await axios.put(URL_CHALLENGE, challengeUpdate, {
         headers: { 'x-auth-token': `${token}` }
      }).then((response) => {
      }).catch((error) => {

      });

      await axios.put(URL_PROPOSAL, proposalUpdate, {
         headers: { 'x-auth-token': `${token}` }
      }).then((response) => {
      }).catch((error) => {

      });
   }


   async handleFinishButton(e) {
      e.preventDefault();
      if (this.state.showAddComment) {
         if (this.state.finalComment === "") {
            this.notifyError("Ingresa tus comentarios finales para terminar");
            return;
         }
         if (window.confirm("Deseas finalizar el reto?")) {
            await this.updateComment();
            await this.updateChallengeAndProposal();
            await this.setState({ redirect: true });
         }
      }
      this.setState({ showAddComment: true });
   }


   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
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

      if (!this.props.location.state) {
         return (
            <Redirect to="/home" />
         );
      }

      if (this.state.redirect) {
         return (
            <Redirect to={{
               pathname: "/home/ally/surveys",
               state: {
                  idChallenge: this.props.location.state.idChallenge
               }
            }}
            />
         );
      }


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
                                                {this.state.all_notes === [] ?
                                                   (
                                                      <h6 className="mb-3">No se encontraron elementos</h6>
                                                   )
                                                   :
                                                   (
                                                      this.state.all_notes.map((item, index) => {
                                                         return (
                                                            <Row key={item.note_header + index} className="mx-0">
                                                               <Col className="px-0">
                                                                  <div className="form-group shadow-textarea">
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
                                 </Col>
                              </Row>
                              {
                                 this.state.showCompleteForm ?
                                    (
                                       <div>
                                          <Row className="mx-0 ">
                                             <Col className="offset-lg-2">
                                                <div className="form-group shadow-textarea d-flex flex-column align-items-start">
                                                   <label htmlFor="textArea3" className="assignedProposalDetailsLabelBox assignedProposalDetailsNewNote">Nueva Nota</label>
                                                   <textarea className="assignedProposalDetailsLabelTextArea form-control z-depth-1" name="noteBody" id="textArea3" ref={this.newNoteArea} onChange={this.handleChange}></textarea>
                                                </div>
                                             </Col>
                                          </Row>
                                          <Row className="mx-0">
                                             <Col className="d-flex justify-content-end">
                                                <Button id="assignedProposalDetailsAggregateNoteBtn" onClick={this.createNewNote}>{this.state.creatingNewNote ? "Añadiendo..." : "Añadir Nota"}</Button>
                                             </Col>
                                          </Row>
                                          {
                                             this.state.showAddComment &&
                                             (
                                                <Row className="mx-0">
                                                   <Col className="offset-lg-2 text-left">
                                                      <Row className="mx-0">
                                                         <Col>
                                                            <label htmlFor="textArea4" className="trackAssigmentSubTitle">Comentarios: </label>
                                                            <textarea autoFocus className="form-control z-depth-1 assignedProposalDetailsTextAreaComment" id="textArea4" name="finalComment" rows="4" placeholder="Ingresa tus comentarios antes de terminar" value={this.state.finalComment} onChange={this.handleChange} required></textarea>
                                                         </Col>
                                                      </Row>
                                                   </Col>
                                                </Row>
                                             )
                                          }
                                          <Row className="mx-0 mt-5">
                                             <Col className="d-flex justify-content-end">
                                                <Button id="assignedProposalDetailsAggregateNoteBtn" className="assignedProposalDetailsFinishBtn" onClick={this.handleFinishButton}> {this.state.showAddComment ? 'Terminar' : 'Finalizar reto'}</Button>
                                             </Col>
                                          </Row>
                                       </div>
                                    )
                                    :
                                    (
                                       <div>
                                          <Row className="mx-0 mt-3">
                                             <Col className="offset-lg-2 text-left">
                                                <span className="assignedProposalDetailsHeaders">Comentarios finales:</span>
                                             </Col>
                                          </Row>
                                          <Row className="mx-0">
                                             <Col className="offset-lg-2 py-2 text-justify">
                                                <span className="pl-2 text-small d-inline-block">{this.state.finalComment}</span>
                                             </Col>
                                          </Row>
                                       </div>
                                    )
                              }
                           </Card.Body>
                        </Card>
                     </Col >
                  </Row >
               </Col >
            </Row >
         </Container >
      );
   }


}


export default AssignedProposalDetails;