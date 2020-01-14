import React from 'react';
import { Row, Col, CardDeck } from 'react-bootstrap';

import './HumanResourceList.css';
import HumanResource from './HumanResource';

const HumanResourceList = (props) => {
    return (
        <CardDeck className="m-0" >
            <Row className="m-0 justify-content-between">
                {
                    props.people.map(person => {
                        return (
                            <Col key={person.resource_name} lg={12/props.cols}>
                                <HumanResource person={person} 
                                               save={props.save}
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