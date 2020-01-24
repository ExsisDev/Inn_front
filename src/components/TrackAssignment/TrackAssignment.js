import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import LogoTitle from '../../images/PropuestasAsignadas.png';
import './TrackAssignment.css'

class TrackAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const titleProps = {
            text: "Reto en Desarrollo",
            img: LogoTitle,
            imgAlt: "logo reto en desarrollo"
        }
        return ( 
            <Container className="d-flex flex-column align-items-center px-5">
                <BackNavigator />
                <SectionTitle titleProps={titleProps} className=""/>
                <Row className="my-3 formBox">
                    <Col>
                        <h1>probando que sirva el color</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TrackAssignment;