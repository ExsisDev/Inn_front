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
         token: getToken(),
         loadingChallenges: true,
         loadingResources: true,
         selectProposal: ""
      }
   }

   componentDidMount() {
      this.getProposalsByChallenge();
      // this.getAllAllies();
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
   getAllAllies(){
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
   }

   /**
    * Manejo de radio buttons de seleccion de propuestas
    */
   handleSelectedProposal = (e) => {
      console.log(this.state.selectProposal+"----"+e.target.value);
      if (this.state.selectProposal == e.target.value) {
         console.log("----");
         
         this.setState({
            selectProposal: ""
         });
      } else {
         console.log("-+++");
         this.setState({
            selectProposal: e.target.value
         });
      }      
   }

   /**
    * Manejo de asignación de propuestas al reto
    */
   handleSubmitProposal = (e) => {
      e.preventDefault();

      const url = `${process.env.REACT_APP_BACK_URL}/proposals/${this.props.location.state.idChallenge}/${this.state.selectProposal}`;
      console.log(this.props.location.state.idChallenge + " -  " + this.state.selectProposal);

      axios.put(url, {}, {
         headers: { 'x-auth-token': `${this.state.token}` }
      }).then(() => {
         this.getProposalsByChallenge();
      })
         .catch((error) => {
            console.log(error);
         });
   }

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
                                 <Form onSubmit={this.handleSubmitProposal}>
                                    <Row>
                                       {
                                          !this.state.loadingChallenges &&
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
                                                         <Col sm={3} md={2} className="d-flex align-items-start justify-content-start">
                                                            <b><i>Descripción:</i></b>
                                                         </Col>
                                                         <Col sm={9} md={10} >
                                                            <Card.Text className="text-justify">
                                                               {proposal.solution_description}
                                                            </Card.Text>
                                                         </Col>
                                                      </Row>
                                                      <Row className="mt-4 mx-0">
                                                         <Col sm={3} md={2} className="d-flex align-items-start justify-content-start">
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
                                                         <Col sm={12} >
                                                            <h2>Recursos</h2>
                                                            {
                                                               <HumanResourceList cols="4" people={proposal.resources} />
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
                                             <DropdownButton variant="secondary" as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
                                                <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                                                <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                                             </DropdownButton>
                                          </Row>
                                       </Col>
                                       <Col sm={4}>
                                          <Card.Title className={"text-center text-md-center text-lg-center"}>
                                             <b><i>Horas de Ideación:</i></b>
                                          </Card.Title>
                                          <Row className={"mx-2 px-5"}>
                                             <DropdownButton variant="secondary" as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
                                                <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                                                <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                                             </DropdownButton>
                                          </Row>
                                       </Col>
                                       <Col sm={4}>
                                          <Card.Title className={"text-center text-md-center text-lg-center"}>
                                             <b><i>Horas de Experimentación:</i></b>
                                          </Card.Title>
                                          <Row className={"mx-2 px-5"}>
                                             <DropdownButton variant="secondary" as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
                                                <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                                                <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                                             </DropdownButton>
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