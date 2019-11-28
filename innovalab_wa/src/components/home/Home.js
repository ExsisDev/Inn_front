import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import CreateAlly from "../ally/CreateAlly";
import CreateChallenge from '../createChallenge/CreateChallenge';
import SideBarAdmin from '../sideBarAdmin/SideBarAdmin';
import './Home.css';

class Home extends React.Component {
    render() {
        return (
            <Container fluid className="p-0">
                <Row noGutters>
                    <Col className="d-flex">
                        <SideBarAdmin />
                        <Route path="/home/ally" component={CreateAlly} />
                        <Route path="/home/challenge" component={CreateChallenge} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;