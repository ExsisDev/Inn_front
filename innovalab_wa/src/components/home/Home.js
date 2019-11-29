import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
// import CreateAlly from "../ally/CreateAlly";
import './Home.css';
import CreateChallenge from '../createChallenge/CreateChallenge';

class Home extends React.Component {
    render() {
        return (
            <Container fluid className="p-0">
                <Row noGutters>
                    <Col className="d-flex">
                        <div className="fakeSideBox"></div>
                        <Route path="/home/create-challenge" component={CreateChallenge} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;