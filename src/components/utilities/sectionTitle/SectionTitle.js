import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './SectionTitle.css';

// Se le debe pasar un objeto como el que se encuentra abajo
// const titleProps = {
//     text: "Crear Nuevo Aliado",
//     img: logoCrear,
//     imgAlt: "logo crear nuevo aliado"
// }
const SectionTitle = (props) => {
    return ( 
        <Row className="my-3 d-flex justify-content-center">
            <Col sm={11} className="sectionTitleBox d-flex justify-content-center align-items-center">
                <img className="sectionTitleLogo" src={props.titleProps.img} alt={props.titleProps.imgAlt} />
                <h3 className="sectionTitleText w-auto ml-2 align-self-center">{props.titleProps.text}</h3>
            </Col>
        </Row>
     );
}
 
export default SectionTitle;