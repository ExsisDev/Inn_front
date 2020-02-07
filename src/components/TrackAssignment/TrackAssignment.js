import React from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import LogoTitle from '../../images/PropuestasAsignadas.png';
import LogoProposing from '../../images/EmpresaB.png';
import LogoAlly from '../../images/EmpresaA.png';
import './TrackAssignment.css';

class TrackAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            proposingCompany: null,
            allycompany: null,
            isAdmin: true,
            text: "Para esto ofrecemos un equipo de 4 personas que se dividen de la siguiente manera: \n" +
                "-1 Director de proyecto \n -3 Programadores \n-1 Diseñador gráfico\n-1 Diseñador UX/UI  \n-2 Analistas de marketing"
        }
    }

    render() {
        const titleProps = {
            text: "Reto en Desarrollo",
            img: LogoTitle,
            imgAlt: "logo reto en desarrollo"
        }
        return (
            <Container className="d-flex flex-column align-items-center px-5">
                <BackNavigator />
                <div className="mt-3">
                    <SectionTitle titleProps={titleProps} />
                </div>
                <Row className="my-3 formBox justify-content-center">
                    { !this.state.isAdmin &&
                    <Col className="mt-3 px-0">
                        <div className="trackAssignmentImageCenterRounded rounded-circle d-flex align-items-center m-auto">
                            <Image src={LogoProposing} className="trackAssignmentImage" />
                        </div>
                    </Col>
                    }
                    <Col sm="10" className="mt-3 pl-0">
                        { this.state.isAdmin && 
                        <Row className="mx-0 my-4 justify-content-center">
                            <Col md="4" className="d-flex flex-column align-items-center" >
                                <div className="trackAssignmentImageCenterRounded rounded-circle d-flex align-items-center">
                                    <Image src={LogoProposing} className="trackAssignmentImage" />
                                </div>
                                <h5 className="trackAssigmentCompanyTitle my-3">Empresa Proponente</h5>
                            </Col>
                            <Col md="4" className="d-flex flex-column align-items-center" >
                                <div className="trackAssignmentImageCenterRounded rounded-circle d-flex align-items-center">
                                    <Image src={LogoAlly} className="trackAssignmentImage" />
                                </div>
                                <h5 className="trackAssigmentCompanyTitle my-3">Empresa Aliada</h5>
                            </Col>
                        </Row>
                        }
                        <Row>
                            <Col className="text-left">
                                <h4 id="trackAssigmentChallengeName">Reto Para La Empresa B</h4>
                                <p id="trackAssigmentCompanyDescription">
                                    La empresa B tiene 10 años en el mercado dedicada al sector alimenticio,
                                    Sus productos siempre se destacan por su sabor y disponobilidad a nivel Nacional.
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-left">
                                <h5 className="trackAssigmentSubTitle">Descripción de la solución:</h5>
                                <p className="trackAssigmentText">Después de analizar el reto propuesto por la empresa B
                                    hemos decidido proponer el desarrollo de una aplicación móvil multi
                                    plataforma (Android y iOS) empezando por un proceso de validación
                                    de características con usuarios Reales y posterior a esto iniciar
                                    con el desarrollo de la misma
                                </p>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="text-left">
                                <h5 className="trackAssigmentSubTitle">Nuestra solución y recursos</h5>
                                <p className="trackAssigmentText">
                                    {this.state.text}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2" className="text-left">
                                <h6 className="trackAssigmentSubTitle">Categorías:</h6>
                            </Col>
                            <Col className="text-left">
                                <p className="trackAssigmentText">
                                    #DesarrolloDeSoftwareEspecifico #AplicaciónMóvil
                                    #DesarrolloDeSoftware #AplicaciónMóvil #RealidadAumentada #AplicaciónMóvil
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-left">
                                <h5 className="trackAssigmentSubTitle">Notas de la Empresa Aliada:</h5>
                            </Col>
                        </Row>
                        { !this.state.isAdmin &&
                        <Row>
                            
                            <Col>
                                <Form>
                                    <Form.Label className="trackAssigmentSubTitle text-left">Comentarios:</Form.Label>
                                    <Form.Control as="textarea" rows="4" className="trackAssignmentTextarea" />
                                    <Row className="mx-0">
                                        <Col sm="12" md={{ span:3, offset:9}} className="px-0 my-3">
                                            <Button type="submit" className="trackAssignmentButton p-0">
                                                Finalizar Reto
                                            </Button>
                                        </Col>
                                    </Row>
                        
                                </Form>
                            </Col>
                        </Row>
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TrackAssignment;