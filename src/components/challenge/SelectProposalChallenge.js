import React from 'react';
import { Row, Form, Col, Button, Container } from 'react-bootstrap';

import sendIcon from '../../images/PropuestasEnviadas.png';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import './SelectProposalChallenge.css';

class SelectProposalChallenge extends React.Component {
   constructor(props) {
      super();
   }

   render() {
      return (
         <Container fluid className="d-flex justify-content-center">
            <Row className="h-100 d-flex justify-content-center">
               <Col sm={11} className="d-flex flex-column align-items-center">
                  <BackNavigator />
                  <SectionTitle titleProps={{ img: sendIcon, imgAlt: 'Plus sign', text: 'Asignar nuevo reto' }} />
                  <Row >

                  </Row>
               </Col>
            </Row>
         </Container>
      );
   }
}

export default SelectProposalChallenge;