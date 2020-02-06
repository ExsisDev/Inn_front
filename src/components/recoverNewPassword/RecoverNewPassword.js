import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import './RecoverNewPassword.css';

const RecoverNewPassword = () => {
   return (
      <Row className="d-flex justify-content-center">
         <Col xs={11}>
            <Form className="d-flex flex-column align-items-center pb-3">
               <Form.Label className="text-white my-3 my-md-5"> Recuperar Contraseña </Form.Label>
               <Form.Group controlId="formBasicEmail" className="w-100">
                  <Form.Control className="formInput" type="password" placeholder="Nueva contraseña" />
               </Form.Group>
               <Form.Group controlId="formBasicEmail" className="w-100">
                  <Form.Control className="formInput" type="password" placeholder="Confirmar nueva contraseña" />
               </Form.Group>
               <Button className="btnDefaultRounded mt-4 mb-5" variant="warning" type="submit">
                  Aceptar
               </Button>
            </Form>
         </Col>
      </Row>
   );
}

export default RecoverNewPassword;