import React from 'react';
import { Row, Col, CardDeck } from 'react-bootstrap';
import CardColumns from 'react-bootstrap/CardColumns';
import './HumanResourceList.css';

import HumanResource from './HumanResource';


const HumanResourceList = (props) => {
    return (
        <CardDeck className="m-0" >
            <Row className="m-0 justify-content-between">
                {
                    props.people.map(person => {
                        return (
                            <Col key={person.id} lg={12/props.cols}>
                                <HumanResource  person={person} />
                            </Col>
                        );
                    })
                }
            </Row>
        </CardDeck>
    );
}

export default HumanResourceList;