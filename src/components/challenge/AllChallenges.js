import React from 'react';
import axios from "axios";
import { Container, Row, Col, Nav, Navbar, InputGroup, Button, FormControl, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Pagination from "react-js-pagination";
import ReactLoading from 'react-loading';
import ChallengeCard from './ChallengeCard';

import innovaCamaraLogo from '../../images/innovaCamaraLogo.png';
import plusSign from '../../images/newChallenge.png';
import { getToken } from '../../commons/tokenManagement';
import 'react-toastify/dist/ReactToastify.css';
import './AllChallenges.css'


class AllChallenges extends React.Component {

   constructor() {
      super();
      this.state = {
         renderedChallenges: [],
         actualPage: 1,
         actualState: "CREATED",
         loadingChallenges: true,
         totalElements: 0,
         searchElement: "",
         searchPaginationActive: false,
         showModal: false,
         challengeToDelete: null,
         elementsDisplayed: 5,
         token: getToken()
      }
      this.link1 = React.createRef();
      this.link2 = React.createRef();
      this.link3 = React.createRef();
      this.begginingPage = React.createRef();

   }

   toastId = null;

   toastConfiguration = {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
      containerId: 'A'
   }


   componentDidMount() {
      this.link1.current.click();
   }


   /**
    * Obtener todos los retos según la página, el estado y opcionalmente una palabra clave
    */
   async getChallengesByPageAndStatus(page, state, isASearch) {

      let url = `${process.env.REACT_APP_BACK_URL}/challenges/${page}/${state}`;
      url = isASearch ? url + `/search/?value=${this.state.searchElement}` : url;
      const token = this.state.token;

      await axios.get(url, {
         headers: { 'x-auth-token': `${token}` }

      }).then((result) => {
         if (result.data) {
            this.setState({ renderedChallenges: result.data.result, totalElements: result.data.totalElements, loadingChallenges: false });
         }
      }).catch((error) => {
         this.setState({ renderedChallenges: [], totalElements: [], loadingChallenges: false });

      });

      // await this.begginingPage.current.scrollIntoView();
   }


   /**
    * Cambiar el estado actual de los retos mostrados (barra de links) 
    */
   async handleClickLink(e, state) {
      await this.setState({ actualState: state, loadingChallenges: true, searchPaginationActive: false, actualPage: 1 });
      await this.getChallengesByPageAndStatus(this.state.actualPage, state, false);
   }


   /**
    * Cambiar el indice de la página actual
    * @param {Number} pageNumber 
    */
   async handlePageChange(pageNumber) {
      await this.setState({ actualPage: pageNumber, loadingChallenges: true });
      await this.getChallengesByPageAndStatus(pageNumber, this.state.actualState, this.state.searchPaginationActive);
   }


	/**
    * Cambiar estado de la entrada mientras se ingresa un valor
    * @return {VoidFunction}
    */
   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }


   /**
    * Manejar el submit de la búsqueda 
   */
   handleSearchButton = async (e) => {
      e.preventDefault();
      await this.setState({ loadingChallenges: true, searchPaginationActive: true, actualPage: 1 });
      await this.getChallengesByPageAndStatus(this.state.actualPage, this.state.actualState, true);
   }


   /**
    * Desplegar el modal de elimacion de reto
    */
   showDeleteModal = (idChallenge) => {
      this.setState({ showModal: true, challengeToDelete: idChallenge });
   }


   /**
    * Manejar el cierre del modal
    */
   handleClose = (event) => {
      this.setState({ showModal: false });
   }


   /**
    * Realizar eliminación de un reto tanto del back
    * como del estado del componente.
    */
   deleteChallenge = async () => {
      const idChallenge = this.state.challengeToDelete;
      const token = this.state.token;
      let url = `${process.env.REACT_APP_BACK_URL}/challenges/${idChallenge}`;
      let msg = "";

      this.notify();

      await axios.delete(url, {
         headers: { 'x-auth-token': `${token}` }
      }).then((result) => {
         if (result.status === 200) {
            const totalElements = this.state.totalElements - 1;
            let newChallenges = [];

            _.assign(newChallenges, this.state.renderedChallenges);
            _.remove(newChallenges, function (challenge) {
               return challenge.id_challenge === idChallenge;
            });
            this.setState({
               renderedChallenges: newChallenges,
               showModal: false,
               totalElements
            });
            msg = "Reto eliminado."
            this.updateSuccess(msg);

         }
      }).catch((error) => {
         msg = "Algo salio mal. Intentalo de nuevo."
         this.updateError(msg);
         this.setState({ showModal: false });
      });

      await this.getChallengesByPageAndStatus(this.state.actualPage, this.state.actualState, false);
   }


   notify = () => this.toastId = toast.info("Eliminando...", this.toastConfiguration);


   updateSuccess = (msg) => {
      toast.update(this.toastId, { render: msg, type: toast.TYPE.SUCCESS, toastId: 'C' });
   }


   updateError = (msg) => {
      toast.update(this.toastId, { render: msg, type: toast.TYPE.ERROR, toastId: 'C' });
   }


   render() {
      return (
         <Container fluid ref={this.begginingPage}>
            <Row className="mx-0 justify-content-center h-100" >
               <Col className="d-flex flex-column" xl={11}>
                  <Row className="mx-0 d-flex justify-content-center">
                     <Col>
                        <Row className="my-4 mx-0">
                           <Col md={4} className="d-flex align-items-center order-2 order-sm-2 order-md-1 mt-4 mt-sm-4 mt-md-0">
                              <Form onSubmit={this.handleSearchButton}>
                                 <InputGroup className="mb-3 groupButtonText">
                                    <InputGroup.Prepend className="w-auto">
                                       <Button className="iconButton" variant="outline-secondary" type="submit"></Button>
                                    </InputGroup.Prepend>
                                    <FormControl className="searchChallengeText" aria-describedby="basic-addon1" type="input" placeholder="Buscar reto" name="searchElement" onChange={this.handleChange} />
                                 </InputGroup>
                              </Form>
                           </Col>
                           <Col md={{ span: 4, offset: 4 }} className="order-sm-1 order-1 order-md-2 camaraLogoBox d-flex justify-content-md-end justify-content-center">
                              <img className="camaraLogo" src={innovaCamaraLogo} alt="innovaCamaralogo" />
                           </Col>
                        </Row>
                        <Row className="mx-0 mb-3">
                           <Col sm={12} md={9} className="order-2 order-md-1">
                              <Navbar collapseOnSelect expand="lg">
                                 <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                 <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="align-items-center">
                                       <Nav.Link ref={this.link1} className="circle red navLink mx-4 mx-lg-2 px-0" href="#Unassigned" onClick={(e) => this.handleClickLink(e, "CREATED")}><span>Retos Sin Asignar</span></Nav.Link>
                                       <Nav.Link ref={this.link2} className="circle blue navLink mx-4 mx-lg-2 px-0" href="#Assigned" onClick={(e) => this.handleClickLink(e, "ASSIGNED")}><span>Retos Asignados</span></Nav.Link>
                                       <Nav.Link ref={this.link3} className="circle green navLink mx-4 mx-lg-2 px-0" href="#Finished" onClick={(e) => this.handleClickLink(e, "FINISHED")}><span>Retos Finalizados</span></Nav.Link>
                                    </Nav>
                                 </Navbar.Collapse>
                              </Navbar>
                           </Col>
                           <Col sm={12} md={3} className="order-1 order-md-2 d-flex align-items-center justify-content-xl-end justify-content-center p-0">
                              <Link to="home/challenge" className="linkCreateChallenge"><img className="plusCreateChallenge w-auto mr-1" src={plusSign} alt="Plus"></img>Crear Reto</Link>
                           </Col>
                        </Row>
                     </Col>
                  </Row>

                  {this.state.loadingChallenges ?
                     (
                        <div className="d-flex justify-content-center flex-grow-1">
                           <ReactLoading className="d-flex align-items-center svgContainer" type={"spokes"} color={"#313333"} />
                        </div>
                     )
                     :
                     this.state.renderedChallenges.length > 0 ?
                        (
                           <div>
                              <Row className="mx-0 d-flex flex-column">
                                 {this.state.renderedChallenges.map((item, index) => {
                                    return (
                                       <ChallengeCard
                                          key={index}
                                          challengeName={item.challenge_name}
                                          companyName={item.company.company_name}
                                          companyDescription={item.company.company_description}
                                          challengeDescription={item.challenge_description}
                                          categories={item.categories}
                                          deleteChallenge={() => this.showDeleteModal(item.id_challenge)}
                                       />
                                    );
                                 })
                                 }
                              </Row>
                              {
                                 this.state.totalElements > this.state.elementsDisplayed &&

                                 <Row className="mx-0 d-flex justify-content-center">
                                    <Col xs={8} sm={6} md={4} xl={3} >
                                       <Pagination
                                          activePage={this.state.actualPage}
                                          itemsCountPerPage={this.state.elementsDisplayed}
                                          totalItemsCount={this.state.totalElements}
                                          pageRangeDisplayed={3}
                                          itemClass="page-item boxNumber"
                                          linkClass="page-link boxLink px-0"
                                          innerClass="pagination d-flex justify-content-center align-self-end"
                                          onChange={this.handlePageChange.bind(this)}
                                       />
                                    </Col>
                                 </Row>
                              }
                           </div>
                        )
                        :
                        (
                           <div>
                              <h3 className="mt-3">No se encontraron retos</h3>
                           </div>
                        )
                  }
               </Col>
            </Row>
            <Modal show={this.state.showModal} onHide={this.handleClose}>
               <Modal.Header>
                  <Modal.Title>Eliminar Reto</Modal.Title>
               </Modal.Header>
               <Modal.Body>¿Realmente desea eliminar el reto? Esta acción no se puede deshacer</Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                     Cerrar
                  </Button>
                  <Button variant="danger " onClick={this.deleteChallenge}>
                     Eliminar
                  </Button>
               </Modal.Footer>
            </Modal>
         </Container>
      );
   }
}


export default AllChallenges;