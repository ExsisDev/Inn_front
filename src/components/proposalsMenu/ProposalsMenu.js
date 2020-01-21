import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import innovaCamaraLogo from '../../images/innovaCamaraLogo.png';
import propuestasEnviadas from '../../images/PropuestasEnviadas.png';
import propuestasRechazadas from '../../images/PropuetasRechazadas .png';
import propuestasAsignadas from '../../images/PropuestasAsignadas.png';
import retosTerminados from '../../images/RetosTerminados.png';
import './ProposalsMenu.css';


const ProposalsMenu = () => {
   return (
      <Container>
         <Row className="mx-0 justify-content-center h-100" >
            <Col className="d-flex flex-column" xl={11}>
               <Row className="mx-0 d-flex justify-content-center">
                  <Col>
                     <Row className="my-4 mx-0">
                        <Col md={{ span: 4, offset: 8 }} className="order-sm-1 order-1 order-md-2 camaraLogoBox d-flex justify-content-md-end justify-content-center">
                           <img className="camaraLogo" src={innovaCamaraLogo} alt="innovaCamaralogo" />
                        </Col>
                     </Row>
                  </Col>
               </Row>
               <Row className="mx-0 h-100 d-flex justify-content-center">
                  <Col xs={12} md={6} className="d-flex flex-column align-items-center justify-content-start justify-content-md-center mb-3 mb-md-0">
                     <img className="proposalsMenuImgButton rounded-circle" src={propuestasEnviadas} alt="Propuestas enviadas" />
                     <span className="proposalMenuTextButton mt-3">Propuestas Enviadas</span>
                  </Col>
                  <Col xs={12} md={6} className="d-flex flex-column align-items-center justify-content-start justify-content-md-center mb-3 mb-md-0">
                     <img className="proposalsMenuImgButton rounded-circle" src={propuestasRechazadas} alt="Propuestas rechazadas" />
                     <span className="proposalMenuTextButton mt-3">Propuestas Rechazadas</span>
                  </Col>
                  <Col xs={12} md={6} className="d-flex flex-column align-items-center mb-3 mb-md-0">
                     <img className="proposalsMenuImgButton rounded-circle" src={propuestasAsignadas} alt="Propuestas asignadas" />
                     <span className="proposalMenuTextButton mt-3">Propuestas Asignadas</span>
                  </Col>
                  <Col xs={12} md={6} className="d-flex flex-column align-items-center mb-3 mb-md-0">
                     <img className="proposalsMenuImgButton rounded-circle" src={retosTerminados} alt="Propuestas asignadas" />
                     <span className="proposalMenuTextButton mt-3">Retos Terminados</span>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Container>
   )
}

export default ProposalsMenu;