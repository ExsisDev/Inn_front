import React from 'react';
import axios from 'axios';
import { Row, Form, Col, Button, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { IconContext } from "react-icons";
import { IoIosCloseCircle } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import { DateTime } from 'luxon';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { getToken } from '../../commons/tokenManagement';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import plusIcon from '../../images/newChallenge.png';
import './CreateChallenge.css';

class CreateChallenge extends React.Component {

   constructor() {
      super();
      this.state = {
         allCategories: [],
         categoriesSelected: [],
         categoriesDisplayed: [],
         allCompanies: [],
         challengeName: "",
         companySelected: "",
         closeDate: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
         homeRedirection: false,
         isCreating: false,
         token: getToken()
      }

      this.OptionCategorySelected = React.createRef();
      this.ChallengeDescription = React.createRef();
      this.SelectCompany = React.createRef();

   }

   toastConfiguration = {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false
   }


   componentDidMount() {
      if (this.state.token) {
         this.getAllCategories();
         this.getAllCompanies();
      }
   }


   /**
    * Obtener los elementos del token
    */
   getElementsToken() {
      return jwt.verify(this.state.token, `${process.env.REACT_APP_PRIVATE_KEY}`);
   }


   /**
    * Alamacenar fecha en el estado
    */
   saveDate = e => {
      this.setState({ closeDate: e.target.value });
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
            this.setState({ allCompanies: res.data });
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
      const url = `${process.env.REACT_APP_BACK_URL}/al_categories`;

      axios.get(url, {
         headers: { 'x-auth-token': `${this.state.token}` }
      })
         .then(res => {
            this.setState({ allCategories: res.data });
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
   fillSelectedElements(element) {
      let index = this.OptionCategorySelected.current.selectedIndex;
      let nameOfCategory = this.state.allCategories[index - 1].category_name;
      element = parseInt(element);

      if (!this.state.categoriesSelected.includes(element)) {
         let newArray = [];
         let newArray2 = [];
         _.assign(newArray, this.state.categoriesSelected);
         _.assign(newArray2, this.state.categoriesDisplayed);
         newArray.push(element);
         newArray2.push(nameOfCategory);
         this.setState({ categoriesSelected: newArray, categoriesDisplayed: newArray2 });
      }

   }


   /**
    * Manejar el click de eliminación de elemento 
    */
   handleDeleteClick = e => {
      const categoryToDelete = e.currentTarget.dataset.name;
      const indexToDelete = e.currentTarget.dataset.indexarray;
      console.log(e.currentTarget.dataset.indexarray)
      let newArray = [];
      let newArray2 = [];
      _.assign(newArray, this.state.categoriesSelected);
      _.assign(newArray2, this.state.categoriesDisplayed);
      newArray.splice(indexToDelete, 1);
      newArray2 = _.remove(newArray2, function (n) {
         return n !== categoryToDelete;
      });
      this.setState({ categoriesSelected: newArray, categoriesDisplayed: newArray2 });
   }


   /**
    * Manejar el click de creación de un reto
    */
   async handleChallengeCreation(e) {
      e.preventDefault();

      const url = `${process.env.REACT_APP_BACK_URL}/challenges`;
      const CREATED = 3;

      await this.setState({isCreating: true});

      let bodyChallenge = {
         fk_id_company: this.state.companySelected,
         challenge_name: this.state.challengeName,
         challenge_description: this.ChallengeDescription.current.value,
         fk_id_challenge_state: CREATED,
         close_date: this.state.closeDate,
         survey_date: DateTime.local().setZone('America/Bogota').toString(),
         user_id_creator: this.getElementsToken().id_user,
         categories_selected: this.state.categoriesSelected
      };

      if (this.state.challengeName !== "") {
         await axios.post(url, bodyChallenge, {
            headers: { 'x-auth-token': `${this.state.token}` }
         })
            .then((result) => {
               this.setState({ isCreating: false });
               this.notifySuccess("Reto creado");
            })
            .catch((error) => {
               this.setState({ isCreating: false });
               this.notifyError("Hubo un problema al crear el reto");
               console.log(error);
            });
      }

      await setTimeout(() => {
         this.setState({ homeRedirection: true });
      }, 3000);

   }


   /**
    * Cambiar estado de la entrada mientras se ingresa un valor
    * @return {VoidFunction}
   */
   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }


   /**
	 * Toast de error
	 */
   notifyError = (errorMessage) => toast.error(errorMessage, this.toastConfiguration);


	/**
	 * Toast de exito
	 */
   notifySuccess = (successMessage) => toast.success(successMessage, this.toastConfiguration);


   render() {

      if (this.state.homeRedirection) {
         return (
            <Redirect to="/home" />
         )
      } else {
         return (
            <Container fluid className="d-flex justify-content-center">
               <ToastContainer />
               <Row className="h-100 d-flex justify-content-center">
                  <Col sm={11} className="d-flex flex-column align-items-center">
                     <BackNavigator />
                     <SectionTitle titleProps={{ img: plusIcon, imgAlt: 'Plus sign', text: 'Crear Nuevo Reto' }} />
                     <Row className="d-fex justify-content-center">
                        <Col className="p-0">

                           <div className="formBox">
                              <Row className="m-0 d-flex justify-content-center">
                                 <Col sm={10} className="formCentering">
                                    <Form className="d-flex flex-column" onSubmit={this.handleChallengeCreation.bind(this)}>
                                       <Form.Row className="m-0">
                                          <Form.Group as={Col}>
                                             <Form.Control className="challengeName formInput"
                                                name="challengeName"
                                                type="input"
                                                placeholder="Nombre del reto"
                                                onChange={this.handleChange}
                                                maxlength="200"
                                                required
                                             />
                                             {
                                                this.state.challengeName.length > 200 &&
                                                <p className="errorMessage">
                                                   El nombre no puede contener más de 200 caracteres
                                                {
                                                      this.setState({ challengeName: "" })
                                                   }
                                                </p>
                                             }
                                          </Form.Group>
                                       </Form.Row>

                                       <Form.Row className="m-0">
                                          <Form.Group as={Col} className="d-flex align-items-start form-group flex-column mt-2">
                                             <Form.Label className="w-auto ">Descripción: </Form.Label>
                                             <Form.Control as="textarea"
                                                className="formInput textArea mt-0"
                                                ref={this.ChallengeDescription}
                                                required
                                             />
                                          </Form.Group>
                                       </Form.Row>

                                       <Form.Row className="mt-2 d-flex justify-content-around">
                                          <Form.Group as={Col} xl={3} sm={12} controlId="formGridCategories" className="d-flex align-items-center flex-column " >
                                             <Form.Label className="w-auto">Categorias:</Form.Label>
                                             <Form.Control className="formSelect selectCategoryCompany"
                                                as="select"
                                                ref={this.OptionCategorySelected}
                                                onChange={() => { this.fillSelectedElements(this.OptionCategorySelected.current.value) }}
                                                required
                                             >
                                                <option disabled selected>Seleccione las categorias</option>
                                                {this.state.allCategories.map((item) => {
                                                   return <option value={item.id_category} key={item.id_category}>{item.category_name}</option>
                                                })}
                                             </Form.Control>
                                          </Form.Group>

                                          <Form.Group as={Col} xl={3} sm={12} controlId="formGridCompanies" className="d-flex align-items-center flex-column " >
                                             <Form.Label className="w-auto">Empresa proponente:</Form.Label>
                                             <Form.Control className="formSelect selectCategoryCompany"
                                                as="select"
                                                ref={this.SelectCompany}
                                                onChange={() => { this.setState({ companySelected: this.SelectCompany.current.value }) }}
                                                required
                                             >
                                                <option disabled selected>Seleccione una empresa</option>
                                                {this.state.allCompanies.map((item) => {
                                                   return <option value={item.id_company} key={item.id_company}>{item.company_name}</option>
                                                })}
                                             </Form.Control>
                                          </Form.Group>

                                          <Form.Group as={Col} xl={3} sm={12} controlId="formGridCloseDate" className="d-flex align-items-center flex-column " >
                                             <Form.Label className="w-auto"> Fecha de cierre:</Form.Label>
                                             <Form.Control className="formDate dateWidth"
                                                type="date"
                                                min={new Date().toJSON().slice(0, 10).replace(/-/g, '-')}
                                                onChange={this.saveDate}
                                                required
                                             />
                                             {
                                                this.state.closeDate < new Date().toJSON().slice(0, 10).replace(/-/g, '-') &&
                                                <p className="errorMessage">Seleccione una fecha válida </p>
                                             }
                                          </Form.Group>
                                       </Form.Row>
                                       <Row className="m-0 justify-content-center">
                                          <Col className="justify-content-center">
                                             <ul className="listRemovable p-0 d-flex flex-column align-items-center flex-wrap" >
                                                {this.state.categoriesDisplayed.map((item, index) => {
                                                   return (
                                                      <IconContext.Provider key={item} value={{ className: "logoutIcon" }}>
                                                         <li key={item} className="w-auto" ><span data-name={item} data-indexarray={index} className="crossLink" onClick={this.handleDeleteClick}><IoIosCloseCircle /></span>{item}</li>
                                                      </IconContext.Provider>
                                                   )
                                                })}
                                             </ul>
                                          </Col>
                                       </Row>
                                       <Form.Row className="m-0">
                                          <Form.Group as={Col} className="d-flex justify-content-end">
                                             <Button className="createButton mt-0" variant="warning" type="submit" disabled={this.state.isCreating}>
                                                {this.state.isCreating ? 'Creando Reto...' : 'Crear Reto'}
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
            </Container>
         );
      }
   }
}

export default CreateChallenge;