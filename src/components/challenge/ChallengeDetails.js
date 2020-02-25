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
      <Container fluid id="challengeDetails" className="pt-0 d-flex flex-column">
         <BackNavigator />
         <Row className="flex-grow-1 align-items-center my-4 my-lg-0">
            <Col xs={12}>
               <Card className="grayRoundedBox">
                  <Card.Body className="challengeCardRightPadding">
                     <Row className="mt-2">
                        <Col xs={12} lg={2} className="d-flex flex-column align-items-center">
                           <div className="challengeCardImageBox rounded-circle d-flex justify-content-center">
                              <Image src={LogoProposing} className="challengeCardImage" />
                           </div>
                           {/* <b><i>{this.props.companyName}</i></b> */}
                        </Col>
                        <Col xs={12} lg={10} className=" d-flex flex-column justify-content-center">
                           <Card.Title className="text-center text-lg-left normalText mt-3 mt-lg-0">
                              <span className="font-weight-bold midText">{props.location.state.challengeName}</span>
                           </Card.Title>
                           <Card.Text className="challengeCardCompanyDescription mt-lg-4">
                              {props.location.state.companyDescription}
                           </Card.Text>
                        </Col>
                     </Row>
                     <Row className="mt-lg-4">
                        <Col xs={12} lg={2} className="mt-5 mt-lg-0 px-0 d-flex justify-content-center justify-content-lg-end">
                           <span className="font-weight-bold font-italic mr-lg-4">Reto:</span>
                        </Col>
                        <Col xs={12} lg={10} className="mb-2">
                           <Card.Text className="challengeCardDescription text-justify">
                              {props.location.state.challengeDescription}
                           </Card.Text>
                        </Col>
                     </Row>
                     <Row className="my-5">
                        <Col xs={5} lg={2} className="d-flex justify-content-lg-end px-lg-0">
                           <span className="w-auto font-italic smallText">Categorías: </span>
                        </Col>
                        <Col xs={12} lg={10} className="d-flex">
                           <span className="w-auto font-italic smallText">{props.location.state.categories.map((item) => { return (`#${item.split(' ').map(a => a.trim()).map(a => a[0].toUpperCase() + a.substring(1)).join("")} `) })}</span>
                        </Col>
                     </Row>
                     <Row className="mt-lg-5 mb-3">
                        <Col xs={6} lg={3} className="d-flex justify-content-end justify-content-lg-end px-0 ">
                           <span className="font-weight-bold font-italic mr-lg-4 midText">{"Fecha de cierre: "}</span>
                        </Col>
                        <Col xs={6} lg={3} className="d-flex justify-content-start px-0">
                           <span className="font-weight-bold font-italic midText ">&nbsp;&nbsp;&nbsp;&nbsp;{props.location.state.challengeDate}</span>
                        </Col>
                        <Col xs={12} lg={6} className="d-flex justify-content-end mt-4 mt-lg-0">
                           <Link
                              to={{
                                 pathname: "/home/newProposal",
                                 state: {
                                    idChallenge: props.location.state.idChallenge,
                                    challengeName: props.location.state.challengeName,
                                 }
                              }}
                              className="blueLink"
                           >
                              Aplicar
                               </Link>
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container >
   )
}

export default ChallengeDetails;