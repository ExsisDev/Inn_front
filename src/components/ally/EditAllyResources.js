import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import _ from 'lodash';

import HeaderWithUserLogo from '../utilities/headerWithUserLogo/HeaderWithUserLogo';
import HumanResourceList from '../utilities/humanResource/HumanResourceList';
import { getToken } from '../../commons/tokenManagement';
import img from '../../images/EmpresaA.png';
import './EditAllyResources.css';

class EditAllyResources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allyResources: [],
            idAlly: props.match.params.idAlly,
            showModal: false,
            idResourceToDelete: 0,
            isLoading: true,
        };
        this.toastConfiguration = {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            closeButton: false,
            containerId: 'A'
        };
        this.toastId = null;
    }


    componentDidMount() {
        this.chargeResourcesToState();
    }

    /**
     * Obtener recursos asociados al aliado y guardarlos en el estado
     */
    chargeResourcesToState() {
        const token = getToken();
        const url = `${process.env.REACT_APP_BACK_URL}/resources/${this.state.idAlly}`;
        axios.get(url, { headers: { 'x-auth-token': `${token}` } })
            .then(res => {
                this.setState({ allyResources: res.data, isLoading: false });
            })
            .catch(error => {
                console.log(error);
                console.log("Algo salió mal");
            });
    }

    /**
     * Eliminar un recurso asociado al aliado.
     * @param {Number} identificador del recurso a ser eliminado
     */
    deleteAllyResource = () => {
        this.closeModal();
        const token = getToken();
        const url = `${process.env.REACT_APP_BACK_URL}/resources/ally/${this.state.idAlly}/resource/${this.state.idResourceToDelete}`;
        this.notify();

        axios.delete(
            url,
            { headers: { 'x-auth-token': `${token}` } }
        ).then(res => {
            this.removeResourceFromState();
            this.setState({ idResourceToDelete: 0 });
            this.notifySuccess()
        }).catch(error => {
            this.notifyError();
        })
    }

    /**
     * Remueve del estado el recurso con id igual al id guardado en el estado (state.idResourceToDelete).
     */
    removeResourceFromState = () => {
        let { allyResources, idResourceToDelete } = this.state;
        _.remove(allyResources, function (resource) {
            return resource.id_resource === idResourceToDelete;
        });
        this.setState({ allyResources });
    }
    /**
    * Desplegar el modal de elimacion de reto configurando el id
    * del reto que se desa borrar en el estado
    */
    showDeleteModal = (idResource) => {
        this.setState({ showModal: true, idResourceToDelete: idResource });
    }
    /**
    * Manejar el cierre del modal
    */
    closeModal = (event) => {
        this.setState({ showModal: false });
    }

    notify = () => this.toastId = toast.info("Eliminando...", this.toastConfiguration);
    notifySuccess = () => this.toastId = toast.success("Recurso eliminado con exito", this.toastConfiguration);
    notifyError = () => this.toastId = toast.error("Algo salió mal. Intenta nuevamente más tarde.", this.toastConfiguration);

    renderNoResources() {
        return (<h3 className="text-left softText">No se encontraron recursos</h3>);
    }

    render() {
        return (
            <Container className="p-0" fluid>
                <ToastContainer />
                <HeaderWithUserLogo source={img} />
                {this.state.isLoading ?
                    <div className="d-flex justify-content-center flex-grow-1">
                        <ReactLoading className="d-flex align-items-center svgContainerEditAlly" type={"spokes"} color={"#313333"} />
                    </div>
                    :
                    <div>
                        <Row className="contentDataEditAllyResources mx-0">
                            <Col>
                                <h1>Administrar Recursos</h1>
                                { _.isEmpty(this.state.allyResources) && this.renderNoResources()}
                                <div className="px-5">
                                    <HumanResourceList cols="3"
                                        people={this.state.allyResources}
                                        handleDelete={this.showDeleteModal}
                                        edit
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Modal show={this.state.showModal} onHide={this.close}>
                            <Modal.Header>
                                <Modal.Title>Eliminar Recurso</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>¿Realmente desea eliminar este recurso? Esta acción no se puede deshacer</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeModal}>
                                    Cerrar
                        </Button>
                                <Button variant="danger " onClick={this.deleteAllyResource}>
                                    Eliminar
                        </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                }
            </Container>
        );
    }
}

export default EditAllyResources;