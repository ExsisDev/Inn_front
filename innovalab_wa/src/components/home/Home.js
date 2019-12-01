import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import CreateAlly from "../ally/CreateAlly";
import CreateChallenge from '../createChallenge/CreateChallenge';
import SideBarAdmin from '../sideBarAdmin/SideBarAdmin';
import './Home.css';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            token: this.getSession()
        }
    }


    getSession() {
        return sessionStorage.getItem('auth-token');
    }


    render() {
        let { token } = this.state;

        return (
            <div>
                {
                    !token && <Redirect to="/login" />
                }
                <Container fluid className="p-0">
                    <Row noGutters>
                        <Col className="d-flex">
                            <SideBarAdmin />
                            <Switch>
                                <Route path="/home/ally" component={CreateAlly} />
                                <Route path="/home/challenge" component={CreateChallenge} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;