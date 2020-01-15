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
   }

   render() {
      return (
         <div className="lateralBar d-flex flex-column">
            <div className="logoAdminBox d-flex justify-content-center">
               <span>
                  <Link to="/adminProfile" className="w-auto">
                     <img className="logoAlly align-self-center rounded-circle" src={logoAlly} alt="Admin logo" />
                  </Link>
               </span>
            </div>
            <div className="adminText d-flex align-items-center">
               <h3>Empresa</h3>
            </div>
            <Link to="/home" >
               <div className="sideLinkBox d-flex align-items-center">
                  <p>Todos los retos</p>
               </div>
            </Link>
            <Link to="/home/ally" >
               <div className="sideLinkBox d-flex align-items-center">
                  <p>Retos en curso</p>
               </div>
            </Link>
            <a className="mt-auto" onClick={logOut} href="/">
               <div className="sideLinkBox d-flex align-items-center">
                  <IconContext.Provider value={{ color: "white", className: "logoutIcon" }}>
                     <p><IoIosLogOut /><span>Cerrar sesión</span></p>
                  </IconContext.Provider>
               </div>
            </a>
         </div>
      );
   }
}

export default SideBar;