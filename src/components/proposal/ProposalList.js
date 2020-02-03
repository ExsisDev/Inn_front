import React from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import ReactLoading from 'react-loading';

import { getToken } from '../../commons/tokenManagement';
import BackNavigator from "../utilities/backNavigator/BackNavigator";
import ChallengeCard from '../challenge/ChallengeCard';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import propuestasEnviadas from '../../images/PropuestasEnviadas.png';
import propuestasRechazadas from '../../images/PropuetasRechazadas .png';
import propuestasAsignadas from '../../images/PropuestasAsignadas.png';
import retosTerminados from '../../images/RetosTerminados.png';
import './ProposalList.css'

class ProposalList extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         title: "",
         img: "",
         color: "",
         actualPage: 1,
         actualStatus: "",
         totalElements: 0,
         elementsDisplayed: 5,
         renderedChallenges: [],
         nextRoute: "",
         loadingChallenges: false,
         token: getToken()
      }
   }

   async componentDidMount() {
      switch (this.props.location.pathname) {
         case "/home/sendedProposals":
            await this.setState({ color: "green", title: 'Propuestas Enviadas', img: propuestasEnviadas, actualStatus: "SEND", nextRoute: "/home/sendedProposals/details" });
            break;
         case "/home/rejectedProposals":
            await this.setState({ color: "red", title: 'Propuestas Rechazadas', img: propuestasRechazadas, actualStatus: "REJECTED", nextRoute: "/home/sendedProposals/details" });
            break;
         case "/home/assignedProposals":
            await this.setState({ color: "blue", title: 'Propuestas Asignadas', img: propuestasAsignadas, actualStatus: "ASSIGNED", nextRoute: "/home/asignedProposals/details" });
            break;
         case "/home/challengesFinished":
            await this.setState({ color: "yellow", title: 'Retos Terminados', img: retosTerminados, actualStatus: "FINISHED", nextRoute: "/home/challengesFinished/details" });
            break;
         default:
            break;
      }

      await this.getProposalsByPageAndStatus(this.state.actualPage, this.state.actualStatus);
   }


   /**
    * Obtener todos los retos según la página, el estado y opcionalmente una palabra clave
    */
   async getProposalsByPageAndStatus(page, status) {

      let url = `${process.env.REACT_APP_BACK_URL}/proposals/${status}/${page}`;
      const token = this.state.token;

      await this.setState({ loadingChallenges: true });

      await axios.get(url, {
         headers: { 'x-auth-token': `${token}` }

      }).then((result) => {
         if (result.data) {
            this.setState({ renderedChallenges: result.data.result, totalElements: result.data.count, loadingChallenges: false });
         }
      }).catch((error) => {
         this.setState({ renderedChallenges: [], totalElements: 0, loadingChallenges: false });

      });

      // await this.begginingPage.current.scrollIntoView();
   }


   /**
    * Cambiar el indice de la página actual
    * @param {Number} pageNumber 
    */
   async handlePageChange(pageNumber) {
      await this.setState({ actualPage: pageNumber, loadingChallenges: true });
      await this.getProposalsByPageAndStatus(pageNumber, this.state.actualStatus);
   }


   render() {
      return (
         <Container fluid>
            <Row className="mx-0 justify-content-center h-100" >
               <Col className="d-flex flex-column" xl={11}>
                  <Row className="mx-0 d-flex justify-content-center">
                     <Col>
                        <BackNavigator />
                        <SectionTitle titleProps={{ img: this.state.img, imgAlt: 'Titulo0', text: this.state.title }} />
                     </Col>
                  </Row>
                  {this.state.loadingChallenges ?
                     (
                        <div className="d-flex justify-content-center flex-grow-1">
                           <ReactLoading className="d-flex align-items-center allChallengesSvgContainer" type={"spokes"} color={"#313333"} />
                        </div>
                     )
                     :
                     (
                        this.state.renderedChallenges.length > 0 ?
                           (
                              <div>
                                 <Row className="mx-0 d-flex flex-column">
                                    {this.state.renderedChallenges.map((item, index) => {
                                       return (
                                          <ChallengeCard
                                             key={index}
                                             selectedNextRoute={this.state.nextRoute}
                                             challengeId={item.challenge.id_challenge}
                                             challengeName={item.challenge.challenge_name}
                                             challengeDescription={item.challenge.challenge_description}
                                             companyName={item.challenge.company.company_name}
                                             companyDescription={item.challenge.company.company_description}
                                             categories={item.categories}
                                             color={this.state.color}
                                             proposalData={{ 
                                                solution_description: item.solution_description, 
                                                resources_description: item.proposal_resources, 
                                                proposal_state_name: item.proposal_state.proposal_state_name}}
                                          />
                                       );
                                    })}
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
                                 <h3 className="mt-3">No se encontraron elementos</h3>
                              </div>
                           )
                     )
                  }
               </Col>
            </Row>
         </Container>
      )
   }

}



export default ProposalList;


