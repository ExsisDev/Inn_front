import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { IoIosLogOut } from 'react-icons/io';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import img from '../../images/EmpresaA.png';
import './EditAlly.css';

class EditAlly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Container className="p-0" fluid>
                <Row className="m-0 bckgndEditAlly">
                    <Col className="d-flex flex-column align-items-center pl-5">
                        <BackNavigator dark />
                    </Col>
                    <Col md={{span: 4, offset: 4}} className="companyImageCol mt-5">
                        <Image className="imgEditAlly" src={img}
                            alt="logo de la compañia"
                            roundedCircle
                        />
                        <h3 className="companyNameEditAlly mt-4">Empresa A</h3>
                    </Col>
                </Row>
                <Row className="m-0 bckgndEditAlly">
                    <Col sm="2" className="pl-4 logoutBox" >
                        <Button variant="link"
                            className="logoutBtn d-flex align-items-center"
                        >
                            <IconContext.Provider value={{ color: "white", size: "2rem", className: "logoutIcon" }}>
                                <IoIosLogOut />
                            </IconContext.Provider>
                            Cerrar Sesión
                        </Button>
                    </Col>                    
                </Row>
            </Container>
        );
    }
}

export default EditAlly;