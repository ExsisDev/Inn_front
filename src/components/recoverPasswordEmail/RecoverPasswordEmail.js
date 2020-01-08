import React from 'react';
import { Form, Button } from 'react-bootstrap';

import './RecoverPasswordEmail.css';

const RecoverPasswordEmail = () => {
   return (
      <div>
         <Form >
            <Form.Label> Recuperar Contraseña </Form.Label>
            <Form.Group controlId="formBasicEmail">
               <Form.Label className="mt-4 recoveryText">Ingresa el correo asociado a la cuenta</Form.Label>
               <Form.Control className="formInput" type="email" placeholder="E-mail" />
            </Form.Group>
            <Button className="sendButton mt-4 mb-4" variant="warning" type="submit">
               Enviar
            </Button>
         </Form>
      </div>
   );
}

export default RecoverPasswordEmail;