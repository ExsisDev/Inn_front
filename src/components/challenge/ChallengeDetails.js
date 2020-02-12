import React from 'react';
import { Col, Card, Row, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


import BackNavigator from '../utilities/backNavigator/BackNavigator';
import LogoProposing from '../../images/EmpresaB.png';
import './ChallengeDetails.css';


const ChallengeDetails = (props) => {

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
                                       <b><i>{props.location.state.companyName}</i></b>
                                    </Col>
                                 </Row>
                              </Col>
                              <Col lg={10}>
                                 <Row className="mx-0">
                                    <Col className="px-0">
                                       <Card.Title className="challengeDetailsName text-center text-md-center text-lg-left mt-2"><b>{props.location.state.challengeName}</b></Card.Title>
                                    </Col>
                                 </Row>
                                 <Card.Text className="challengeDetailsCompanyDescription text-justify">
                                    {props.location.state.companyDescription}
                                 </Card.Text>
                              </Col>
                           </Row>
                           <Row className="mt-4 mx-0">
                              <Col sm={3} md={2} className="d-flex align-items-start justify-content-start">
                                 <b><i>Reto:</i></b>
                              </Col>
                              <Col sm={9} md={10} >
                                 <Card.Text className="text-justify">
                                    {props.location.state.challengeDescription}
                                 </Card.Text>
                              </Col>
                           </Row>
                           <Row className="text-small mx-0 mt-2 mt-md-4">
                              <Col sm={3} md={2} className="d-flex justify-content-left justify-content-sm-center">
                                 <span className="w-auto"><i>Categorías:</i></span>
                              </Col>
                              <Col sm={9} md={10} className="d-flex justify-content-start">
                                 <i className="w-auto challengeDetailsHashTags">{props.location.state.categories.map((item) => { return (`#${item.split(' ').map(a => a.trim()).map(a => a[0].toUpperCase() + a.substring(1)).join("")} `) })}</i>
                              </Col>
                           </Row>
                           <Row className="d-flex justify-content-center mt-4 mt-md-5 mx-0 mb-3">
                              <Col md={10} className="d-flex justify-content-md-start justify-content-center">
                                 <b className="w-auto ml-4"><i>{"Fecha de cierre: "}</i>&nbsp;&nbsp;&nbsp;&nbsp;<i>{props.location.state.challengeDate}</i></b>
                              </Col>
                              <Col md={2} className="mt-3 mt-md-0">
                                 <Link
                                    to={{
                                       pathname: "/home/newProposal",
                                       state: {
                                          idChallenge: props.location.state.idChallenge,
                                          challengeName: props.location.state.challengeName,
                                       }
                                    }}
                                    className="blueLink mr-4"
                                 >
                                    Aplicar
                              </Link>
                              </Col>
                           </Row>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Container>
   )
}

export default ChallengeDetails;