import React from 'react';
import { Col, Card, Row, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

import { PROPOSAL_STATE } from '../../commons/enums';
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
         description: "",
         resources: "",
         isLoading: false,
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
         fk_id_ally: getTokenData(this.state.token).id_user,
         fk_id_proposal_state: PROPOSAL_STATE.SEND,
         ideation_hours: this.state.ideationHours,
         experimentation_hours: this.state.experimentationHours,
         solution_description: this.state.description,
         proposal_is_assigned: false
      }

      let url = `${process.env.REACT_APP_BACK_URL}/proposals`;

      await axios.post(url, newProposal, {
         headers: { 'x-auth-token': `${this.state.token}` }
      }).then((result) => {
         this.notifySuccess("Propuesta creada");

      }).catch((error) => {
         this.notifyError(error.response.data);

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
               maxIdeationHours: res.data.ally_month_ideation_hours,
               maxExperimentationHours: res.data.ally_month_experimentation_hours,
            });
         })
         .catch(error => {
            console.log(error);
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