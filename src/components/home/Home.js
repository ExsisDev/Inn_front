import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import AdminRoute from '../utilities/routes/AdminRoute';
import SharedRoute from '../utilities/routes/SharedRoute';
import CreateAlly from "../ally/CreateAlly";
import CreateChallenge from '../challenge/CreateChallenge';
import SideBarAdmin from '../sideBarAdmin/SideBarAdmin';
import AllChallenges from '../challenge/AllChallenges';
import AllAllies from '../ally/AllAllies';
import './Home.css';

class Home extends React.Component {
    
    render() {
        return (
            <div>                
                <Container fluid className="p-0">
                    <Row noGutters>
                        <Col className="d-flex">
                            <SideBarAdmin />
                            <Switch>
                                <AdminRoute path="/home/ally/create" component={CreateAlly} />
                                <AdminRoute path="/home/ally" component={AllAllies} />
                                <AdminRoute path="/home/challenge" component={CreateChallenge} />
                                <SharedRoute path="/home" component={AllChallenges}/>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;