import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getToken } from '../../commons/tokenManagement';
import {USER_ROLES} from '../../commons/enums';
import AllyForm from './AllyForm';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import logoCrear from '../../images/RetosTerminados.png';
import 'react-toastify/dist/ReactToastify.css';
import "./CreateAlly.css";

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
            monthIdeaHours: 1,
            monthExpHours: 1,
            challengeIdeaHours: 1,
            challengeExpHours: 1,
            errorIdea: null,
            errorExp: null,
            isCreated: false,
            isFormValid: false,
            token: getToken()
        }
    }

    toastConfiguration = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
        containerId: 'A'
    }

    toastId = null;


    componentDidMount() {
        if (this.state.token) {
            this.getAllCategories();
        }
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
            });
    }


    /**
     * Gestionar el envío del nuevo aliado al back para su creación.
     * Toma los atributos necesarios del state y construye el aliado.
     * @return {VoidFunction}
     */
    handleSubmit = event => {
        event.preventDefault();

        if (!this.validateChallengeHours()) {
            return;
        }

        let msg;
        const url = `${process.env.REACT_APP_BACK_URL}/allies`;
        const newAlly = {
            user_email: this.state.companyEmail,
            user_password: "default",
            ally_name: this.state.companyName,
            ally_nit: this.state.nit,
            ally_web_page: this.state.webSite,
            ally_phone: this.state.companyPhone,
            ally_month_ideation_hours: this.state.monthIdeaHours,
            ally_month_experimentation_hours: this.state.monthExpHours,
            ally_challenge_ideation_hours: this.state.challengeIdeaHours,
            ally_challenge_experimentation_hours: this.state.challengeExpHours,
            fk_id_role: USER_ROLES.ALLY,
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
            this.success();
            setTimeout(() => {
                this.setState({ isCreated: true });
            }, 3500);
        }).catch(error => {
            msg = "Algo salio mal. " + error.response.data;
            this.error(msg);
        })
    }


    /**
     * Valida que las horas por reto no sean mayores a las hora mensuales
     * @returns {Boolean} - Booleano que indica si los campos son validos.
     */
    validateChallengeHours = () => {
        let isValid = true;
        this.setState({ errorIdea: null, errorExp: null });
        if (parseInt(this.state.monthIdeaHours) < parseInt(this.state.challengeIdeaHours)) {
            let message = "Las horas de ideación por reto no pueden ser mayores a las horas de ideación mensuales.";
            this.setState({ errorIdea: message });
            isValid = false;
        }
        if (parseInt(this.state.monthExpHours) < parseInt(this.state.challengeExpHours)) {
            let message = "Las horas de experimentación por reto no pueden ser mayores a las horas de experimentación mensuales.";
            this.setState({ errorExp: message });
            isValid = false;
        }
        return isValid;
    }


    notify = () => this.toastId = toast.info("Creando...", this.toastConfiguration);
    success = () => this.toastId = toast.success("Aliado creado", this.toastConfiguration);
    error = (msg) => this.toastId = toast.success("No se pudo crear. " + msg, this.toastConfiguration);


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
     * Remover recurso del estado
     * @param {Object} Recurso que va a ser eliminado
     */
    removeResource = (resourceToDelete) => {
        let { resources } = this.state;
        _.remove(resources, function(resource) {
            return resource.resource_name === resourceToDelete.resource_name;
        });
        this.setState({ resources });
    }

    /**
    * Cambiar estado de la entrada mientras se ingresa un valor
    * @return {VoidFunction}
    */
    handleInputChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let isValueValid = true;

        if (_.includes(name, "Hours") && value < 0) {
            let regex = /^[1-9]\d*$/;
            isValueValid = regex.test(value);
        }
        if (isValueValid) {
            this.setState({ [name]: value }, () => {
                if (name === "challengeIdeaHours" || name === "challengeExpHours") {
                    this.validateChallengeHours();
                }
            });
        }
    }

    render() {
        const titleProps = {
            text: "Crear Nuevo Aliado",
            img: logoCrear,
            imgAlt: "logo crear nuevo aliado"
        }
        return (
            <Container className="d-flex flex-column align-items-center px-0 px-lg-5">
                {
                    this.state.isCreated &&
                    <Redirect to="/home/ally" />
                }
                <BackNavigator />
                <SectionTitle titleProps={titleProps} />
                <Row className="my-3 formBox paddingBox">
                    <AllyForm categories={this.state.categories}
                        categoriesSelected={this.state.categoriesSelected}
                        resources={this.state.resources}
                        resourceName={this.state.resourceName}
                        resourceProfile={this.state.resourceProfile}
                        resourceExperience={this.state.resourceExperience}
                        monthIdeaHours={this.state.monthIdeaHours}
                        monthExpHours={this.state.monthExpHours}
                        challengeIdeaHours={this.state.challengeIdeaHours}
                        challengeExpHours={this.state.challengeExpHours}
                        validated={this.state.isFormValid}
                        errorIdea={this.state.errorIdea}
                        errorExp={this.state.errorExp}
                        handleInputChange={this.handleInputChange}
                        fillSelectedElement={this.fillSelectedElement}
                        handleDeleteClick={this.handleDeleteClick}
                        addResource={this.addResource}
                        removeResource={this.removeResource}
                        handleSubmit={this.handleSubmit}
                    />
                </Row>
            </Container>
        );
    }
}

export default CreateAlly;