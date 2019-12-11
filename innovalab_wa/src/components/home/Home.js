import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import CreateAlly from "../ally/CreateAlly";
import CreateChallenge from '../challenge/CreateChallenge';
import SideBarAdmin from '../sideBarAdmin/SideBarAdmin';
import './Home.css';
import AllChallenges from '../challenge/AllChallenges';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            token: this.getToken()
        }
    }

    
    /**
     * Obtener el token desde localStorage
     * 
     * @return {String} token 
     */
    getToken() {
        return localStorage.getItem('auth-token');
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
                                <Route path="/home" component={AllChallenges}/>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;