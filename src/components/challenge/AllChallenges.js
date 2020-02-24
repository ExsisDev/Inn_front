import React from 'react';
import axios from "axios";
import { Container, Row, Col, Nav, Navbar, Button, Modal } from 'react-bootstrap';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Pagination from "react-js-pagination";
import ReactLoading from 'react-loading';
import ChallengeCard from './ChallengeCard';

import SearchChallenge from '../utilities/searchChallenge/SearchChallenge';
import plusSign from '../../images/newChallenge.png';
import { getToken, getTokenData } from '../../commons/tokenManagement';
import 'react-toastify/dist/ReactToastify.css';
import './AllChallenges.css'


class AllChallenges extends React.Component {

   constructor() {
      super();
      this.state = {
         renderedChallenges: [],
         actualPage: 1,
         actualStatus: "CREATED",
         loadingChallenges: true,
         totalElements: 0,
         searchElement: "",
         searchPaginationActive: false,
         showModal: false,
         challengeToDelete: null,
         elementsDisplayed: 5,
         isAdminFunctionality: false,
         token: getToken(),
         role: 0
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

   ALLY = 1;
   ADMIN = 2;


   componentDidMount() {
      const tokenData = getTokenData(this.state.token);
      this.setState({ role: tokenData.fk_id_role });

      if (tokenData.fk_id_role === this.ADMIN) {
         this.setState({ isAdminFunctionality: true }, () => {
            this.link1.current.click();
         });
      } else {
         this.handleClickLink(null, this.state.actualStatus);
      }
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
      await this.setState({ actualStatus: state, loadingChallenges: true, searchPaginationActive: false, actualPage: 1 });
      await this.getChallengesByPageAndStatus(this.state.actualPage, state, false);
   }


   /**
    * Cambiar el indice de la página actual
    * @param {Number} pageNumber 
    */
   async handlePageChange(pageNumber) {
      await this.setState({ actualPage: pageNumber, loadingChallenges: true });
      await this.getChallengesByPageAndStatus(pageNumber, this.state.actualStatus, this.state.searchPaginationActive);
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
      await this.getChallengesByPageAndStatus(this.state.actualPage, this.state.actualStatus, true);
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

      await this.getChallengesByPageAndStatus(this.state.actualPage, this.state.actualStatus, false);
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
         <Container fluid ref={this.begginingPage} id="allChallengesComponent" className="d-flex flex-column h-100">
            <SearchChallenge handleChange={this.handleChange} handleSearchButton={this.handleSearchButton} />
            {
               this.state.isAdminFunctionality ?
                  (
                     <Row className="d-flex justify-content-center mt-4">
                        <Col xs={12} className="d-flex justify-content-center order-2">
                           <Navbar collapseOnSelect expand="lg" className="d-flex justify-content-center w-100">
                              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                              <Navbar.Collapse id="responsive-navbar-nav">
                                 <Nav className="d-flex align-items-center w-100">
                                    <Nav.Link ref={this.link1} className="text-center allChallengesCircle allChallengesRed allChallengesNavLink mx-4 mx-lg-2 px-0" href="#Unassigned" onClick={(e) => this.handleClickLink(e, "CREATED")}><span>Retos Sin Asignar</span></Nav.Link>
                                    <Nav.Link ref={this.link2} className="text-center allChallengesCircle allChallengesBlue allChallengesNavLink mx-4 mx-lg-2 px-0" href="#Assigned" onClick={(e) => this.handleClickLink(e, "ASSIGNED")}><span>Retos Asignados</span></Nav.Link>
                                    <Nav.Link ref={this.link3} className="text-center allChallengesCircle allChallengesGreen allChallengesNavLink mx-4 mx-lg-2 px-0" href="#Finished" onClick={(e) => this.handleClickLink(e, "FINISHED")}><span>Retos Finalizados</span></Nav.Link>
                                    <Nav.Link href="home/challenge" className="allChallengesCreateLink mt-2"><img className="allChallengesPlusImg" src={plusSign} alt="Plus"></img><span className="ml-2">Crear Reto</span></Nav.Link>
                                 </Nav>
                              </Navbar.Collapse>
                           </Navbar>
                        </Col>
                     </Row>
                  )
                  :
                  (
                     <div className="bigSpace"></div>
                  )
            }
            <Row className="mt-4 px-4 flex-grow-1">
               {this.state.loadingChallenges ?
                  (
                     <Col className="d-flex justify-content-center align-items-center">
                        <ReactLoading className="" type={"spokes"} color={"#313333"} />
                     </Col>
                  )
                  :
                  this.state.renderedChallenges.length > 0 ?
                     (
                        <Col>
                           <Row className="mx-0 flex-column">
                              {this.state.renderedChallenges.map((item, index) => {
                                 return (
                                    <ChallengeCard
                                       key={index}
                                       selectedNextRoute="/home/challengeDescription"
                                       challengeId={item.id_challenge}
                                       challengeName={item.challenge_name}
                                       companyName={item.company.company_name}
                                       companyDescription={item.company.company_description}
                                       challengeDescription={item.challenge_description}
                                       categories={item.categories}
                                       deleteChallenge={() => this.showDeleteModal(item.id_challenge)}
                                       isUserAnAdmin={this.state.isAdminFunctionality}
                                       challengeDate={new Date(item.close_date).getDate() + "/" + (new Date(item.close_date).getMonth() + 1) + "/" + new Date(item.close_date).getFullYear()}
                                    />
                                 );
                              })
                              }
                           </Row>
                           {
                              this.state.totalElements > this.state.elementsDisplayed &&

                              <Row className="mx-0 mb-4 justify-content-center">
                                 <Col xs={8} sm={6} md={4} xl={3} >
                                    <Pagination
                                       activePage={this.state.actualPage}
                                       itemsCountPerPage={this.state.elementsDisplayed}
                                       totalItemsCount={this.state.totalElements}
                                       pageRangeDisplayed={3}
                                       itemClass="page-item"
                                       linkClass="page-link linkPage px-0 text-center"
                                       innerClass="pagination d-flex justify-content-center"
                                       onChange={this.handlePageChange.bind(this)}
                                    />
                                 </Col>
                              </Row>
                           }
                        </Col>
                     )
                     :
                     (
                        <div>
                           <h3 className="mt-3">No se encontraron retos</h3>
                        </div>
                     )
               }
            </Row>
            <Modal show={this.state.showModal} onHide={this.handleClose}>
               <Modal.Header>
                  <Modal.Title>Eliminar Reto</Modal.Title>
               </Modal.Header>
               <Modal.Body>¿Realmente desea eliminar el reto? Esta acción no se puede deshacer</Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose} className="normalText">
                     Cerrar
                  </Button>
                  <Button variant="danger " onClick={this.deleteChallenge} className="normalText">
                     Eliminar
                  </Button>
               </Modal.Footer>
            </Modal>
         </Container>
      );
   }
}


export default AllChallenges;