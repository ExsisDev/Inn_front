import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import HeaderWithUserLogo from '../utilities/headerWithUserLogo/HeaderWithUserLogo';
import img from '../../images/EmpresaA.png';

class EditResources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resources: props.location.state.resources
        }
    }
    render() {
        console.log(this.state.resources);
        
        return (
            <Container className="p-0" fluid>
                <ToastContainer />
                <HeaderWithUserLogo source={img} />
                <Row>
                    <Col>
                        <h1>Editar Recursos</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default EditResources;