import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import checkIcon from '../../images/RetosTerminados.png';

export class ChallengeFinishedDetails extends Component {
   render() {
      return (
         <Container fluid className="d-flex justify-content-center">
            <Row className="h-100 d-flex justify-content-center">
               <Col sm={11} className="d-flex flex-column align-items-center">
                  <BackNavigator />
                  <SectionTitle titleProps={{ img: checkIcon, imgAlt: 'alert', text: 'Reto Finalizado' }} />
               </Col>
            </Row>
         </Container>
      )
   }
}

export default ChallengeFinishedDetails
