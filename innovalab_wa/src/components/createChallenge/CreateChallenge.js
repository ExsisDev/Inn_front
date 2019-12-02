import React from 'react';
import axios from 'axios';
import { Row, Form, Col, Button } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { IoIosCloseCircle } from 'react-icons/io';
import _ from 'lodash';

import './CreateChallenge.css';

class CreateChallenge extends React.Component {

   constructor() {
      super();
      this.state = {
         categories: [],
         categoriesSelected: [],
         companies: [],
         companySelected: "",
         closeDate: "",
         token: this.getSession()
      }
   }


   componentDidMount() {
      if (this.state.token) {
         this.getAllCategories();
         this.getAllCompanies();
      }
   }


   /**
     * Obtener el token de sesion
     * @return {String} token 
     */
   getSession() {
      return sessionStorage.getItem('auth-token');
   }



   /**
    * Obtener todas las compañias
    * @return {Object} companies
    */
   getAllCompanies() {
      const url = `${process.env.REACT_APP_BACK_URL}/companies`;

      axios.get(url, {
         headers: { 'x-auth-token': `${this.state.token}` }
      })
         .then(res => {
            this.setState({ companies: res.data });
         })
         .catch(error => {
            console.log(error);
         });
   }


   /**
    * Obtener todas las categorias para compañia
    * @return {Object} categories
    */
   getAllCategories() {
      const url = `${process.env.REACT_APP_BACK_URL}/ally_categories`;

      axios.get(url, {
         headers: { 'x-auth-token': `${this.state.token}` }
      })
         .then(res => {
            this.setState({ categories: res.data });
         })
         .catch(error => {
            console.log(error);
         });
   }


   /**
    * Llenar el arreglo de elementos seleccionados
    * 
    * @param {Array} array 
    * @param {String} element 
    */
   fillSelectedElements(array, element) {
      if (!array.includes(element)) {
         let newArray = array;
         newArray = newArray.push(element);
         this.setState({ array: newArray });
      }
   }


   /**
    * Manejar el click de eliminación de elemento 
    */
   handleDeleteClick = e => {
      const categoryToDelete = e.currentTarget.dataset.id;
      let newArray = this.state.categoriesSelected;
      newArray = _.remove(newArray, function (n) {
         return n !== categoryToDelete;
      });
      this.setState({ categoriesSelected: newArray });
   }


   /**
    * Manejar el click de creación de un reto
    */
   handleChallengeCreation = e => {
      e.preventDefault();

      console.log(this.refs.ChallengeName.value);
      console.log(this.refs.ChallengeDescription.value);
      console.log(this.state.categoriesSelected);
      console.log(this.state.companySelected);
      console.log(this.state.closeDate);
   }


   render() {
      return (
         <Row className="m-0">
            <Col className="p-0">
               <Row className="m-0">
                  <Col>
                     <div className="formBox">
                        <Row className="m-0 d-flex justify-content-center">
                           <Col sm={9} className="formCentering">
                              <Form className="d-flex flex-column" onSubmit={this.handleChallengeCreation}>
                                 <Form.Row className="m-0">
                                    <Form.Group as={Col}>
                                       <Form.Control className="challengeName formInput" type="input" placeholder="Nombre del reto" ref="ChallengeName"/>
                                    </Form.Group>
                                 </Form.Row>

                                 <Form.Row className="m-0">
                                    <Form.Group as={Col} className="d-flex align-items-start form-group flex-column mt-2">
                                       <Form.Label className="w-auto ">Descripción: </Form.Label>
                                       <Form.Control as="textarea" className="formInput textArea mt-0" ref="ChallengeDescription"/>
                                    </Form.Group>
                                 </Form.Row>

                                 <Form.Row className="mt-2 d-flex justify-content-around">
                                    <Form.Group as={Col} xl={3} sm={12} controlId="formGridCategories" className="d-flex align-items-center flex-column " >
                                       <Form.Label className="w-auto">Categorias:</Form.Label>
                                       <Form.Control className="formSelect selectCategoryCompany" as="select" ref="SelectCategory" onChange={() => { this.fillSelectedElements(this.state.categoriesSelected, this.refs.SelectCategory.value) }}>
                                          <option disabled selected>Seleccione las categorias</option>
                                          {this.state.categories.map((item) => {
                                             return <option name={item.id_category} key={item.id_category}>{item.category_name}</option>
                                          })}
                                       </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} xl={3} sm={12} controlId="formGridCompanies" className="d-flex align-items-center flex-column " >
                                       <Form.Label className="w-auto">Empresa proponente:</Form.Label>
                                       <Form.Control className="formSelect selectCategoryCompany" as="select" ref="SelectCompany" onChange={() => { this.setState({ companySelected: this.refs.SelectCompany.value }) }}>
                                          <option disabled selected>Seleccione una empresa</option>
                                          {this.state.companies.map((item) => {
                                             return <option name={item.id_company} key={item.id_company}>{item.company_name}</option>
                                          })}
                                       </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} xl={3} sm={12} controlId="formGridCloseDate" className="d-flex align-items-center flex-column " >
                                       <Form.Label className="w-auto" onChange={(event) => this.setState({closeDate: event.target.value})}> Fecha de cierre:</Form.Label>
                                       <Form.Control className="formDate dateWidth" type="date" />
                                    </Form.Group>
                                 </Form.Row>
                                 <Row className="m-0 justify-content-center">
                                    <Col className="justify-content-center">
                                       <ul className="listRemovable p-0 d-flex flex-column align-items-center flex-wrap" >
                                          {this.state.categoriesSelected.map((item) => {
                                             return (
                                                <IconContext.Provider key={item} value={{ className: "logoutIcon" }}>
                                                   <li key={item} className="w-auto" ><span data-id={item} className="crossLink" onClick={this.handleDeleteClick}><IoIosCloseCircle /></span>{item}</li>
                                                </IconContext.Provider>
                                             )
                                          })}
                                       </ul>
                                    </Col>
                                 </Row>
                                 <Form.Row className="m-0">
                                    <Form.Group as={Col} className="d-flex justify-content-end">
                                       <Button className="createButton mt-0" variant="warning" type="submit">
                                          Crear Reto
                                       </Button>
                                    </Form.Group>
                                 </Form.Row>
                              </Form>
                           </Col>
                        </Row>
                     </div>
                  </Col>
               </Row>
            </Col>
         </Row>
      );
   }
}
export default CreateChallenge;