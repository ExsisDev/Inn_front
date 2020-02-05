import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import _ from "lodash";

import HeaderWithUserLogo from '../utilities/headerWithUserLogo/HeaderWithUserLogo';
import HumanResourceList from '../utilities/humanResource/HumanResourceList';
import { getToken } from '../../commons/tokenManagement';
import img from '../../images/EmpresaA.png';
import './AllyProfile.css';

const categories = [{ id: 12354, name: "Block Chain" }, { id: 15436, name: "Transformacion digital" }];


const ally = {
    name: "A",
    email: "correoA@aaa.com",
    about: "I don't care what to said here",
    categories: categories,
    ideaHoursM: "5",
    expeHoursM: "4",
    ideaHoursC: "2",
    expeHoursC: "1",
};

class AllyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ally: {},
            allyResources: [],
            allyId: 77
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ ally: ally });
        }, 2000);
        this.chargeResourcesToState();
    }
    /**
     * Obtener recursos asociados al aliado y guardarlos en el estado
     */
    chargeResourcesToState() {
        const token = getToken();
        const url = `${process.env.REACT_APP_BACK_URL}/resources/${this.state.allyId}`;
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
     * Renderizar las propiedades del aliado que no pueden ser
     * editadas.
     * @param {Object[]} properties - Un arreglo con las propiedades que se van a renderizar
     * @returns {Object[]} Arreglo con los Form.Group que se van a renderizar
     */
    renderReadOnlyProperties = (properties) => {
        return Object.keys(properties).map(property => {
            return (
                <Form.Group as={Row} className="mx-0 align-items-center" key={property}>
                    <Form.Label column sm="12" md="6" className="text-right allyProfileTextStyle allyProfileTitle" >
                        {`${this.fromKeyToName(property)}:`}
                    </Form.Label>
                    <Col>
                        <Form.Control plaintext
                            readOnly
                            defaultValue={this.renderProperty(properties[property])}
                            className="allyProfileTextStyle"
                        />
                    </Col>
                </Form.Group>
            );
        })
    }

    /**
     * Convertir el nombre de un atributo a la palabra
     * que corresponde en el form de renderizado.
     * @param {String} key
     * @returns {String}
     */
    fromKeyToName = (key) => {
        switch (key) {
            case "email": return "Correo";
            case "about": return "Acerca de";
            case "categories": return "Categorías de especialidad";
            case "ideaHoursM": return "Horas de ideación mensulaes";
            case "expeHoursM": return "Horas de ideación mensulaes";            
            default: return `No se reconoce ${key} como una llave válida.`;
        }
    }

    isEditableProperty(field) {
        return field === "ideaHoursC" || field === "expeHoursC" ? true : false;
    }

    renderProperty(value) {
        if (Array.isArray(value)) {
            let compValue = "";
            for (let category of value) {
                compValue += "#" + category.name;
            }            
            return compValue;
        } else {
            return value;
        }
    }

    render() {
        const properties = _.omit(this.state.ally, ["name", "ideaHoursC", "expeHoursC"]);        
        return (
            <Container className="p-0" fluid>
                <HeaderWithUserLogo source={img} />
                <Row className="allyProfileContentData mx-0">
                    <Col>
                        <h3 className="mb-4 allyProfileTitle allyProfileTextStyle">{this.state.ally.name}</h3>
                        <Form>
                            {this.renderReadOnlyProperties(properties)}
                            <Form.Group as={Row} className="mx-0 align-items-center" >
                                <Form.Label column sm="12" md="6" className="text-right allyProfileTextStyle allyProfileTitle" >
                                    Horas de ideación por reto:
                                </Form.Label>
                                <Col>
                                    <Form.Control plaintext
                                        type="number"
                                        min="0"                                   
                                        defaultValue={this.state.ally.ideaHoursC}
                                        className="allyProfileTextStyle"
                                    />
                                </Col>
                            </Form.Group><Form.Group as={Row} className="mx-0 align-items-center" >
                                <Form.Label column sm="12" md="6" className="text-right allyProfileTextStyle allyProfileTitle" >
                                    Horas de ideación por reto:
                                </Form.Label>
                                <Col>
                                    <Form.Control plaintext
                                        type="number"
                                        min="0"
                                        defaultValue={this.state.ally.expeHoursC}
                                        className="allyProfileTextStyle"
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <HumanResourceList cols="4"
                        people={this.state.allyResources}/>
                </Row>
            </Container>
        );
    }
}

export default AllyProfile;