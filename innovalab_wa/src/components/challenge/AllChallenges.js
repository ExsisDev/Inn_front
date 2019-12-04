import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import innovaCamaraLogo from '../../images/innovaCamaraLogo.png';
import './AllChallenges.css'


class AllChallenges extends React.Component {
   render() {
      return (
         <Container fluid>
            <Row className="m-0 d-flex justify-content-center">
               <Col>
                  <Row className="my-4">
                     <Col md={4} className="d-flex align-items-center order-xs-2 order-md-1">
                        <Form.Control className="searchChallengeText formInput m-0" type="input" placeholder="Buscar reto" />
                     </Col>
                     <Col md={{ span: 4, offset: 4 }} className="order-xs-1 order-md-2 camaraLogoBox justify-content-end">
                        <img className="camaraLogo" src={innovaCamaraLogo} alt="innovaCamaralogo" />
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                     <a href="Retos Sin Asignar"></a>
                     <a href="Retos Asignados"></a>
                     <a href="Retos Finalizados"></a>
                     </Col>
                  </Row>
               </Col>
            </Row>
         </Container>
      );
   }
}


export default AllChallenges;