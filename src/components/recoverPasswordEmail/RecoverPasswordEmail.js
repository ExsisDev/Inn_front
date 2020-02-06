import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

import './RecoverPasswordEmail.css';

const RecoverPasswordEmail = () => {
   return (
      <Row className="d-flex justify-content-center">
         <Col xs={11}>
            <Form className="text-white d-flex flex-column align-items-center pb-3">
               <Form.Label className="d-inline-block mt-5"> Recuperar Contraseña </Form.Label>
               <Form.Group controlId="formBasicEmail" className="my-4 w-100">
                  <Form.Label className="mt-4 recoverPasswordEmailRecoveryText">Ingresa el correo asociado a la cuenta</Form.Label>
                  <Form.Control className="formInput" type="email" placeholder="E-mail" />
               </Form.Group>
               <Button className="btnDefaultRounded my-5" variant="warning" type="submit">
                  Enviar
               </Button>
            </Form>
         </Col>
      </Row>
   );
}

export default RecoverPasswordEmail;