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
            <Container ref={this.sideBarAlly} className="sideNav d-flex flex-column align-items-center">
               <a href="javascript:void(0)" id="closeBtn" onClick={this.closeNav}>&times;</a>
               <Row className="row d-flex justify-content-center">
                  <Col xs={8}>
                     <Link to="/adminProfile" >
                        <img className="sideBarAllyLogo rounded-circle w-100" src={logoAlly} alt="Admin logo" />
                     </Link>
                  </Col>
               </Row>
               <Row className="mt-3">
                  <Col>
                     <div className="sideBarAllyText d-flex align-items-center">
                        <h3 className="bigText">Empresa</h3>
                     </div>
                  </Col>
               </Row>
               <Row className="w-100">
                  <Col className="p-0">
                     <Link to="/home">
                        <div className="sideBarAllyLinkBox d-flex align-items-center justify-content-center">
                           <p className="midText">Todos los retos</p>
                        </div>
                     </Link>
                  </Col>
               </Row>
               <Row className="w-100">
                  <Col className="p-0">
                     <Link to="/home/ongoingChallenges">
                        <div className="sideBarAllyLinkBox d-flex align-items-center justify-content-center">
                           <p className="midText">Retos en curso</p>
                        </div>
                     </Link>
                  </Col>
               </Row>
               <Row className="mt-auto w-100">
                  <Col className="p-0">
                     <a  onClick={logOut} href="/">
                        <div className="sideBarAllyLinkBox d-flex align-items-center justify-content-center">
                           <IconContext.Provider value={{ color: "white" }}>
                              <p className="midText"><IoIosLogOut /><span className="ml-2">Cerrar sesión</span></p>
                           </IconContext.Provider>
                        </div>
                     </a>
                  </Col>
               </Row>
            </Container>
            {/* <span style={{ fontSize: "30px", cursor: "pointer", position: "fixed" }} onClick={this.openNav}>&#9776;</span> */}
         </div>
         // <div className="sideBarAllyLateralBar d-flex flex-column">
         //    <div className="sideBarAllyBox d-flex justify-content-center mt-2">
         //       <span>
         //          <Link to="/adminProfile" className="w-auto">
         //             <img className="sideBarAllyLogo align-self-center rounded-circle" src={logoAlly} alt="Admin logo" />
         //          </Link>
         //       </span>
         //    </div>
         // <div className="sideBarAllyText d-flex align-items-center">
         //    <h3>Empresa</h3>
         // </div>
         //    <Link to="/home" >
         //       <div className="sideBarAllyLinkBox d-flex align-items-center">
         //          <p>Todos los retos</p>
         //       </div>
         //    </Link>
         //    <Link to="/home/ongoingChallenges" >
         //       <div className="sideBarAllyLinkBox d-flex align-items-center">
         //          <p>Retos en curso</p>
         //       </div>
         //    </Link>
         //    <a className="mt-auto" onClick={logOut} href="/">
         //       <div className="sideBarAllyLinkBox d-flex align-items-center">
         //          <IconContext.Provider value={{ color: "white", className: "logoutIcon" }}>
         //             <p><IoIosLogOut /><span>Cerrar sesión</span></p>
         //          </IconContext.Provider>
         //       </div>
         //    </a>
         // </div>
      );
   }
}

export default SideBar;