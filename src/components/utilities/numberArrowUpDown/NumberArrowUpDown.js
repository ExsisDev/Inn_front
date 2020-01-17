import React from 'react';
import { Button } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

import './NumberArrowUpDown.css';


/**
 * Renderiza los numeros de horas para los formularios
 * - recibe un número de horas en los prop: hours
 * @param {*} props 
 */

const NumberArrowUpDown = (props) => {

   let addClasses = "";
   if (props.className){
      addClasses = props.className;
   }

   return (
      <div className="d-flex align-items-center justify-content-center">
         <span className={"w-auto m-2 numberArrowUpDownHours " + addClasses} >
            {props.hours}
         </span>
         <div className="d-flex flex-column w-auto">
            <IconContext.Provider value={{ size: "30px", color: "#747474", style:{marginBottom: "-14px"} }}>
               <Button variant="link" className="w-auto p-0" onClick={props.handleUpArrow}><IoIosArrowUp /></Button>
            </IconContext.Provider>
            <IconContext.Provider value={{ size: "30px", color: "#747474", className: "" }}>
               <Button variant="link" className="w-auto p-0" onClick={props.handleDownArrow}><IoIosArrowDown /></Button>
            </IconContext.Provider>
         </div>
      </div>
   )
}

export default NumberArrowUpDown;