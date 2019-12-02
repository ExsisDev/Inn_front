import React from 'react';
import { Row, Col, CardDeck } from 'react-bootstrap';
import CardColumns from 'react-bootstrap/CardColumns';
import './HumanResourceList.css';

import HumanResource from './HumanResource';


const HumanResourceList = (props) => {
    return (
        <CardDeck>
            <Row className="align-sel-center">
                {
                    props.people.map(person => {
                        return (
                            <Col md={5}>
                                <HumanResource key={person.name} person={person} />
                            </Col>
                        );
                    })
                }
            </Row>
        </CardDeck>
    );
}

export default HumanResourceList;