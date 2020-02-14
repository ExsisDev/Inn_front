import React from 'react';
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
            <div ref={this.sideBarAlly} className="sideNav d-flex flex-column align-items-center">
               <a href="javascript:void(0)" id="closeBtn" onClick={this.closeNav}>&times;</a>
               <span>
                  <Link to="/adminProfile" className="w-auto">
                     <img className="sideBarAllyLogo rounded-circle" src={logoAlly} alt="Admin logo" />
                  </Link>
               </span>
               {/* <Link to="/adminProfile" className="d-flex justify-content-center">
                  <img className="sideBarAllyLogo align-self-center rounded-circle" src={logoAlly} alt="Admin logo" />
               </Link> */}
               <div className="sideBarAllyText d-flex align-items-center">
                  <h3>Empresa</h3>
               </div>
               <Link to="/home" className="">
                  <div className="sideBarAllyLinkBox d-flex align-items-center justify-content-center">
                     <p>Todos los retos</p>
                  </div>
               </Link>
               <Link to="/home/ongoingChallenges" className="">
                  <div className="sideBarAllyLinkBox d-flex align-items-center justify-content-center">
                     <p>Retos en curso</p>
                  </div>
               </Link>
               <a className="mt-auto " onClick={logOut} href="/">
                  <div className="sideBarAllyLinkBox d-flex align-items-center justify-content-center">
                     <IconContext.Provider value={{ color: "white", className: "logoutIcon" }}>
                        <p><IoIosLogOut /><span>Cerrar sesión</span></p>
                     </IconContext.Provider>
                  </div>
               </a>
            </div>
            <span style={{ fontSize: "30px", cursor: "pointer", position: "fixed" }} onClick={this.openNav}>&#9776;</span>
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