import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import alertIcon from '../../images/PropuestasAsignadas.png';
import { getToken } from "../../commons/tokenManagement";
import "./ChallengeAssignedDetails.css";

class ChallengeAssignedDetails extends Component {

   constructor() {
      super();
      this.state = {
         token: getToken(),
         proposal: {}
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
            this.setState({ proposal: result.data });
         }
      }).catch((error) => {
         this.setState({ proposal: {} });
      })
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
