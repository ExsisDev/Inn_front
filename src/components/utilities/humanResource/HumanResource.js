import React from 'react';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import { MdDelete, MdEdit } from 'react-icons/md';

import imgHumanResourse from '../../../images/profileHumanResource.jpg';
import './HumanResource.css';

const HumanResource = (props) => {
    return (
        <Card className="cardBox mx-0 my-2 py-3 align-items-end">
            { renderButtons(props.edit)}
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

function renderButtons(isActive) {
    if (!isActive) {
        return;
    }
    return (
        <ButtonGroup className="w-25">
            <Button variant="Link" className="p-0"><MdEdit /></Button>
            <Button variant="Link" className="p-0"><MdDelete /></Button>
        </ButtonGroup>
    );
}

export default HumanResource;