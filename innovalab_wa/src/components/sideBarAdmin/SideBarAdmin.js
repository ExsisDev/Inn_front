import React from 'react';

import logoAdmin from '../../images/logoAdmin.png';
import { IconContext } from "react-icons";
import { IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';

import './SideBarAdmin.css';

const SideBar = () => {
   return (
      <div className="lateralBar d-flex flex-column">
         <div className="logoAdminBox d-flex justify-content-center">
            <span>
               <Link to="/adminProfile" className="w-auto">
                  <img className="logoAdmin align-self-center" src={logoAdmin} alt="Admin logo" />
               </Link>
            </span>
         </div>
         <div className="adminText d-flex align-items-center">
            <h3>Administrador</h3>
         </div>
         <Link to="/home" >
            <div className="sideLinkBox d-flex align-items-center">
               <p>Retos</p>
            </div>
         </Link>
         <a href="#">
            <div className="sideLinkBox d-flex align-items-center">
               <p>Administrar usuarios</p>
            </div>
         </a>
         <a className="mt-auto" href="#">
            <div className="sideLinkBox d-flex align-items-center">
               <IconContext.Provider value={{ color: "white", className: "logoutIcon" }}>
                  <p><IoIosLogOut /><span>Cerrar sesión</span></p>
               </IconContext.Provider>
            </div>
         </a>
      </div>
   );
}

export default SideBar;