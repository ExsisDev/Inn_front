import React from 'react';
import axios from "axios";
import { Container, Row, Col, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Pagination from "react-js-pagination";
import ReactLoading from 'react-loading';
import ChallengeCard from './ChallengeCard';
import innovaCamaraLogo from '../../images/innovaCamaraLogo.png';
import plusSign from '../../images/newChallenge.png';
import './AllChallenges.css'


class AllChallenges extends React.Component {

   constructor() {
      super();
      this.state = {
         renderedChallenges: [],
         actualPage: 1,
         actualState: "CREATED",
         loadingChallenges: true,
         totalElements: 0
      }
      this.link1 = React.createRef();
      this.link2 = React.createRef();
      this.link3 = React.createRef();
   }


   componentDidMount() {
      this.link1.current.click();
   }


   /**
   * Obtener el token desde localStorage
   * @return {String} token 
   */
   getToken() {
      let token = localStorage.getItem('auth-token');
      // let tokenElements = jwt.verify(token, `${process.env.REACT_APP_PRIVATE_KEY}`);
      return token;
   }


   /**
    * Obtener todos los retos según la página y el estado
    */
   getChallengesByPageAndStatus(page, status) {
      const url = `${process.env.REACT_APP_BACK_URL}/challenges/${page}/${status}`;
      const token = this.getToken();

      axios.get(url, {
         headers: { 'x-auth-token': `${token}` }
      }).then((result) => {
         if (result.data) {
            this.setState({ renderedChallenges: result.data.result, totalElements: result.data.totalElements, loadingChallenges: false });
         }
      }).catch((error) => {
         this.setState({ renderedChallenges: [], totalElements: [], loadingChallenges: false });
         console.log(error);

      });
   }


   /**
    * Cambiar el estado actual de los retos mostrados (barra de links) 
    */
   handleClickLink(e, state) {
      this.setState({ actualState: state, loadingChallenges: true }, () => { this.getChallengesByPageAndStatus(this.state.actualPage, state) });
   }


   /**
    * Cambiar el indice de la página actual
    * @param {Number} pageNumber 
    */
   handlePageChange(pageNumber) {
      this.setState({ actualPage: pageNumber, loadingChallenges: true }, () => { this.getChallengesByPageAndStatus(pageNumber, this.state.actualState) });
   }


   render() {
      return (
         <Container fluid>
            <Row className="mx-0 justify-content-center h-100">
               <Col className="d-flex flex-column" xl={11}>
                  <Row className="mx-0 d-flex justify-content-center">
                     <Col>
                        <Row className="my-4 mx-0">
                           <Col md={4} className="d-flex align-items-center order-2 order-sm-2 order-md-1 mt-4 mt-sm-4 mt-md-0">
                              <Form.Control className="searchChallengeText formInput m-0 pl-5" type="input" placeholder="Buscar reto" />
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
                                 {this.state.renderedChallenges.map((item) => {
                                    return (
                                       <ChallengeCard
                                          challengeName={item.challenge_name}
                                          companyName={item.company.company_name}
                                          companyDescription={item.company.company_description}
                                          challengeDescription={item.challenge_description}
                                          categories={item.categories}
                                       />
                                    );
                                 })
                                 }
                              </Row>

                              <Row className="mx-0 d-flex justify-content-center">
                                 <Col xs={8} sm={6} md={4} xl={3} >
                                    <Pagination
                                       activePage={this.state.actualPage}
                                       itemsCountPerPage={5}
                                       totalItemsCount={this.state.totalElements}
                                       pageRangeDisplayed={3}
                                       itemClass="page-item boxNumber"
                                       linkClass="page-link boxLink px-0"
                                       innerClass="pagination d-flex justify-content-center align-self-end"
                                       onChange={this.handlePageChange.bind(this)}
                                    />
                                 </Col>
                              </Row>
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
         </Container>
      );
   }
}


export default AllChallenges;