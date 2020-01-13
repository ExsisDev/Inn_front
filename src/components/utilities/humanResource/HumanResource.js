import React from 'react';
import { Card, ButtonGroup, Button, Form } from 'react-bootstrap';
import { MdDelete, MdEdit } from 'react-icons/md';

import imgHumanResourse from '../../../images/profileHumanResource.jpg';
import './HumanResource.css';

class HumanResource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readOnly: true,
            idResource: props.person.id_resource
        }
    }

    renderButtons = (isActive) => {
        if (!isActive) {
            return;
        }
        return (
            <ButtonGroup className="w-25">
                <Button variant="Link"
                    className="p-0"
                    onClick={this.activateOrDesactivateEdition}
                >
                    <MdEdit />
                </Button>
                <Button variant="Link" className="p-0"><MdDelete /></Button>
            </ButtonGroup>
        );
    }

    activateOrDesactivateEdition = () => {
        let aux = this.state.readOnly;
        this.setState({ readOnly: !aux });
    }

    render() {
        return (
            <Card className="cardBox mx-0 my-2 py-3 align-items-end">
                {this.renderButtons(this.props.edit)}
                <Card.Img variant="top" src={imgHumanResourse} className="cardImage rounded-circle align-self-center" />
                <Card.Body>
                    <Form>
                        <Form.Group className="m-0">
                            <Form.Control plaintext
                                readOnly={this.state.readOnly}
                                value={this.props.person.resource_name}
                                className="cardResourceName"
                                name="resource_name"
                                onChange={(event) => this.props.handleChange(event.target, this.state.idResource)}
                                // onChange={(event) => console.log(event.target)}
                            />                                                        
                        </Form.Group>                        
                        <Form.Group className="m-0">
                            <Form.Label className="cardTitle text-left mb-0">Perfil: </Form.Label>
                            <Form.Control plaintext
                                readOnly={this.state.readOnly}
                                value={this.props.person.resource_profile}
                                className="pt-0 cardText cardTextArea text-left"
                                name="resource_profile"
                            />
                        </Form.Group>
                        <Form.Group className="m-0">
                            <Form.Label className="cardTitle text-left mb-0">Experiencia: </Form.Label>
                            <Form.Control as="textarea"
                                rows="3"
                                plaintext
                                readOnly={this.state.readOnly}
                                value={this.props.person.resource_experience}
                                className="pt-0 cardText cardTextArea text-left"
                                name="resource_experience"
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default HumanResource;