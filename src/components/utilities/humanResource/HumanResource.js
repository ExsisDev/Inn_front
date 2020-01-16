import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

import imgHumanResourse from '../../../images/profileHumanResource.jpg';
import './HumanResource.css';

const HumanResource = (props) => {
    return (
        <Card className="humanResourceCardBox mx-0 my-2 py-3 align-items-end">
            <Button variant="Link" className="w-25 p-0" 
                    onClick={() => props.handleDelete(props.person) } 
            >
                <MdDelete />
            </Button>
            <Card.Img variant="top" src={imgHumanResourse} className="humanResourceCardImage rounded-circle align-self-center" />
            <Card.Body>
                <Card.Title className="humanResourceCardTitle">{props.person.resource_name}</Card.Title>
                <h5 className="humanResourceCardTitle text-left mb-0">Perfil:</h5>
                <Card.Text className="humanResourceCardText text-left">{props.person.resource_profile}</Card.Text>
                <h5 className="humanResourceCardTitle text-left mb-0">Experiencia:</h5>
                <Card.Text className="humanResourceCardText text-left">{props.person.resource_experience}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default HumanResource;