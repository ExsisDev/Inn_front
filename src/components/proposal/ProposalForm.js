import React from 'react';
import { Col, Card, Row, Container, Form, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

import { PROPOSAL_STATE } from '../../commons/enums';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import NumberArrowUpDown from '../utilities/numberArrowUpDown/NumberArrowUpDown';
import { getToken } from '../../commons/tokenManagement';
import LogoProposing from '../../images/EmpresaB.png';
import './ProposalForm.css';


class ProposalForm extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         experimentationHours: 1,
         maxExperimentationHours: 1,
         ideationHours: 1,
         maxIdeationHours: 1,
         description: "",
         resources: "",
         isLoading: false,
         redirect: false,
         idAlly: 0,
         token: getToken()
      }

      this.toastConfiguration = {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         closeButton: false,
         containerId: 'A'
      }

   }


   componentDidMount() {
      this.getHoursOfAlly();
      this.getCurrentAlly();
   }


   /**
    * Controla la flecha arriba de las horas de ideación
    * @param {Event} e 
    */
   handleUpIdeationArrow = (e) => {
      this.setState((state, props) => (
         state.ideationHours < state.maxIdeationHours &&
         { ideationHours: state.ideationHours + 1 }
      ));
   }


   /**
    * Controla la flecha abajo de las horas de ideación
    * @param {Event} e 
    */
   handleDownIdeationArrow = (e) => {
      this.setState((state, props) => (
         state.ideationHours > 1 &&
         { ideationHours: state.ideationHours - 1 }
      ));
   }


   /**
    * Controla la flecha arriba de las horas de experimentación
    * @param {Event} e 
    */
   handleUpExperimentationArrow = (e) => {
      this.setState((state, props) => (
         state.experimentationHours < state.maxExperimentationHours &&
         { experimentationHours: state.experimentationHours + 1 }
      ));
   }


   /**
    * Controla la flecha abajo de las horas de experimentación
    * @param {Event} e 
    */
   handleDownExperimentationArrow = (e) => {
      this.setState((state, props) => (
         state.experimentationHours > 1 &&
         { experimentationHours: state.experimentationHours - 1 }
      ));
   }


   /**
    * Obtener el aliado actual
    */
   getCurrentAlly() {
      const url = `${process.env.REACT_APP_BACK_URL}/allies/me`;
      axios.get(url, {
         headers: { 'x-auth-token': `${this.state.token}` }
      }).then((result) => {
         this.setState({ idAlly: result.data.id_ally });
      }).catch((error) => {
         throw error;
      });
   }

   /**
    * Crear un nueva propuesta para el reto
    * @param {Object} newProposal 
    */
   handleSubmition = async (e) => {
      e.preventDefault();

      if (!this.state.description || !this.state.resources) {
         this.notifyError("Por favor completa los campos");
         return;
      }

      await this.setState({ isLoading: true });

      let newProposal = {
         fk_id_challenge: this.props.location.state.idChallenge,
         fk_id_ally: this.state.idAlly,
         fk_id_proposal_state: PROPOSAL_STATE.SEND,
         ideation_hours: this.state.ideationHours,
         experimentation_hours: this.state.experimentationHours,
         solution_description: this.state.description,
         proposal_resources: this.state.resources
      }

      let url = `${process.env.REACT_APP_BACK_URL}/proposals`;

      await axios.post(url, newProposal, {
         headers: { 'x-auth-token': `${this.state.token}` }

      }).then((result) => {
         this.notifySuccess("Propuesta creada");
         setTimeout(() => {
            this.setState({ redirect: true });
         }, 2000);

      }).catch((error) => {
         typeof error.response.data === "object" ? this.notifyError("No se pudo crear la propuesta") : this.notifyError(error.response.data);

      });

      await this.setState({ isLoading: false });
   }


   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }


   /**
    * Obtener las horas de ideación y de experimentación del aliado dado el token actual
    */
   async getHoursOfAlly() {
      let url = `${process.env.REACT_APP_BACK_URL}/allies/me`;

      await axios.get(url, {
         headers: { 'x-auth-token': `${this.state.token}` }
      })
         .then(res => {
            this.setState({
               maxIdeationHours: res.data.ally_challenge_ideation_hours,
               maxExperimentationHours: res.data.ally_challenge_experimentation_hours,
            });
         })
         .catch(error => {
         });
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
      if (this.state.redirect) {
         return (
            <Redirect to="/home/sendedProposals" />
         )
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
                                 <Col lg={2} className="px-0 d-flex justify-content-center">
                                    <div className="proposalFormImageBox rounded-circle d-flex align-items-center">
                                       <Image src={LogoProposing} className="proposalFormImage" />
                                    </div>
                                 </Col>
                                 <Col lg={10}>
                                    <Row className="mx-0 mt-2">
                                       <Col className="px-0">
                                          <Card.Title className="challengeDetailsName text-center text-md-center text-lg-left">
                                             <b>{this.props.location.state.challengeName}</b>
                                          </Card.Title>
                                       </Col>
                                    </Row>
                                    <Row className="mx-0">
                                       <Col className="px-0">
                                          <Card.Text className="text-justify">
                                             <i className="proposalFormHeaderText"> Vas a aplicar a este reto con tu propia solución del problema, completa los siguientes campos para continuar</i>
                                          </Card.Text>
                                       </Col>
                                    </Row>
                                 </Col>
                              </Row>
                              <Form className="" onSubmit={this.handleSubmition}>
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