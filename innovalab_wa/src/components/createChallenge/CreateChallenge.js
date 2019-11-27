import React from 'react';
import { Container, Row } from 'react-bootstrap';

import './CreateChallenge.css';
import SideBarAdmin from '../sideBarAdmin/SideBarAdmin';
import backButton from '../../images/backButton.png';
import innovaCamaraLogo from '../../images/innovaCamaraLogo.png';
import newChallenge from '../../images/newChallenge.png';

const CreateChallenge = () => {
   return (
      <Container className="creationBackground d-flex" fluid>
         <SideBarAdmin />
         <Row className="elementsRow flex-column flex-nowrap ">
            <a className="mt-auto" href="#">
               <div className="backButton d-flex">
                  <img className="align-self-center" src={backButton} alt="Back button" />
               </div>
            </a>
            <div className="logoHeader ml-auto">
               <img className="camaraLogo align-self-center" src={innovaCamaraLogo} alt="logo icon" />
            </div>
            <div className="createNewChallengeText d-flex justify-content-center">
               <img className="plusSign" src={newChallenge} alt="New Challenge"/>
               <h3 className="newChallengeText align-self-center">Crear Nuevo Reto</h3>
            </div>
            <div className="formCreation">
               <div className="imageFormCreation">
                  image form
               </div>
               <div className="formData ml-auto">
                  Form
               </div>
            </div>
         </Row>
      </Container>
   );
}

export default CreateChallenge;