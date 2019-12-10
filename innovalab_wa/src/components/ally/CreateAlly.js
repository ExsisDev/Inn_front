import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllyForm from './AllyForm';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import logoCrear from '../../images/RetosTerminados.png';
import "./CreateAlly.css"

class CreateAlly extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            categoriesSelected: [],
            resources: [],
            resourceName: "",
            resourceProfile: "",
            resourceExperience: "",
            companyName: "",
            nit: "",
            companyEmail: "",
            webSite: "",
            companyPhone: "",
            ideaHours: "",
            expHours: "",
            isCreated: false,            
            token: this.getSession()
        }
    }

    toastId = null;

    componentDidMount() {
        if (this.state.token) {
            this.getAllCategories();
        }
    }

    /**
     * Obtener el token de sesion
     * @return {String} token 
     */
    getSession() {
        return localStorage.getItem('auth-token');
    }

    /**
    * Obtener todas las categorias para compañia
    * @return {Object} categories
    */
    getAllCategories() {
        const url = `${process.env.REACT_APP_BACK_URL}/al_categories`;

        axios.get(url, {
            headers: { 'x-auth-token': `${this.state.token}` }
        })
            .then(res => {
                this.setState({ categories: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
    /**
     * Gestionar el envío del nuevo aliado al back para su creación.
     * Toma los atributos necesarios del state y construye el aliado.
     * @return {VoidFunction}
     */
    handleSubmit = event => {
        event.preventDefault();
        let msg;
        const url = `${process.env.REACT_APP_BACK_URL}/allies`;
        const newAlly = {
            user_email: this.state.companyEmail,
            user_password: "default",
            ally_name: this.state.companyName,
            ally_nit: this.state.nit,
            ally_web_page: this.state.webSite,
            ally_phone: this.state.companyPhone,
            ally_month_ideation_hours: this.state.ideaHours,
            ally_month_experimentation_hours: this.state.expHours,
            fk_id_role: 2,
            fk_user_state: 1,
            ally_resources: this.state.resources,
            ally_categories: this.getIdCategories(this.state.categoriesSelected)
        }

        this.notify();
        axios.post(
            url,
            newAlly,
            { headers: { 'x-auth-token': `${this.state.token}` } }
        ).then(res => {
            msg = "Aliado creado con éxito."
            this.updateSuccess(msg);
            setTimeout(() => {
                this.setState({ isCreated: true });                
            }, 2000);
        }).catch(error => {
            msg = "Algo salio mal. Intentalo de nuevo."
            this.updateError(msg);
        })
    }

    notify = () => this.toastId = toast.info("creando...", { autoClose: false });

    updateSuccess = ( msg ) => {
        toast.update(this.toastId, {render: msg, type: toast.TYPE.SUCCESS, autoClose: 2000 });
    }
    
    updateError = ( msg ) => {
        toast.update(this.toastId, {render: msg, type: toast.TYPE.ERROR, autoClose: 2000 });
    }

    getIdCategories(categoriesArray) {
        let ids = categoriesArray.map(category => {
            return category.id_category;
        })
        return ids;
    }

    /**
     * Agregar la categoria seleccionado en la lista desplegable al
     * estado del componente
     * @return {VoidFunction}
     */
    fillSelectedElement = (event) => {
        let currentCategories = [];
        let index = event.nativeEvent.target.selectedIndex;
        let selectedCategory = {
            category_name: event.nativeEvent.target[index].text,
            id_category: event.nativeEvent.target.value
        }
        _.assign(currentCategories, this.state.categoriesSelected);
        //se revisa que la categoria no haya sido seleccionada anteriormente
        for (let category of currentCategories) {
            if (category.id_category === selectedCategory.id_category) {
                return;
            }
        }
        currentCategories.push(selectedCategory);
        this.setState({ categoriesSelected: currentCategories });
    }

    /**
     * Eliminar categoria del arreglo categoriesSelected
     * @return {VoidFunction}
     */
    handleDeleteClick = (event) => {
        const idCategoryToDelete = event.currentTarget.dataset.id;
        let auxArray = [];
        _.assign(auxArray, this.state.categoriesSelected);
        _.remove(auxArray, function (category) {
            return category.id_category === idCategoryToDelete;
        });
        this.setState({ categoriesSelected: auxArray });
    }

    /**
     * Añadir un nuevo recurso al estado del componente.
     * Se toman del estado el nombre, perfil y experiencia del recurso.
     * @return {VoidFunction}
     */
    addResource = event => {
        event.preventDefault();
        let newResources = this.state.resources;
        const resource = {
            resource_name: this.state.resourceName,
            resource_profile: this.state.resourceProfile,
            resource_experience: this.state.resourceExperience
        }
        newResources.push(resource);
        this.setState({
            resources: newResources,
            resourceName: "",
            resourceProfile: "",
            resourceExperience: ""
        })
    }

    /**
    * Cambiar estado de la entrada mientras se ingresa un valor
    * @return {VoidFunction}
    */
    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const titleProps = {
            text: "Crear Nuevo Aliado",
            img: logoCrear,
            imgAlt: "logo crear nuevo aliado"
        }
        return (
            <Container className="d-flex flex-column align-items-center px-5">
                {
                    this.state.isCreated &&
                    <Redirect to="/home" />
                }
                <ToastContainer />
                <BackNavigator />
                <SectionTitle titleProps={titleProps} />
                <Row className="my-3 formBox paddingBox">
                    <AllyForm categories={this.state.categories}
                        categoriesSelected={this.state.categoriesSelected}
                        resources={this.state.resources}
                        resourceName={this.state.resourceName}
                        resourceProfile={this.state.resourceProfile}
                        resourceExperience={this.state.resourceExperience}
                        handleInputChange={this.handleInputChange}
                        fillSelectedElement={this.fillSelectedElement}
                        handleDeleteClick={this.handleDeleteClick}
                        addResource={this.addResource}
                        handleSubmit={this.handleSubmit}
                    />
                </Row>
            </Container>
        );
    }
}

export default CreateAlly;