import React from 'react';
import { Col, Card, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { IoIosCloseCircle } from 'react-icons/io';

import LogoProposing from '../../images/EmpresaB.png';
import './ChallengeCard.css';

class ChallengeCard extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         color: this.props.color || ""
      }
   }

   render() {
      let classNameBackgroundColor = "";
      switch (this.state.color) {
         case "blue":
            classNameBackgroundColor = "challengeCardNewAssignedColor"
            break;
         case "green":
            classNameBackgroundColor = "challengeCardNewSendedColor"
            break;
         case "yellow":
            classNameBackgroundColor = "challengeCardNewFinishedColor"
            break;
         case "red":
            classNameBackgroundColor = "challengeCardNewRejectedColor"
            break;
         default:
            break;
      }
      return (
         <Col className="mb-5">
            <Card className={`grayRoundedBox challengeCardBox ${classNameBackgroundColor}`}>
               <Card.Body className="">
                  <Row className="mt-2">
                     {
                        this.props.isUserAnAdmin &&
                        (
                           <Col xs="12" className="challengeCardCrossLinkBox d-flex justify-content-end ">
                              <IconContext.Provider value={{ className: "" }}>
                                 <span className="challengeCardcrossLink" onClick={this.props.deleteChallenge}>
                                    <IoIosCloseCircle />
                                 </span>
                              </IconContext.Provider>
                           </Col>
                        )
                     }
                     <Col xs={12} lg={2} className="d-flex flex-column align-items-center">
                        <div className="challengeCardImageBox rounded-circle d-flex justify-content-center">
                           <Image src={LogoProposing} className="challengeCardImage" />
                        </div>
                        {/* <b><i>{this.props.companyName}</i></b> */}
                     </Col>
                     <Col xs={12} lg={10} className=" d-flex flex-column justify-content-center">

                        <Card.Title className="text-center text-lg-left normalText mt-3 mt-lg-0"><b>{this.props.challengeName}</b></Card.Title>
                        <Card.Text className="challengeCardCompanyDescription mt-lg-4">
                           {this.props.companyDescription}
                        </Card.Text>
                     </Col>
                  </Row>
                  <Row className="mt-lg-5">
                     <Col xs={12} lg={2} className="mt-5 mt-lg-0 px-0 d-flex justify-content-center justify-content-lg-end">
                        <span className="font-weight-bold font-italic">Reto:</span>
                     </Col>
                     <Col xs={12} lg={10}>
                        <Card.Text className="challengeCardDescription">
                           {this.props.challengeDescription}
                        </Card.Text>
                     </Col>
                     <Col className="d-flex justify-content-end">
                        {(() => {
                           if (!this.props.isUserAnAdmin) {
                              if (this.props.proposalData) {
                                 return (
                                    <Link to={{
                                       pathname: this.props.selectedNextRoute,
                                       state: {
                                          idChallenge: this.props.challengeId,
                                          challengeName: this.props.challengeName,
                                          companyName: this.props.companyName,
                                          companyDescription: this.props.companyDescription,
                                          challengeDescription: this.props.challengeDescription,
                                          categories: this.props.categories,
                                          challengeDate: this.props.challengeDate,
                                          proposalData: this.props.proposalData
                                       }
                                    }}
                                       className="font-weight-bold blueLink mr-4 mt-2"
                                    >
                                       Ver más
                               </Link>
                                 )
                              } else {
                                 return (
                                    <Link to={{
                                       pathname: this.props.selectedNextRoute,
                                       state: {
                                          idChallenge: this.props.challengeId,
                                          challengeName: this.props.challengeName,
                                          companyName: this.props.companyName,
                                          companyDescription: this.props.companyDescription,
                                          challengeDescription: this.props.challengeDescription,
                                          categories: this.props.categories,
                                          challengeDate: this.props.challengeDate
                                       }
                                    }}
                                       className="font-weight-bold blueLink mr-4 mt-2"
                                    >
                                       Ver más
                               </Link>
                                 )
                              }
                           }
                        })()}
                     </Col>
                  </Row>
                  <Row className="mb-4">
                     <Col xs={5} lg={2} className="d-flex justify-content-lg-end px-0">
                        <span className="w-auto font-italic challengeCardHashTags smallText">Categorías: </span>
                     </Col>
                     <Col xs={12} lg={10} className="d-flex">
                        <span className="w-auto font-italic challengeCardHashTags smallText">{this.props.categories.map((item) => { return (`#${item.split(' ').map(a => a.trim()).map(a => a[0].toUpperCase() + a.substring(1)).join("")} `) })}</span>
                     </Col>
                  </Row>
               </Card.Body>
            </Card>
         </Col>
         // <Col className="mb-5">
         //    <Card className={`grayRoundedBox challengeCardBox ${classNameBackgroundColor}`}>
         //       <Card.Body className="px-lg-3">
         //          <Row className="font-italic mx-0">
         //             <Col className="mb-sm-3" lg={2}>
         //                <Row className="mx-0">
         //                   <Col className="px-0 d-flex justify-content-center">
         //                      <div className="challengeCardImageBox rounded-circle d-flex align-items-center">
         //                         <Image src={LogoProposing} className="challengeCardImage" />
         //                      </div>
         //                   </Col>
         //                </Row>
         //                <Row className="mx-0">
         //                   <Col className="px-0">
         //                      <b><i>{this.props.companyName}</i></b>
         //                   </Col>
         //                </Row>
         //             </Col>
         //             <Col lg={10}>
         //                <Row className="mx-0">
         //                   <Col className="px-0">
         //                      <Card.Title className="challengeCardName text-center text-md-center text-lg-left "><b>{this.props.challengeName}</b></Card.Title>
         //                   </Col>
         //                   {
         //                      this.props.isUserAnAdmin &&
         //                      (
         //                         <Col xs="1">
         //                            <IconContext.Provider value={{ className: "logoutIcon" }}>
         //                               <span className="crossLink" onClick={this.props.deleteChallenge}>
         //                                  <IoIosCloseCircle />
         //                               </span>
         //                            </IconContext.Provider>
         //                         </Col>
         //                      )
         //                   }
         //                </Row>
         //                <Card.Text className="challengeCardCompanyDescription">
         //                   {this.props.companyDescription}
         //                </Card.Text>
         //             </Col>
         //          </Row>
         //          <Row className="mt-4 mx-0">
         //             <Col sm={3} md={2} className="d-flex align-items-center">
         //                <b><i>Reto:</i></b>
         //             </Col>
         //             <Col sm={9} md={10} >
         //                <Card.Text className="challengeCardDescription">
         //                   {this.props.challengeDescription}
         //                </Card.Text>
         //             </Col>
         //          </Row>
         //          <Row className="d-flex justify-content-end mt-2 mt-md-1">
         //             {(() => {
         //                if (!this.props.isUserAnAdmin) {
         //                   if (this.props.proposalData) {
         //                      return (
         //                         <Link to={{
         //                            pathname: this.props.selectedNextRoute,
         //                            state: {
         //                               idChallenge: this.props.challengeId,
         //                               challengeName: this.props.challengeName,
         //                               companyName: this.props.companyName,
         //                               companyDescription: this.props.companyDescription,
         //                               challengeDescription: this.props.challengeDescription,
         //                               categories: this.props.categories,
         //                               challengeDate: this.props.challengeDate,
         //                               proposalData: this.props.proposalData
         //                            }
         //                         }}
         //                            className="blueLink mr-4 mt-2"
         //                         >
         //                            Ver más
         //                      </Link>
         //                      )
         //                   } else {
         //                      return (
         //                         <Link to={{
         //                            pathname: this.props.selectedNextRoute,
         //                            state: {
         //                               idChallenge: this.props.challengeId,
         //                               challengeName: this.props.challengeName,
         //                               companyName: this.props.companyName,
         //                               companyDescription: this.props.companyDescription,
         //                               challengeDescription: this.props.challengeDescription,
         //                               categories: this.props.categories,
         //                               challengeDate: this.props.challengeDate
         //                            }
         //                         }}
         //                            className="blueLink mr-4 mt-2"
         //                         >
         //                            Ver más
         //                      </Link>
         //                      )
         //                   }
         //                }
         //             })()}
         //          </Row>
         //          <Row className="challengeCardCategories mx-0 mt-2 mt-md-1">
         //             <Col sm={3} md={2} className="d-flex justify-content-left justify-content-sm-center">
         //                <span className="w-auto"><i>Categorías:</i></span>
         //             </Col>
         //             <Col sm={9} md={10} className="d-flex justify-content-start">
         //                <i className="w-auto challengeCardHashTags">{this.props.categories.map((item) => { return (`#${item.split(' ').map(a => a.trim()).map(a => a[0].toUpperCase() + a.substring(1)).join("")} `) })}</i>
         //             </Col>
         //          </Row>
         //       </Card.Body>
         //    </Card>
         // </Col>
      );
   }
}


export default ChallengeCard;