import React from 'react';
import { Row, Col, CardDeck } from 'react-bootstrap';

import './HumanResourceList.css';
import HumanResource from './HumanResource';

const HumanResourceList = (props) => {
    return (
        <CardDeck className="mx-0" >
            <Row className="m-0">
                {
                    props.people.map(person => {
                        return (
                            <Col key={person.resource_name} lg={12 / props.cols} md={18 / props.cols}>
                                <HumanResource person={person}
                                    handleDelete={props.handleDelete}
                                    edit={props.edit}
                                />
                            </Col>
                        );
                    })
                }
            </Row>
        </CardDeck>
    );
}

export default HumanResourceList;