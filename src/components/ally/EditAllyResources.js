import React from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import _ from 'lodash';

import HeaderWithUserLogo from '../utilities/headerWithUserLogo/HeaderWithUserLogo';
import HumanResourceList from '../utilities/humanResource/HumanResourceList';
import { getToken } from '../../commons/tokenManagement';
import img from '../../images/EmpresaA.png';

class EditAllyResources extends React.Component {
    constructor() {
        super();
        this.state = {
            allyResources: []
        }
    }

    
    componentDidMount() {
        this.chargeResourcesToState();
    }

    /**
     * Obtener recursos asociados al aliado y guardarlos en el estado
     */
    chargeResourcesToState() {
        const idAlly = this.props.match.params.idAlly
        const token = getToken();
        const url = `${process.env.REACT_APP_BACK_URL}/resources/${idAlly}`;
        axios.get(url, { headers: { 'x-auth-token': `${token}` } })
            .then(res => {
                this.setState({ allyResources: res.data });
            })
            .catch(error => {
                console.log(error);
                console.log("Algo salió mal");
            });
    }

    render() {
        return (
            <Container className="p-0" fluid>
                <ToastContainer />
                <HeaderWithUserLogo source={img} />
                <Row>
                    <Col>                        
                        <h1>Eliminar Recursos</h1>
                        <div className="px-5">
                            <HumanResourceList cols="3" 
                                               people={this.state.allyResources}
                                               edit 
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default EditAllyResources;