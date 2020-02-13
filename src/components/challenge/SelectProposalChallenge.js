import React from 'react';
import { Row, Card, Col, Button, Container, Image } from 'react-bootstrap';
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
         resources: []
      }

   }

   componentDidMount() {
      this.getProposalsByChallenge();
   }

   getProposalsByChallenge() {
      let url = `${process.env.REACT_APP_BACK_URL}/proposals/${this.props.location.state.idChallenge}/send/1`;

      axios.get(url, {
         headers: { 'x-auth-token': `${this.state.token}` }
      }).then((result) => {
         if (result.data) {
            const proposals = result.data.result;
            this.setState({ renderedProposals: proposals });
            return proposals;
         }
         return [];
      }).then((proposals) => {
         let resources = Promise.all(
            proposals.map( async (proposal) => {
               return this.getResources(proposal.ally.id_ally);
         }));
         return resources;
      }).then( resources => {
         this.setState({ resources: resources, loadingChallenges: false });
      })
         .catch((error) => {
            this.setState({ renderedChallenges: [], totalElements: [], loadingChallenges: false });
         });
   };

   async getResources(allyId) {
      const url = `${process.env.REACT_APP_BACK_URL}/resources/${allyId}`;
      

      try {
         var response = await axios.get(url, {
            headers: { 'x-auth-token': `${this.state.token}` }
         });
         return response.data;
      }
      catch (error) {
         console.log(error);
         return [];
      };
      // axios.get(url, {
      //    headers: { 'x-auth-token': `${this.state.token}` }
      // }).then( response => {
      //    resources = response.data;
      // }).catch( error => {
      //    resources = [];
      // });
      // return resources;
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
                                 <Row className="mt-4 mx-0">
                                    <Col sm={3} md={2} className="d-flex align-items-start justify-content-start">
                                       <b><i>Reto:</i></b>
                                    </Col>
                                    <Col sm={9} md={10} >
                                       <Card.Text className="text-justify">
                                          {this.props.location.state.challengeDescription}
                                       </Card.Text>
                                    </Col>
                                 </Row>
                                 <Row className="challengeDetailsCategories mx-0 mt-2 mt-md-4">
                                    <Col sm={3} md={2} className="d-flex justify-content-left justify-content-sm-center">
                                       <span className="w-auto"><i>Categorías:</i></span>
                                    </Col>
                                    <Col sm={9} md={10} className="d-flex justify-content-start">
                                       <i className="w-auto challengeDetailsHashTags">{this.props.location.state.categories.map((item) => { return (`#${item.split(' ').map(a => a.trim()).map(a => a[0].toUpperCase() + a.substring(1)).join("")} `) })}</i>
                                    </Col>
                                 </Row>
                                 <Row className="d-flex justify-content-center mt-4 mt-md-5 mx-0 mb-3">
                                    Propuestas de solución:
                                 </Row>
                                 {/* 
                                    Lista de propuestas del reto                           
                                 */}
                                 <Row>
                                    {
                                       !this.state.loadingChallenges &&
                                       this.state.renderedProposals.map((proposal, index) => {
                                          return (
                                             <Card className="formBox challengeDetailsCardBox pr-4" key={`A${proposal.ally.id_ally}`}>
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
                                                            <Col className="px-0">
                                                               <Card.Title className="challengeDetailsName text-center text-md-center text-lg-right my-1"><b>Seleccionar</b></Card.Title>
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
                                                            <HumanResourceList cols="4" people={this.state.resources[index]} />
                                                         }
                                                      </Col>
                                                   </Row>
                                                </Card.Body>
                                             </Card>
                                          )
                                       })
                                    }
                                 </Row>
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