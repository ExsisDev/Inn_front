import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { getToken } from '../../commons/tokenManagement';
import CreateAlly from "../ally/CreateAlly";
import CreateChallenge from '../challenge/CreateChallenge';
import SideBarAdmin from '../sideBarAdmin/SideBarAdmin';
import AllChallenges from '../challenge/AllChallenges';
import AllAllies from '../ally/AllAllies';
import './Home.css';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            token: getToken()
        }
    }


    render() {
        return (
            <div>                
                <Container fluid className="p-0">
                    <Row noGutters>
                        <Col className="d-flex">
                            <SideBarAdmin />
                            <Switch>
                                <Route path="/home/ally/create" component={CreateAlly} />
                                <Route path="/home/ally" component={AllAllies} />
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