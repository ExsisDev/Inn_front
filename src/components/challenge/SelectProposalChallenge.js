import React from 'react';
import {
   Row,
   Card,
   Col,
   Button,
   Container,
   Image,
   InputGroup,
   DropdownButton,
   Dropdown,
   ButtonGroup,
   Form,
   ToggleButton
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { PROPOSAL_STATE } from '../../commons/enums';

import sendIcon from '../../images/PropuestasEnviadas.png';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import LogoProposing from '../../images/EmpresaB.png';
import { getToken, getTokenData } from '../../commons/tokenManagement';
import HumanResourceList from '../utilities/humanResource/HumanResourceList';
import './SelectProposalChallenge.css';

class SelectProposalChallenge extends React.Component {
   constructor(props) {
      super();
      this.state = {
         renderedProposals: [],
         alliesList: [],
         token: getToken(),
         loadingChallenges: true,
         loadingAllies: true,
         loadingResources: true,
         newProposal: false,
         selectProposal: ""
      }
      this.hoursIdea = React.createRef();
      this.hoursExpe = React.createRef();
      this.selectedAlly = React.createRef();
   }


   toastConfiguration = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
      containerId: 'A'
   }

   toastId = null;

   componentDidMount() {
      this.getProposalsByChallenge();
      this.getAllAllies();
   }

   /**
    * Obtener las propuestas por reto
    */
   getProposalsByChallenge() {
      let url = `${process.env.REACT_APP_BACK_URL}/proposals/${this.props.location.state.idChallenge}/send/1`;

      axios.get(url, {
         headers: { 'x-auth-token': `${this.state.token}` }
      }).then((result) => {
         if (result.data) {
            this.setState({ renderedProposals: result.data.result, loadingChallenges: false });
         }
      }).catch((error) => {
         this.setState({ renderedChallenges: [], totalElements: [], loadingChallenges: false });
      });
   };


   /**
    * Obtener todos los aliados
    */
   getAllAllies() {
      let url = `${process.env.REACT_APP_BACK_URL}/allies`;

      axios.get(url, {
         headers: { 'x-auth-token': `${this.state.token}` }
      }).then((result) => {
         if (result.data) {
            this.setState({ alliesList: result.data, loadingAllies: false });
         }
      }).catch((error) => {
         this.setState({ renderedChallenges: [], totalElements: [], loadingChallenges: false });
      });
   }

   /**
    * Manejo de radio buttons de seleccion de propuestas
    */
   handleSelectedProposal = (e) => {
      this.state.newProposal = false;
      if (this.state.selectProposal == e.target.value) {
         this.setState({
            selectProposal: ""
         });
      } else {
         this.setState({
            selectProposal: e.target.value
         });
      }
   }

   /**
    * Manejo de asignación de propuestas al reto
    */
   handleSubmitProposal = async (e) => {
      e.preventDefault();
      
      this.notifyUpdate("Verificando Asignación");
      
      if (this.state.newProposal) {
         let newProposal = {
            fk_id_challenge: this.props.location.state.idChallenge,
            fk_id_ally: parseInt(this.selectedAlly.current.value),
            fk_id_proposal_state: PROPOSAL_STATE.ASSIGNED,
            ideation_hours: parseInt(this.hoursIdea.current.value),
            experimentation_hours: parseInt(this.hoursExpe.current.value),
            solution_description: "Esta es una propuesta de solución para la pesente propuesta generada por el Administrador de sitio.",
            proposal_resources: "El aliado debe establecer los recursos."
         }
         
         let url = `${process.env.REACT_APP_BACK_URL}/proposals`;
         
         await axios.post(url, newProposal, {
            headers: { 'x-auth-token': `${this.state.token}` }
         }).then((result) => {
            this.notifySuccess("Propuesta asignada exitosamente");
         }).catch((error) => {
            this.notifyError(error.response.data);
         });

      } else {
         const url = `${process.env.REACT_APP_BACK_URL}/proposals/${this.props.location.state.idChallenge}/${this.state.selectProposal}`;
         axios.put(url, {}, {
            headers: { 'x-auth-token': `${this.state.token}` }
         }).then(() => {
            this.notifySuccess("Propuesta asignada exitosamente");
            this.getProposalsByChallenge();
         })
         .catch((error) => {
            this.notifyError(error.response.data);
         });
      }
   }

   /**
    * Asignar reto a un aliado arbitrariamente
    */
   addNewProposal = (e) => {
      e.preventDefault();
      this.setState({
         selectProposal: e.target.value,
         newProposal: true
      });
   }

    /*
    *   Notificacion Tosat
    */
   notifyUpdate = (msg) => toast.info(msg, this.toastConfiguration);

   /**
    *  Success Toast
    */
   notifySuccess = (msg) => toast.success(msg, this.toastConfiguration);

   /**
    *  Error Toast
    */
   notifyError = (msg) => toast.error(msg, this.toastConfiguration);

   render() {
      return (
         <Container fluid className="d-flex justify-content-center">
            <Row className="h-100 d-flex justify-content-center">
               <Col sm={11} className="d-flex flex-column align-items-center">
                  <BackNavigator />
                  <SectionTitle titleProps={{ img: sendIcon, imgAlt: 'Plus sign', text: 'Asignar nuevo reto' }} />
                  <Row >
                     <Row className="h-100 d-flex justify-content-center align-items-center my-3">
                        <Col className="">
                           <Card className="formBox challengeDetailsCardBox pr-4">
                              <Card.Body className="px-lg-3 d-flex flex-column justify-content-center">
                                 <Row className="font-italic mx-0">
                                    <Col className="mb-sm-3" lg={2}>
                                       <Row className="mx-0">
                                          <Col className="px-0 d-flex justify-content-center">
                                             <div className="challengeDetailsImageBox rounded-circle d-flex align-items-center">
                                                <Image src={LogoProposing} className="challengeDetailsImage" />
                                             </div>
                                          </Col>
                                       </Row>
                                       <Row className="mx-0">
                                          <Col className="px-0">
                                             <b><i>{this.props.location.state.companyName}</i></b>
                                          </Col>
                                       </Row>
                                    </Col>
                                    <Col lg={10}>
                                       <Row className="mx-0">
                                          <Col className="px-0">
                                             <Card.Title className="challengeDetailsName text-center text-md-center text-lg-left mt-2"><b>{this.props.location.state.challengeName}</b></Card.Title>
                                          </Col>
                                       </Row>
                                       <Card.Text className="challengeDetailsCompanyDescription text-justify">
                                          {this.props.location.state.companyDescription}
                                       </Card.Text>
                                    </Col>
                                 </Row>
                                 <Row sm={10} className="d-flex justify-content-end mt-0 mx-0">
                                    <Col sm={10} >
                                       <Row className={"px-3"}>
                                          <Card.Title className="challengeDetailsName text-center text-md-center text-lg-left mt-2">
                                             <b><i>Descripción:</i></b>
                                          </Card.Title>
                                       </Row>
                                       <Card.Text className="text-justify">
                                          {this.props.location.state.challengeDescription}
                                       </Card.Text>
                                    </Col>
                                 </Row>
                                 <Row sm={10} className="d-flex justify-content-end m-0">
                                    <Col sm={10}>
                                       <Row className={" text-center text-md-center text-lg-left ml-0 my-3"}>
                                          <b><i>Categorías:</i></b>
                                          <i className="w-auto challengeDetailsHashTags">{this.props.location.state.categories.map((item) => { return (`#${item.split(' ').map(a => a.trim()).map(a => a[0].toUpperCase() + a.substring(1)).join("")} `) })}</i>
                                       </Row>
                                    </Col>
                                 </Row>
                                 <Row sm={10} className="d-flex justify-content-end mt-0 mx-0 mb-3">
                                    <Col sm={10}>
                                       <Card.Title className={"text-center text-md-center text-lg-left"}>
                                          <b><i>Propuestas de solución:</i></b>
                                       </Card.Title>
                                    </Col>
                                 </Row>
                                 {/* 
                                    Lista de propuestas del reto                           
                                 */}
                                 {
                                    this.state.loadingChallenges ?
                                       (
                                          <div className="d-flex justify-content-center flex-grow-1">
                                             <ReactLoading className="d-flex align-items-center loadingSvgContainer" type={"spokes"} color={"#313333"} />
                                          </div>
                                       ) :
                                       (
                                          <Form onSubmit={this.handleSubmitProposal}>
                                             <Row>
                                                {
                                                   this.state.renderedProposals.map((proposal) => {
                                                      return (
                                                         <Card className="formBox challengeDetailsCardBox pr-4 mt-4 ml-5 selectProposalCardProp" key={`A${proposal.ally.id_ally}`}>
                                                            <Card.Body className="px-lg-3 d-flex flex-column justify-content-center">
                                                               <Row className="font-italic mx-0">
                                                                  <Col className="mb-sm-3" lg={2}>
                                                                     <Row className="mx-0">
                                                                        <Col className="px-0 d-flex justify-content-center">
                                                                           <div className="challengeDetailsImageBox rounded-circle d-flex align-items-center">
                                                                              <Image src={LogoProposing} className="challengeDetailsImage" />
                                                                           </div>
                                                                        </Col>
                                                                     </Row>
                                                                  </Col>
                                                                  <Col lg={10}>
                                                                     <Row className="mx-0">
                                                                        <Col className="px-0">
                                                                           <Card.Title className="challengeDetailsName text-center text-md-center text-lg-left my-1"><b>{proposal.ally.ally_name}</b></Card.Title>
                                                                        </Col>
                                                                        <Col className="px-0 d-flex justify-content-end align-content-end">
                                                                           <Row sm={9}>
                                                                              <InputGroup as={Col} className="d-flex justify-content-end">
                                                                                 <InputGroup.Radio
                                                                                    value={`${proposal.fk_id_ally}`}
                                                                                    checked={this.state.selectProposal == proposal.fk_id_ally}
                                                                                    onChange={this.handleSelectedProposal}
                                                                                 />
                                                                                 <Form.Label className="w-auto radioText text-center text-md-center text-lg-right my-1">Seleccionar</Form.Label>
                                                                              </InputGroup>
                                                                           </Row>
                                                                        </Col>
                                                                     </Row>
                                                                     <Row className="mx-0">
                                                                        <Col className="px-0" sm="12">
                                                                           <Card.Title className="challengeDetailsName text-center text-md-center text-lg-left my-1"><b>Horas de Ideación: {proposal.ideation_hours}</b></Card.Title>
                                                                        </Col>
                                                                        <Col className="px-0" sm="12">
                                                                           <Card.Title className="challengeDetailsName text-center text-md-center text-lg-left my-1"><b>Horas de Exprerimentacón: : {proposal.experimentation_hours}</b></Card.Title>
                                                                        </Col>
                                                                     </Row>
                                                                  </Col>
                                                               </Row>
                                                               <Row className="mt-4 mx-0">
                                                                  <Col sm={3} md={2} className="d-flex align-items-start justify-content-start text-md-center text-lg-left">
                                                                     <b><i>Descripción:</i></b>
                                                                  </Col>
                                                                  <Col sm={9} md={10} >
                                                                     <Card.Text className="text-justify">
                                                                        {proposal.solution_description}
                                                                     </Card.Text>
                                                                  </Col>
                                                               </Row>
                                                               <Row className="mt-4 mx-0">
                                                                  <Col sm={3} md={2} className="d-flex align-items-start justify-content-start text-md-center text-lg-left">
                                                                     <b><i>Solución:</i></b>
                                                                  </Col>
                                                                  <Col sm={9} md={10} >
                                                                     <Card.Text className="text-justify">
                                                                        {proposal.solution_description}
                                                                     </Card.Text>
                                                                  </Col>
                                                               </Row>
                                                               <Row className="mt-4 mx-0">
                                                                  <Col sm={3} md={2} className="d-flex align-items-start justify-content-start">
                                                                     <b><i>Recursos:</i></b>
                                                                  </Col>
                                                                  <Col sm={12}>
                                                                     {
                                                                        <HumanResourceList cols="3" people={proposal.resources} />
                                                                     }
                                                                  </Col>
                                                               </Row>
                                                            </Card.Body>
                                                         </Card>
                                                      )
                                                   })
                                                }
                                             </Row>
                                             <Row className={"mt-4 mx-0"}>
                                                <Col sm={4}>
                                                   <Card.Title className={"text-center text-md-center text-lg-center"}>
                                                      <b><i>Asignar A:</i></b>
                                                   </Card.Title>
                                                   <Row className={"mx-2 px-5"}>
                                                      <Form.Control as="select"
                                                         onChange={this.addNewProposal}
                                                         className="formSelect backgndColor"
                                                         defaultValue="default"
                                                         ref={this.selectedAlly}
                                                      >
                                                         <option disabled value="default">Aliados</option>
                                                         {this.state.alliesList.map(ally => {
                                                            return <option key={ally.id_ally} value={ally.id_ally}>{ally.ally_name}</option>
                                                         })}
                                                      </Form.Control>
                                                   </Row>
                                                </Col>
                                                <Col sm={4}>
                                                   <Card.Title className={"text-center text-md-center text-lg-center"}>
                                                      <b><i>Horas de Ideación:</i></b>
                                                   </Card.Title>
                                                   <Row className={"d-flex justify-content-center mx-2 px-5"}>
                                                      <Form.Control className="formInput backgndColor proposalsAllyHoursEdit"
                                                         type="number"
                                                         name="challengeExpeHours"
                                                         onChange={this.handleHoursChange}
                                                         min="1"
                                                         ref={this.hoursIdea}
                                                      />
                                                   </Row>
                                                </Col>
                                                <Col sm={4}>
                                                   <Card.Title className={"text-center text-md-center text-lg-center"}>
                                                      <b><i>Horas de Experimentación:</i></b>
                                                   </Card.Title>
                                                   <Row className={"d-flex justify-content-center mx-2 px-5"}>
                                                      <Form.Control className="formInput backgndColor proposalsAllyHoursEdit"
                                                         type="number"
                                                         name="challengeExpeHours"
                                                         onChange={this.handleHoursChange}
                                                         min="1"
                                                         ref={this.hoursExpe}
                                                      />
                                                   </Row>
                                                </Col>
                                             </Row>
                                             <Row className={"d-flex justify-content-end mt-0 mx-0 mb-3"}>
                                                <Col sm={3}>
                                                   <Button type="submit" className={"formButtonProposal"}>
                                                      Asignar
                                          </Button>
                                                </Col>
                                             </Row>
                                          </Form>
                                       )}
                              </Card.Body>
                           </Card>
                        </Col>
                     </Row>
                  </Row>
               </Col>
            </Row>
         </Container>
      );
   }
}

export default SelectProposalChallenge;