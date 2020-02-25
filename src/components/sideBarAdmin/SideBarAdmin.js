import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { IoIosLogOut } from 'react-icons/io';

import { logOut } from '../../commons/tokenManagement';
import logoAdmin from '../../images/logoAdmin.png';
import './SideBarAdmin.css';

class SideBar extends React.Component {

   constructor() {
      super();
      this.state = {
         redirectionActive: false
      }
   }

   render() {
      return (
         <div className="sideBarAdminLateralBar d-flex flex-column">
            <div className="sideBarAdminLogoBox d-flex justify-content-center">
               <span>
                  <Link to="/adminProfile" className="w-auto">
                     <img className="sideBarAdminLogo align-self-center" src={logoAdmin} alt="Admin logo" />
                  </Link>
               </span>
            </div>
            <div className="sideBarAdminText d-flex align-items-center">
               <h3>Administrador</h3>
            </div>
            <Link to="/home" >
               <div className="sideBarAdminLinkBox d-flex align-items-center">
                  <p>Retos</p>
               </div>
            </Link>
            <Link to="/home/ally" >
               <div className="sideBarAdminLinkBox d-flex align-items-center">
                  <p>Administrar usuarios</p>
               </div>
            </Link>
            <a className="mt-auto" onClick={logOut} href="/">
               <div className="sideBarAdminLinkBox d-flex align-items-center">
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