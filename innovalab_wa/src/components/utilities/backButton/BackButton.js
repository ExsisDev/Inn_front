import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';

import backButtonImg from '../../../images/backButton.png';
import backButtonBlackImg from '../../../images/backButtonBlack.PNG';
import './BackButton.css';


/**
 * Recibe: 
 * - dark: para renderizar en fondo negro
 * - className: para asignar clases al boton
 * @param {Object} props 
 */
const BackButton = (props) => {
	let black = "";
	let backBtn = backButtonImg;
	let history = useHistory();

	if (props.dark) {
		black = "black";
		backBtn = backButtonBlackImg;
  }

	return (
		<Button variant="link" className={"backButton px-0 d-flex justify-content-start align-items-center " + props.className + black} onClick={() => history.goBack()}>
			<Image src={backBtn} alt="Back button" className="backButtonImg" />
			Volver
		</Button>
	);
}

export default BackButton;