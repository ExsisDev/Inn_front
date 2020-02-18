import React from 'react';
import { Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { getToken, getTokenData } from '../../commons/tokenManagement';
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
import ProposalForm from '../proposal/ProposalForm';
import ProposalsMenu from '../proposal/ProposalsMenu';
import ProposalList from '../proposal/ProposalList';
import TrackAssignment from '../trackAssignment/TrackAssignment';
import SendedOrRejectedProposalDetails from '../proposal/SendedOrRejectedProposalDetails';
import { USER_ROLES } from '../../commons/enums';
import './Home.css';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            token: getToken(),
            role: 0,
            shortScreen: false,
            sideBarNewClassState: "",
            columnNewClassState: ""
        }

        this.handleClassState = this.handleClassState.bind(this);
    }


    ALLY = USER_ROLES.ALLY;
    ADMIN = USER_ROLES.ADMINISTRATOR;


    componentDidMount() {
        let tokenData = getTokenData(this.state.token);
        this.setState({ role: tokenData.fk_id_role });
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }


    resize() {
        this.setState((state) => {
            let isShortScreen = window.innerWidth <= 760;
            let sideBarClassAdded = isShortScreen ? "sideBarAllyClosed" : "sideBarAllyOpened";
            let columnClassAdded = isShortScreen ? "mx-0" : "homeDecreaseColumn";
            return {
                shortScreen: isShortScreen,
                sideBarNewClassState: sideBarClassAdded,
                columnNewClassState: columnClassAdded
            }
        });
    }


    handleClassState() {
        this.setState((state) => {
            let opositeClass = state.sideBarNewClassState === "sideBarAllyClosed" ? "sideBarAllyOpened" : "sideBarAllyClosed";
            return {
                sideBarNewClassState: opositeClass
            };
        });
    }


    render() {
        return (
            <div>
                <Container fluid className="d-flex homeMainContainer px-0">
                    <Row noGutters className="w-100">
                        <Col>

                            {
                                this.state.role === this.ALLY
                                    ? <SideBarAlly className={this.state.sideBarNewClassState} handleClassStateBtn={this.handleClassState} />
                                    : <SideBarAdmin className={this.state.sideBarNewClassState} handleClassStateBtn={this.handleClassState} />
                            }
                            <div className={this.state.columnNewClassState}>
                                <Switch>
                                    <AdminRoute path="/home/ally/create" component={CreateAlly} />
                                    <AdminRoute path="/home/ally" component={AllAllies} />
                                    <AdminRoute path="/home/challenge" component={CreateChallenge} />
                                    <AllyRoute path="/home/challengeDescription" component={ChallengeDetais} />
                                    <AllyRoute path="/home/newProposal" component={ProposalForm} />
                                    <AllyRoute path="/home/sendedProposals/details" component={SendedOrRejectedProposalDetails} />
                                    <AllyRoute path="/home/sendedProposals" component={ProposalList} />
                                    <AllyRoute path="/home/rejectedProposals" component={ProposalList} />
                                    <AllyRoute path="/home/assignedProposals" component={ProposalList} />
                                    <AllyRoute path="/home/challengesFinished" component={ProposalList} />
                                    <AllyRoute path="/home/ongoingChallenges" component={ProposalsMenu} />
                                    <SharedRoute path="/home/assignment" component={TrackAssignment} />
                                    <SharedRoute path="/home" component={AllChallenges} />
                                </Switch>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;