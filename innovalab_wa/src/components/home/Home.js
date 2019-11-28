import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import CreateAlly from "../ally/CreateAlly";
import './Home.css';

class Home extends React.Component {
    render() {
        return (
            <Container fluid className="p-0">
                <Row noGutters>
                    <Col className="d-flex">
                        <div className="fakeSideBox"></div>
                        <Route path="/home/ally" component={CreateAlly} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;