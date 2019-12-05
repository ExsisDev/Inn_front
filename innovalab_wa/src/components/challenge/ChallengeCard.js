import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import './ChallengeCard.css';


class ChallengeCard extends React.Component {
   constructor(props) {
      super(props);

   }


   render() {
      return (
         <Col className="mb-5">
            <Card className="formBox challengeCardBox">
               <Card.Body className="px-lg-5">
                  <Row className="mx-0">
                     <Col sm={9} md={10} className="offset-sm-3 offset-md-2">
                        <Card.Title className="challengeCardName">Nombre</Card.Title>
                     </Col>
                  </Row>
                  <Row className="font-italic mx-0">
                     <Col sm={9} md={10} className="offset-sm-3 offset-md-2">
                        <Card.Text className="companyCardDescription">
                           La empresa B tiene 10 años en el mercado dedicada al sector alimenticio,
                           Sus productos siempre se destacan por su sabor y disponibilidad a nivel
                           Nacional.
                        </Card.Text>
                     </Col>
                  </Row>
                  <Row className="mt-4 mx-0">
                     <Col sm={3} md={2} className="">
                        <b><i>Reto:</i></b>
                     </Col>
                     <Col sm={9} md={10} >
                        <Card.Text className="challengeCardDescription">
                           La empresa B tiene 10 años en el mercado dedicada al sector alimenticio,
                           Sus productos siempre se destacan por su sabor y disponibilidad a nivel
                           Nacional.
                        </Card.Text>
                     </Col>
                  </Row>
                  <Row className="d-flex justify-content-end mt-2 mt-md-1">
                     <a href="#" className="seeMoreCardLink mr-4">Ver más</a>
                  </Row>
                  <Row className="challengeCardCategories mx-0 mt-2 mt-md-1">
                     <Col sm={3} md={2} className="px-0">
                        <i>Categorías:</i>
                     </Col>
                     <Col sm={9} md={10} className="d-flex justify-content-start">
                        <i className="w-auto cardHashTags">#DesarrolloDeSoftwareEspecifico #AplicaciónMóvil</i>
                     </Col>
                  </Row>
               </Card.Body>
            </Card>
         </Col>
      );
   }
}


export default ChallengeCard;