import React from 'react';
import { Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import AdminRoute from '../utilities/routes/AdminRoute';
import AllyRoute from '../utilities/routes/AllyRoute';
import SharedRoute from '../utilities/routes/SharedRoute';
import CreateAlly from "../ally/CreateAlly";
import CreateChallenge from '../challenge/CreateChallenge';
import SideBarAdmin from '../sideBarAdmin/SideBarAdmin';
import SideBarAlly from '../sideBarAlly/SideBarAlly';
import AllChallenges from '../challenge/AllChallenges';
import AllAllies from '../ally/AllAllies';
import ChallengeDetais from '../challenge/ChallengeDetails';
import { getToken, getTokenData } from '../../commons/tokenManagement';
import './Home.css';
import ProposalForm from '../proposal/ProposalForm';
import ProposalsMenu from '../proposalsMenu/ProposalsMenu';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            token: getToken(),
            role: 0
        }
    }

    ALLY = 1;
    ADMIN = 2;

    componentDidMount() {
        let tokenData = getTokenData(this.state.token);
        this.setState({ role: tokenData.fk_id_role });
    }


    render() {

        return (
            <div>
                <Container fluid className="p-0">
                    <Row noGutters>
                        <Col className="d-flex">
                            {
                                this.state.role === this.ALLY
                                    ? <SideBarAlly />
                                    : <SideBarAdmin />
                            }
                            <Switch>
                                <AdminRoute path="/home/ally/create" component={CreateAlly} />
                                <AdminRoute path="/home/ally" component={AllAllies} />
                                <AdminRoute path="/home/challenge" component={CreateChallenge} />
                                <AllyRoute path="/home/challengeDescription" component={ChallengeDetais} />
                                <AllyRoute path="/home/newProposal" component={ProposalForm} />
                                <AllyRoute path="/home/ongoingChallenges" component={ProposalsMenu} />
                                <SharedRoute path="/home" component={AllChallenges} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;