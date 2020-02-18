import React, { Component } from 'react'
import { Row, Col, Form, InputGroup, Button, FormControl } from 'react-bootstrap'

import innovaCamaraLogo from '../../../images/innovaCamaraLogo.png';
import './SearchChallenge.css';

const SearchChallenge = (props) => {
      let classes = props.className || "";
      return (
         <Row className={`searchChallengeRow ${classes}`}>
            <Col xs={5}>
               <Form className="h-100" onSubmit={props.handleSearchButton}>
                  <InputGroup className="h-100">
                     <InputGroup.Prepend className="w-auto">
                        <Button className="searchChallengeIconButton" variant="outline-secondary" type="submit"></Button>
                     </InputGroup.Prepend>
                     <FormControl className="searchChallengeTextInput normalText h-100" type="input" placeholder="Buscar reto" name="searchElement" onChange={props.handleChange} />
                  </InputGroup>
               </Form>
            </Col>
            <Col xs={6} md={{ span: 4, offset: 4 }} className="h-100">
               <img className="h-100" src={innovaCamaraLogo} alt="innovaCamaralogo" />
            </Col>
         </Row>
      )
   
}

export default SearchChallenge
