import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { IoIosLogOut } from 'react-icons/io';

import { logOut } from '../../commons/tokenManagement';
import logoAlly from '../../images/EmpresaA.png';
import './SideBarAlly.css';

class SideBar extends React.Component {

   constructor() {
      super();
      this.state = {
         redirectionActive: false
      }

      this.sideBarAlly = React.createRef();
      this.openNav = this.openNav.bind(this);
      this.closeNav = this.closeNav.bind(this);
   }

   componentDidMount() {
   }

   closeNav() {
      this.sideBarAlly.current.style.width = "0";
   }

   openNav() {
      this.sideBarAlly.current.style.width = "250px";
   }

   render() {
      return (
         <div>
            <Container ref={this.sideBarAlly} id="sideNav" className="d-flex flex-column">
               <a href="javascript:void(0)" id="closeBtn" onClick={this.closeNav}>&times;</a>
               <Row className="d-flex justify-content-center">
                  <Col xs={8}>
                     <Link to="/adminProfile" >
                        <img className="sideBarAllyLogo rounded-circle w-100" src={logoAlly} alt="Admin logo" />
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
                  <Col className="d-flex justify-content-center align-items-center">
                     <Link to="/home">
                        <div className="">
                           <p className="midText">Todos los retos</p>
                        </div>
                     </Link>
                  </Col>
               </Row>
               <Row className="sideBarAllyLinkBox">
                  <Col className="d-flex justify-content-center align-items-center">
                     <Link to="/home/ongoingChallenges">
                        <div className="">
                           <p className="midText">Retos en curso</p>
                        </div>
                     </Link>
                  </Col>
               </Row>
               <Row className="sideBarAllyLinkBox mt-auto">
                  <Col>
                     <a onClick={logOut} href="/">
                        <div className="sideBarAllyLinkBox d-flex justify-content-center align-items-center">
                           <IconContext.Provider value={{ color: "white" }}>
                              <p className="midText"><IoIosLogOut /><span className="ml-2">Cerrar sesión</span></p>
                           </IconContext.Provider>
                        </div>
                     </a>
                  </Col>
               </Row>
            </Container>
            <span style={{ fontSize: "30px", cursor: "pointer", position: "fixed" }} onClick={this.openNav}>&#9776;</span>
         </div>
      );
   }
}

export default SideBar;