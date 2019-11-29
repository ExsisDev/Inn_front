import React from 'react';
import { Container, Row, Form, Col } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { IoIosCloseCircle } from 'react-icons/io';

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
         categoriesSelected: [],
         companies: [],
         companieSelected: "",
         actualCategory: "",
         actualCompany: ""
      }

   }

   getAllCompanies() {
      return ["empresa 1", "empresa 2"];
   }

   getAllCategories() {
      return ["categoría 4", "categoría 3"];
   }

   componentDidMount() {
      this.setState({ categories: this.getAllCategories(), companies: this.getAllCompanies() });
   }

   fillSelectedElements(array, element) {
      if (!array.includes(element)) {
         this.setState({ array: array.push(element) });
      }
      console.log(this)
   }

   removeFromSelectedElements(array, element) {
      if (array.includes(element)) {
         this.setState({ array: array.splice(array.indexOf(element)) });
      }
   }

   render() {
      return (
         <Container className="creationBackground d-flex" fluid>
<<<<<<< HEAD
=======
            <SideBarAdmin />
>>>>>>> 984207714ecb4c8a7bb28d467b873e495f227460
            <Row className="elementsRow flex-column flex-nowrap ">
               <Col className="elementsCol">
                  <a className="mt-auto" href="#">
                     <div className="backButton d-flex">
                        <img className="align-self-center" src={backButton} alt="Back button" />
                     </div>
                  </a>
                  <div className="camaraLogoBox ml-auto">
                     <img className="camaraLogo align-self-center" src={innovaCamaraLogo} alt="logo icon" />
                  </div>
                  <div className="createNewChallengeBox d-flex justify-content-center">
                     <img className="plusSign" src={newChallenge} alt="New Challenge" />
                     <h3 className="newChallengeText align-self-center">Crear Nuevo Reto</h3>
                  </div>
                  <div className="formCreation">
                     <div className="imageFormCreation">
                        image form
                     </div>
                     <div className="formData ml-auto">
                        <Form className="d-flex flex-column">
                           <Form.Row>
                              <Form.Control className="challengeName" type="input" placeholder="Nombre del reto" />
                           </Form.Row>

                           <Form.Row className="mt-4">
                              <Form.Group className="d-flex align-items-start flex-column" controlId="formGridDescription">
                                 <Form.Label className="w-auto">Descripción: </Form.Label>
                                 <Form.Control as="textarea" />
                              </Form.Group>
                           </Form.Row>

                           <Form.Row className="mt-4">
                              <Form.Group className="d-flex align-items-start flex-column" as={Col} controlId="formGridCategories">
                                 <Form.Label className="w-auto">Categorias:</Form.Label>
                                 <Form.Control as="select" ref="selectCategory" onChange={() => { this.fillSelectedElements(this.state.categoriesSelected, this.refs.selectCategory.value) }}>
                                    <option disabled selected>Seleccione las categorias</option>
                                    {this.state.categories.map((item) => {
                                       return <option name={item} key={item}>{item}</option>
                                    })}
                                 </Form.Control>
                              </Form.Group>

                              <Form.Group className="d-flex align-items-start flex-column col-sm-12 col-md-12 col-xl-4" as={Col} controlId="formGridCompanies">
                                 <Form.Label className="w-auto">Empresa proponente:</Form.Label>
                                 <Form.Control as="select" ref="selectCompany" onChange={() => { this.setState({ companieSelected: this.refs.selectCompany.value }) }}>
                                    <option disabled selected>Seleccione una empresa</option>
                                    {this.state.companies.map((item) => {
                                       return <option name={item} key={item}>{item}</option>
                                    })}
                                 </Form.Control>
                              </Form.Group>

                              <Form.Group className="d-flex align-items-start flex-column" as={Col} controlId="formGridCloseDate">
                                 <Form.Label className="w-auto"> Fecha de cierre:</Form.Label>
                                 <Form.Control type="date" />
                              </Form.Group>
                           </Form.Row>
                        </Form>

                        <Row>
                           <Col sm={4}>
                              <ul className="listRemovable d-flex flex-column align-items-start" >
                                 {this.state.categoriesSelected.map((item) => {
                                    return (
                                       <IconContext.Provider key={item} value={{ className: "logoutIcon" }}>
                                          <li key={item} className="w-auto" ref="categorySelected"><a href="#" className="crossLink" onClick={() => this.removeFromSelectedElements(this.state.categoriesSelected, this.refs.categorySelected.textContent)}><IoIosCloseCircle /></a>{item}</li>
                                       </IconContext.Provider>
                                    )
                                 })}
                              </ul>
                           </Col>
                           <Col sm={4}>
                              <ul className="listRemovable d-flex flex-column align-items-start" >
                                 <li className="w-auto">{this.state.companieSelected}</li>
                              </ul>
                           </Col>
                        </Row>

                     </div>
                  </div>
               </Col>
            </Row>
         </Container >
      );
   }
}
export default CreateChallenge;