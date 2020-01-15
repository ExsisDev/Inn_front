import React from 'react';
import { Card, ButtonGroup, Button, Form } from 'react-bootstrap';
import { MdDelete, MdEdit, MdSave } from 'react-icons/md';

import imgHumanResourse from '../../../images/profileHumanResource.jpg';
import './HumanResource.css';

const HumanResource = (props) => {
    return (
        <Card className="cardBox mx-0 my-2 py-3 align-items-end">
            <Button variant="Link" className="w-25 p-0" >
                <MdDelete />
            </Button>
            <Card.Img variant="top" src={imgHumanResourse} className="cardImage rounded-circle align-self-center" />
            <Card.Body>
                <Card.Title className="cardTitle">{props.person.resource_name}</Card.Title>
                <h5 className="cardTitle text-left mb-0">Perfil:</h5>
                <Card.Text className="cardText text-left">{props.person.resource_profile}</Card.Text>
                <h5 className="cardTitle text-left mb-0">Experiencia:</h5>
                <Card.Text className="cardText text-left">{props.person.resource_experience}</Card.Text>
            </Card.Body>
        </Card>
    );
}
{/* <Card.Body>
<Form>
    <Form.Group className="m-0">
        <Form.Control plaintext
            readOnly={this.state.readOnly}
            value={this.props.person.resource_name}
            className="cardResourceName"
            name="resource_name"
            onChange={(event) => this.handleChange(event)}
        />
    </Form.Group>
    <Form.Group className="m-0">
        <Form.Label className="cardTitle text-left mb-0">Perfil: </Form.Label>
        <Form.Control plaintext
            readOnly={this.state.readOnly}
            value={this.props.person.resource_profile}
            className="pt-0 cardText cardTextArea text-left"                                
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
        />
    </Form.Group>
</Form>
</Card.Body> */}
export default HumanResource;