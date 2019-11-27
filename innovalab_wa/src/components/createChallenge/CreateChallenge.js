import React from 'react';
import { Container, Row, Form, Col } from 'react-bootstrap';

import './CreateChallenge.css';
import SideBarAdmin from '../sideBarAdmin/SideBarAdmin';
import backButton from '../../images/backButton.png';
import innovaCamaraLogo from '../../images/innovaCamaraLogo.png';
import newChallenge from '../../images/newChallenge.png';

class CreateChallenge extends React.Component {
   constructor() {
      super();
      this.state = {
         categories: [],
         companies: []
      }

   }

   render() {
      return (
         <Container className="creationBackground d-flex" fluid>
            <SideBarAdmin />
            <Row className="elementsRow flex-column flex-nowrap ">
               <a className="mt-auto" href="#">
                  <div className="backButton d-flex">
                     <img className="align-self-center" src={backButton} alt="Back button" />
                  </div>
               </a>
               <div className="logoHeader ml-auto">
                  <img className="camaraLogo align-self-center" src={innovaCamaraLogo} alt="logo icon" />
               </div>
               <div className="createNewChallengeText d-flex justify-content-center">
                  <img className="plusSign" src={newChallenge} alt="New Challenge" />
                  <h3 className="newChallengeText align-self-center">Crear Nuevo Reto</h3>
               </div>
               <div className="formCreation">
                  <div className="imageFormCreation">
                     image form
               </div>
                  <div className="formData ml-auto">
                     <Form className="d-flex flex-column h-100">
                        <Form.Row>
                           <Form.Control className="challengeName" type="input" placeholder="Nombre del reto" />
                        </Form.Row>

                        <Form.Row className="mt-4">
                           <Form.Group className="d-flex align-items-start flex-column" controlId="formGridDescription">
                              <Form.Label className="w-auto">Descripción: </Form.Label>
                              <Form.Control as="textarea" />
                           </Form.Group>
                        </Form.Row>

                        <Form.Row>
                           <Form.Group className="d-flex align-items-start flex-column" as={Col} controlId="formGridCategories">
                              <Form.Label className="w-auto">Categorias:</Form.Label>
                              <Form.Control as="select">
                                 <option>Choose...</option>
                                 <option>...</option>
                              </Form.Control>
                           </Form.Group>

                           <Form.Group className="d-flex align-items-start flex-column" as={Col} controlId="formGridCompanies">
                              <Form.Label className="w-auto">Empresas:</Form.Label>
                              <Form.Control as="select">
                                 <option>Choose...</option>
                                 <option>...</option>
                              </Form.Control>
                           </Form.Group>

                           <Form.Group className="d-flex align-items-start flex-column" as={Col} controlId="formGridCloseDate">
                              <Form.Label className="w-auto"> Fecha de cierre:</Form.Label>
                              <Form.Control type="date" />
                           </Form.Group>
                        </Form.Row>
                     </Form>
                  </div>
               </div>
            </Row>
         </Container>
      );
   }
}
export default CreateChallenge;