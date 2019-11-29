import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logoCrear from '../../images/RetosTerminados.png';

import "./CreateAlly.css"

class CreateAlly extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col>
                        aldo
                    </Col>                    
                </Row>

                <Row>
                    <Col>
                        <img src={logoCrear} alt="logo crear aliado" />
                        <h2>Crear Aliado</h2>
                    </Col>
                </Row>

                <Row>
                    <Col>c</Col>
                </Row>
            </Container>
        );
    }
}

export default CreateAlly;