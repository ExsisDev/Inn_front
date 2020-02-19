import React, { Component } from 'react'
import { Row, Col, Form, InputGroup, Button, FormControl } from 'react-bootstrap'

import innovaCamaraLogo from '../../../images/innovaCamaraLogo.png';
import './SearchChallenge.css';

const SearchChallenge = (props) => {
      let classes = props.className || "";
      return (
         <Row className={`d-flex ${classes}`}>
            <Col xs={12} lg={5} className="order-2 order-lg-1 mt-3 mt-lg-0">
               <Form className="h-100" onSubmit={props.handleSearchButton}>
                  <InputGroup className="h-100">
                     <InputGroup.Prepend className="w-auto">
                        <Button className="searchChallengeIconButton" variant="outline-secondary" type="submit"></Button>
                     </InputGroup.Prepend>
                     <FormControl className="searchChallengeTextInput normalText h-100" type="input" placeholder="Buscar reto" name="searchElement" onChange={props.handleChange} />
                  </InputGroup>
               </Form>
            </Col>
            <Col xs={12} lg={7} className="h-100 order-1 order-lg-2 d-flex justify-content-center justify-content-lg-end mt-3 mt-lg-0">
               <img className="searchChallengeImage" src={innovaCamaraLogo} alt="innovaCamaralogo" />
            </Col>
         </Row>
      )
   
}

export default SearchChallenge
