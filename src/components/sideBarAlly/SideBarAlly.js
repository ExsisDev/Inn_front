import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { IoIosLogOut } from 'react-icons/io';

import { logOut } from '../../commons/tokenManagement';
import logoAlly from '../../images/EmpresaA.png';
import './SideBarAlly.css';

class SideBar extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         redirectionActive: false,
         classState: props.className
      }

      this.sideBarAlly = React.createRef();
   }


   render() {
      return (
         <div >
            <Container ref={this.sideBarAlly} id="sideNav" className={`d-flex flex-column ${this.props.className}`}>
               <a href="javascript:void(0)" id="closeBtn" onClick={this.props.handleClassStateBtn}>&times;</a>
               <Row className="d-flex justify-content-center">
                  <Col xs={8}>
                     <Link to="/ally/profile" >
                        <img className="sideBarAllyLogo rounded-circle w-100" src={logoAlly} alt="Ally logo" />
                     </Link>
                  </Col>
               </Row>
               <Row className="mt-3">
                  <Col>
                     <div className="sideBarAllyText d-flex justify-content-center align-items-center">
                        <h3 className="bigText">Empresa</h3>
                     </div>
                  </Col>
               </Row>
               <Row className="sideBarAllyLinkBox">
                  <Col>
                     <Link to="/home" className="d-flex justify-content-center align-items-center h-100 w-100">
                        <div className="">
                           <p className="midText">Todos los retos</p>
                        </div>
                     </Link>
                  </Col>
               </Row>
               <Row className="sideBarAllyLinkBox">
                  <Col>
                     <Link to="/home/ongoingChallenges" className="d-flex justify-content-center align-items-center h-100 w-100">
                        <div className="">
                           <p className="midText">Retos en curso</p>
                        </div>
                     </Link>
                  </Col>
               </Row>
               <Row className="sideBarAllyLinkBox mt-auto">
                  <Col>
                     <a onClick={logOut} href="/" className="d-flex justify-content-center align-items-center h-100 w-100">
                        <div className="sideBarAllyLinkBox d-flex justify-content-center align-items-center">
                           <IconContext.Provider value={{ color: "white" }}>
                              <p className="midText"><IoIosLogOut /><span className="ml-2">Cerrar sesión</span></p>
                           </IconContext.Provider>
                        </div>
                     </a>
                  </Col>
               </Row>
            </Container>
            <span style={{ fontSize: "30px", cursor: "pointer", position: "fixed", zIndex: "50" }} onClick={this.props.handleClassStateBtn}>&#9776;</span>
         </div>
      );
   }
}

export default SideBar;