import React from 'react';
import { Container } from 'react-bootstrap';
import HeaderWithUserLogo from '../utilities/headerWithUserLogo/HeaderWithUserLogo';

import img from '../../images/EmpresaA.png';
import './EditAlly.css';

class EditAlly extends React.Component {

    render() {
        return (
            <Container className="p-0" fluid>
                <HeaderWithUserLogo source={img}/>
            </Container>
        );
    }
}

export default EditAlly;