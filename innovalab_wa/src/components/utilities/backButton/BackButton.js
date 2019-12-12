import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';

import backButton from '../../../images/backButton.png';
import './BackButton.css';

const BackButton = (props) => {
	let history = useHistory();

	return (
		<Button variant="link" className={"backButton px-0 d-flex justify-content-start align-items-center "+ props.className} onClick={() => history.goBack()}>
			<Image src={backButton} alt="Back button" className="backButtonImg" />
			Volver
		</Button>
	);
}

export default BackButton;