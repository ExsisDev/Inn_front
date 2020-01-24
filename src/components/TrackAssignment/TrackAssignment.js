import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import LogoTitle from '../../images/PropuestasAsignadas.png';
import LogoProposing from '../../images/EmpresaB.png';
import LogoAlly from '../../images/EmpresaA.png';
import './TrackAssignment.css'
import { Image } from 'react-bootstrap';

class TrackAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            proposingCompany: null,
            allycompany: null
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
                    <Col sm="10">
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
                        <Row>
                            <Col className="text-left">
                                <h5 className="trackAssigmentSubTitle">Descripción:</h5>
                                <p> Después de analizar el reto propuesto por la empresa B
                                    hemos decidido proponer el desarrollo de una aplicación móvil multi
                                    plataforma (Android y iOS) empezando por un proceso de validación
                                    de características con usuarios Reales y posterior a esto iniciar
                                    con el desarrollo de la misma
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2" className="text-left">
                                <h6 className="trackAssigmentSubTitle">Categorías:</h6>
                            </Col>
                            <Col className="text-left">
                                <p >
                                    #DesarrolloDeSoftwareEspecifico #AplicaciónMóvil
                                    #DesarrolloDeSoftware #AplicaciónMóvil #RealidadAumentada #AplicaciónMóvil
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-left">
                                <h5 className="trackAssigmentSubTitle">Notas de la Empresa Aliada:</h5>
                                <Card className="trackAssignmentCard my-2">
                                    <Card.Body className="">
                                        <Card.Text>
                                            Note de la sesión 1
                                        </Card.Text>
                                        <footer className="blockquote-footer">
                                            Octubre 12 de 2019
                                        </footer>
                                    </Card.Body>
                                </Card>
                                <Card className="trackAssignmentCard my-2">
                                    <Card.Body className="">
                                        <Card.Text>
                                            Note de la sesión 2
                                        </Card.Text>
                                        <footer className="blockquote-footer">
                                            Octubre 20 de 2019
                                        </footer>
                                    </Card.Body>
                                </Card>
                                <Card className="trackAssignmentCard my-2">
                                    <Card.Body className="">
                                        <Card.Text>
                                            Note de la sesión 3
                                        </Card.Text>
                                        <footer className="blockquote-footer">
                                            Noviembre 05 de 2019
                                        </footer>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
                );
            }
        }
        
export default TrackAssignment;