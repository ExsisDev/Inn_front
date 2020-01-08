import React from 'react';
import { IconContext } from "react-icons";
import { IoIosCloseCircle } from 'react-icons/io';
import { Row, Col, Form, Button } from 'react-bootstrap';
import HumanResourceList from '../utilities/humanResource/HumanResourceList';
import './AllyForm.css';

const AllyForm = (props) => {
    return (
        <Form validated={props.validated} onSubmit={props.handleSubmit}>
            <Form.Row className="mx-0">
                <Col sm="12" md="5" className="textLeft pr-4">
                    <h5 className="formAllyTitles mb-4">Datos de la empresa: </h5>
                    <Form.Group>
                        <Form.Control className="formInput backgndColor"
                            placeholder="Nombre de la Empresa"
                            name="companyName"
                            onChange={props.handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className="formInput backgndColor"
                            placeholder="NIT"
                            name="nit"
                            onChange={props.handleInputChange}
                            maxLength={11}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className="formInput backgndColor"
                            placeholder="Email"
                            name="companyEmail"
                            onChange={props.handleInputChange}
                            type="email"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className="formInput backgndColor"
                            placeholder="Página Web"
                            name="webSite"
                            onChange={props.handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className="formInput backgndColor"
                            placeholder="Teléfono"
                            name="companyPhone"
                            onChange={props.handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>

                <Col sm="12" md="7" className="textLeft">
                    <Form.Group as={Row} className="mx-0 align-items-baseline" controlId="categories">
                        <Col>
                            <Form.Label className="formAllyTitles">
                                Categorías de especialidad:
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control as="select"
                                onChange={props.fillSelectedElement}
                                className="formSelect backgndColor"
                                defaultValue="default"
                            >
                                <option disabled value="default">Seleccione las categorias</option>
                                {props.categories.map(category => {
                                    return <option key={category.id_category} value={category.id_category}>{category.category_name}</option>
                                })}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Row className="mx-0">
                        <Col md="6">
                            <ul className="listRemovable p-0 d-flex flex-column align-items-start flex-wrap" >
                                {props.categoriesSelected.map((item) => {
                                    return (
                                        <IconContext.Provider key={item.id_category} value={{ className: "logoutIcon" }}>
                                            <li className="w-auto" >
                                                <span data-id={item.id_category} className="crossLink"
                                                    onClick={props.handleDeleteClick}>
                                                    <IoIosCloseCircle />
                                                </span>
                                                {item.category_name}
                                            </li>
                                        </IconContext.Provider>
                                    )
                                })}
                            </ul>
                        </Col>
                    </Row>
                    <Form.Group as={Row} className="mx-0 align-items-baseline" controlId="ideHours">
                        <Form.Label column className="formAllyTitles">
                            Horas de ideación mensuales:
                                    </Form.Label>
                        <Col md="3">
                            <Form.Control className="formInput backgndColor"
                                type="number"
                                name="monthIdeaHours"
                                value={props.monthIdeaHours}
                                onChange={props.handleInputChange}
                                min="1"
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mx-0 align-items-baseline" controlId="expHours">
                        <Form.Label column className="formAllyTitles">
                            Horas de experimentación mensuales:
                                    </Form.Label>
                        <Col md="3">
                            <Form.Control className="formInput backgndColor"
                                type="number"
                                name="monthExpHours"
                                value={props.monthExpHours}
                                onChange={props.handleInputChange}
                                min="1"
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mx-0 align-items-baseline" controlId="ideHours">
                        <Form.Label column className="formAllyTitles">
                            Horas de ideación por reto:
                        </Form.Label>
                        <Col md="3">
                            <Form.Control className="formInput backgndColor"
                                type="number"
                                name="challengeIdeaHours"
                                value={props.challengeIdeaHours}
                                onChange={props.handleInputChange}
                                min="1"
                                required
                            />
                        </Col>
                        <p className="errorMessage">{props.errorIdea}</p>
                    </Form.Group>
                    <Form.Group as={Row} className="mx-0 align-items-baseline" controlId="expHours">
                        <Form.Label column className="formAllyTitles">
                            Horas de experimentación por reto:
                        </Form.Label>
                        <Col md="3">
                            <Form.Control className="formInput backgndColor"
                                type="number"
                                name="challengeExpHours"
                                value={props.challengeExpHours}
                                onChange={props.handleInputChange}
                                min="1"
                                required
                            />
                        </Col>
                        <p className="errorMessage">{props.errorExp}</p>
                    </Form.Group>
                </Col>
            </Form.Row>

            <Form.Row className="mx-0 my-4">
                <Col sm="12" md="5" className="textLeft pr-4">
                    <h5 className="formAllyTitles mb-4"> Recursos humanos: </h5>
                    <Form.Group>
                        <Form.Control placeholder="Nombre"
                            value={props.resourceName}
                            className="formInput backgndColor"
                            name="resourceName"
                            onChange={props.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control placeholder="Perfil"
                            value={props.resourceProfile}
                            className="formInput backgndColor"
                            name="resourceProfile"
                            onChange={props.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" rows="3"
                            placeholder="Experiencia"
                            value={props.resourceExperience}
                            className="formInput backgndColor"
                            name="resourceExperience"
                            style={{ resize: "none" }}
                            onChange={props.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-end">
                        <Col sm="3" className="p-0">
                            <Button size="sm"
                                variant="warning"
                                className="formButton"
                                onClick={props.addResource}
                            >
                                Añadir
                            </Button>
                        </Col>
                    </Form.Group>
                </Col>

                <Col sm="12" md="7">
                    <HumanResourceList cols="2" people={props.resources} />
                    <Form.Group className="d-flex justify-content-end">
                        <Col sm="3" className="p-0">
                            <Button className="formButton"
                                size="sm"
                                variant="success"
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
}

export default AllyForm;