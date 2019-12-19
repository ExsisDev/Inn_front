import React from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Image, Button } from 'react-bootstrap';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import logoExc from '../../images/exclamación.png';
import logoCompany from '../../images/EmpresaA.png';
import './AllAllies.css';

class AllAlies extends React.Component {
    constructor() {
        super();
        this.state = {
            allies: [],
            totalAllies: 0,
            currentPage: 1,
            isLoading: true,
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
                this.setState({
                    allies: res.data.data,
                    totalAllies: res.data.totalElements,
                    isLoading: false
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    /**
    * Cambiar el indice de la página actual
    * @param {Number} pageNumber 
    */
    async handlePageChange(pageNumber) {
        await this.setState({ currentPage: pageNumber, isLoading: true });
        await this.getAlliesByPage(pageNumber);
    }

    renderAllies = (allies) => {
        const imageStyle = {
            height: "70px",
            width: "auto"
        }
        return (
            allies.map(ally => {
                return (
                    <tr key={ally.id_ally} className="d-flex align-items-center textStyleTable">
                        <td className="textStyleTableCompany">
                            <div>
                                <Image src={logoCompany} style={imageStyle} roundedCircle />
                                <Link to={`/ally/edit/${ally.id_ally}`}
                                      style={{display: "block"}}
                                >
                                    {ally.ally_name}
                                </Link>
                            </div>
                        </td>
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
                <Row className="justify-content-end">
                    <Button as={Link} to="/home/ally/create" className="btnCreateAlly">
                        Crear Aliado
                    </Button>
                </Row>
                {this.state.isLoading ?
                    (
                        <div className="d-flex justify-content-center flex-grow-1">
                            <ReactLoading className="d-flex align-items-center svgContainerEditAlly" type={"spokes"} color={"#313333"} />
                        </div>
                    ) :
                    (

                        <Row className="my-3 formBox paddingBox"    >
                            <Table responsive borderless hover>
                                <thead>
                                    <tr className="d-flex align-items-center textStyleTable">
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
                    )
                }
                <Row className="mx-0 d-flex justify-content-center">
                    <Col xs={8} sm={6} md={4} xl={3} >
                        <Pagination
                            activePage={this.state.currentPage}
                            itemsCountPerPage={4}
                            totalItemsCount={this.state.totalAllies}
                            pageRangeDisplayed={3}
                            itemClass="page-item boxNumber"
                            linkClass="page-link boxLink px-0"
                            innerClass="pagination d-flex justify-content-center align-self-end"
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default AllAlies;
