import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Table } from 'react-bootstrap';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import logoExc from '../../images/exclamación.png';
import './AllAllies.css';

class AllAlies extends React.Component {
    constructor() {
        super();
        this.state = {
            allies: [],
            token: this.getToken()
        }
    }

    componentDidMount() {
        if (this.state.token) {
            this.getAlliesByPage(1);
        }
    }

    /**
     * Obtener el token desde localStorage
     * @return {String} token 
     */
    getToken() {
        return localStorage.getItem('auth-token');
    }

    /**
    * Obtener todos los aliados por página
    * @return {Object} categories
    */
    getAlliesByPage(page) {
        const url = `${process.env.REACT_APP_BACK_URL}/allies/page/${page}`;

        axios.get(url, {
            headers: { 'x-auth-token': `${this.state.token}` }
        })
            .then(res => {
                this.setState({ allies: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderAllies = (allies) => {
        return (
            allies.map(ally => {
                return (
                    <tr key={ally.id_ally}>
                        <td>{ally.ally_name}</td>
                        <td>{ally.ally_month_ideation_hours}</td>
                        <td>{ally.ally_month_experimentation_hours}</td>
                        <td>2</td>
                        <td>2</td>
                    </tr>
                );
            })           
        );
    }

    render() {
        const titleProps = {
            text: "Administrar Aliados",
            img: logoExc,
            imgAlt: "logo administrar aliados"
        }
        let allies = this.state.allies;
        return (
            <Container className="d-flex flex-column align-items-center px-5">

                <BackNavigator />
                <SectionTitle titleProps={titleProps} />
                <Row className="my-3 formBox paddingBox"    >
                    <Table borderless hover>
                        <thead>
                            <tr>
                                <th>Empresa</th>
                                <th>Horas ideación por mes</th>
                                <th>Horas experimentación por mes</th>
                                <th>Ideación por reto</th>
                                <th>Experimentación por reto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderAllies(allies)}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        );
    }
}

export default AllAlies;
