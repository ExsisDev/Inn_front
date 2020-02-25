import React from 'react';
import { Form, Button } from 'react-bootstrap';

import './RecoverNewPassword.css';

const RecoverNewPassword = () => {
   return(
      <div>
         <Form >
            <Form.Label className="mb-4"> Recuperar Contraseña </Form.Label>
            <Form.Group controlId="formBasicEmail">
               <Form.Control className="formInput mb-4" type="password" placeholder="Nueva contraseña" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
               <Form.Control className="formInput" type="password" placeholder="Confirmar nueva contraseña" />
            </Form.Group>
            <Button className="sendButton mt-3 mb-4" variant="warning" type="submit">
               Aceptar
            </Button>
         </Form>
      </div>
   );
}

export default RecoverNewPassword;