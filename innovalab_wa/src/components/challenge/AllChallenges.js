import React from 'react';
import { Container, Row, Col, Form, Nav, Navbar } from 'react-bootstrap';
import innovaCamaraLogo from '../../images/innovaCamaraLogo.png';
import plusSign from '../../images/newChallenge.png'
import './AllChallenges.css'


class AllChallenges extends React.Component {

   constructor() {
      super();
      this.state = {
      }
      this.link1 = React.createRef();
      this.link2 = React.createRef();
      this.link3 = React.createRef();
   }

   handleClickLink = e => {

   }

   render() {
      return (
         <Container fluid>
            <Row className="m-0 d-flex justify-content-center">
               <Col>
                  <Row className="my-4 mx-0">
                     <Col md={4} className="d-flex align-items-center order-2 order-sm-2 order-md-1 mt-4 mt-sm-4 mt-md-0">
                        <Form.Control className="searchChallengeText formInput m-0 pl-5" type="input" placeholder="Buscar reto" />
                     </Col>
                     <Col md={{ span: 4, offset: 4 }} className="order-sm-1 order-1 order-md-2 camaraLogoBox d-flex justify-content-md-end justify-content-center">
                        <img className="camaraLogo" src={innovaCamaraLogo} alt="innovaCamaralogo" />
                     </Col>
                  </Row>
                  <Row>
                     <Col sm={12} md={9} className="order-2 order-md-1">
                        <Navbar collapseOnSelect expand="lg">
                           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                           <Navbar.Collapse id="responsive-navbar-nav">
                              <Nav className="align-items-center">
                                 <Nav.Link ref={this.link1} className="circle red navLink mx-4 mx-lg-2" href="#Unassigned" onClick={this.handleClickLink}><span>Retos Sin Asignar</span></Nav.Link>
                                 <Nav.Link ref={this.link2} className="circle blue navLink mx-4 mx-lg-2" href="#Assigned" onClick={this.handleClickLink}><span>Retos Asignados</span></Nav.Link>
                                 <Nav.Link ref={this.link3} className="circle green navLink mx-4 mx-lg-2" href="#Finished" onClick={this.handleClickLink}><span>Retos Finalizados</span></Nav.Link>
                              </Nav>
                           </Navbar.Collapse>
                        </Navbar>
                     </Col>
                     <Col sm={12} md={3} className="order-1 order-md-2 d-flex align-items-center justify-content-xl-end justify-content-center p-0">
                        <a className="linkCreateChallenge" href="#"><img className="plusCreateChallenge w-auto mr-1" src={plusSign} alt="Plus"></img>Crear Reto</a>
                     </Col>
                  </Row>
               </Col>
            </Row>
         </Container>
      );
   }
}


export default AllChallenges;