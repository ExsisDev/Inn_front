import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Modal, Button } from 'react-bootstrap';
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
            createResource: false
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
        this.handleCreate = this.handleCreate.bind(this);
        this.name = React.createRef();
        this.profile = React.createRef();
        this.experience = React.createRef();
    }
   
    componentDidMount() {
        this.chargeResourcesToStatus();
    }

    /**
     * Obtener recursos asociados al aliado y guardarlos en el estado
     */
    chargeResourcesToStatus() {
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
     * Se obtiene el neuvo recurso como objeto y se envia al back
     */
    handleCreate(event) {
        event.preventDefault();
        let token = getToken();
        let url = `${process.env.REACT_APP_BACK_URL}/resources/${this.state.idAlly}`;
        let resource = {
            resource_name: this.name.current.value,
            resource_profile: this.profile.current.value,
            resource_experience: this.experience.current.value
        };
        this.notify("Creando recurso...");
        axios.post(url, resource, { headers: { 'x-auth-token': `${token}` } })
            .then(answer => {
                this.notifySuccess("Recurso creado");
                this.changeStatusCreateResource();
                this.chargeResourcesToStatus();
            })
            .catch(error => {
                console.log(error);

                this.notifyError("Algo salió mal");
            })
    }

    /**
     * Eliminar un recurso asociado al aliado.
     * @param {Number} identificador del recurso a ser eliminado
     */
    deleteAllyResource = () => {
        this.closeModal();
        const token = getToken();
        const url = `${process.env.REACT_APP_BACK_URL}/resources/ally/${this.state.idAlly}/resource/${this.state.idResourceToDelete}`;
        this.notify('Eliminando...');

        axios.delete(
            url,
            { headers: { 'x-auth-token': `${token}` } }
        ).then(res => {
            this.removeResourceFromStatus();
            this.setState({ idResourceToDelete: 0 });
            this.notifySuccess("Recurso eliminado con exito")
        }).catch(error => {
            this.notifyError("Algo salió mal. Intenta nuevamente más tarde.");
        })
    }

    /**
     * Remueve del estado el recurso con id igual al id guardado en el estado (state.idResourceToDelete).
     */
    removeResourceFromStatus = () => {
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
    showDeleteModal = (resourceToDelete) => {
        this.setState({ showModal: true, idResourceToDelete: resourceToDelete.id_resource });
    }
    /**
    * Manejar el cierre del modal
    */
    closeModal = (event) => {
        this.setState({ showModal: false });
    }

    notify = (msg) => this.toastId = toast.info(msg, this.toastConfiguration);
    notifySuccess = (msg) => this.toastId = toast.success(msg, this.toastConfiguration);
    notifyError = (msg) => this.toastId = toast.error(msg, this.toastConfiguration);

    renderNoResources() {
        return (<h3 className="text-left softText">No se encontraron recursos</h3>);
    }

    /**
     * Modifica el estado de createResource (false - true)
     */
    changeStatusCreateResource = () => {
        const back = this.state.createResource;
        this.setState({ createResource: !back });
    }

    /**
     * Segun la variable createResource se retorna el 
     * el listado de recursos existentes 
     * o el formulario para crear uno nuevo recurso
     */
    renderView = () => {
        if (this.state.createResource) {
            return (
                <Form onSubmit={this.handleCreate}>
                    <Form.Row className="mx-0 my-4 justify-content-center">
                        <Col sm="12" md="5" className="textLeft pr-4">
                            <Form.Group>
                                <Form.Control placeholder="Nombre"
                                    className="formInput backgndColor"
                                    name="resourceName"
                                    ref={this.name}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control placeholder="Perfil"
                                    className="formInput backgndColor"
                                    name="resourceProfile"
                                    ref={this.profile}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control as="textarea" rows="3"
                                    placeholder="Experiencia"
                                    className="formInput backgndColor"
                                    name="resourceExperience"
                                    style={{ resize: "none" }}
                                    ref={this.experience}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="d-flex justify-content-end">
                                <Col sm="3" className="p-0">
                                    <Button size="sm"
                                        variant="success"
                                        className="formButton"
                                        type="submit"
                                    >
                                        Crear
                            </Button>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                </Form>
            );

        } else {
            return (
                <div className="px-5">
                    {_.isEmpty(this.state.allyResources) && this.renderNoResources()}

                    <HumanResourceList cols="3"
                        people={this.state.allyResources}
                        handleDelete={this.showDeleteModal}
                        edit
                    />
                </div>
            );
        }
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
                        <Row className="justify-content-end mx-0">
                            <Col md="5">
                                <Button className="allyBtnCreateAllyResources" onClick={this.changeStatusCreateResource}>
                                    {
                                        !this.state.createResource
                                            ? "Crear recurso"
                                            : "Ver recursos"
                                    }
                                </Button>
                            </Col>
                        </Row>
                        <Row className="contentDataEditAllyResources mx-0">
                            <Col>
                                <h1>Administrar Recursos</h1>
                                {this.renderView()}
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