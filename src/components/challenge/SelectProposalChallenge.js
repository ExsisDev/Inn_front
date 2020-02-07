import React from 'react';
import { Row, Card, Col, Button, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

import sendIcon from '../../images/PropuestasEnviadas.png';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import LogoProposing from '../../images/EmpresaB.png';
import { getToken, getTokenData } from '../../commons/tokenManagement';
import './SelectProposalChallenge.css';

class SelectProposalChallenge extends React.Component {
   constructor(props) {
      super();
      this.state = {
         renderedProposals: [],
         token: getToken(),
         loadingChallenges: true
      }
   }

   componentDidMount() {
      this.getProposalsByChallenge();
   }

   async getProposalsByChallenge() {
      let url = `${process.env.REACT_APP_BACK_URL}/proposals/${this.props.location.state.idChallenge}/send/1`;

      await axios.get(url, {
         headers: { 'x-auth-token': `${this.state.token}` }
      }).then((result) => {
         if (result.data) {
            console.log(result.data);

            this.setState({ renderedProposals: result.data.result, loadingChallenges: false });
         }
      }).catch((error) => {
         this.setState({ renderedChallenges: [], totalElements: [], loadingChallenges: false });

      });
   };

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
                                                                  
                                 */}
                                 <Row>
                                    {
                                       !this.state.loadingChallenges &&
                                       (
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
                                                            <b><i>{this.state.renderedProposals[0].challenge.company.company_name}</i></b>
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
                                             </Card.Body>
                                          </Card>
                                       )
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