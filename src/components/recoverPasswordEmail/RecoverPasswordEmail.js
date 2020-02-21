import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import './RecoverPasswordEmail.css';

const RecoverPasswordEmail = () => {
   const email = React.createRef();
   const toastConfiguration = {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
      containerId: 'A'
   }

   function handleSubmit(event) {
      event.preventDefault();
      const url = `${process.env.REACT_APP_BACK_URL}/login/recoverPassword`;
      const user_email = email.current.value;

      notify("Validando e-mail...");
      axios.post(url, { user_email })
         .then(res => {
            notifySuccess("hemos generado un link de recuperación. Revisa tu correo.");
         }).catch(error => {
            if (error.response){               
               notifyError(error.response.data);
            }else{
               notifyError("Un error ha ocurrido. Por favor intenta nuevamente.")
            }
         })
   }
   /**
	 * Toast de información
	 */
   function notify(infoMessage) {
      return toast.info(infoMessage, toastConfiguration);
   }
   /**
	 * Toast de éxito
	 */
   function notifySuccess(successMessage) {
      return toast.success(successMessage, toastConfiguration);
   }
   /**
	 * Toast de error
	 */
   function notifyError(errorMessage) {
      return toast.error(errorMessage, toastConfiguration);
   }

   return (
      <div>
         <Form onSubmit={handleSubmit}>
            <Form.Label> Recuperar Contraseña </Form.Label>
            <Form.Group controlId="formBasicEmail">
               <Form.Label className="mt-4 recoverPasswordEmailRecoveryText">Ingresa el correo asociado a la cuenta</Form.Label>
               <Form.Label className="mt-4 recoverPasswordEmailRecoveryText">Ingresa el correo asociado a la cuenta</Form.Label>
               <Form.Control className="formInput" type="email" placeholder="E-mail" ref={email} required />
            </Form.Group>
            <Button className="sendButton mt-4 mb-4" variant="warning" type="submit">
               Enviar
            </Button>
         </Form>
      </div>
   );
}

export default RecoverPasswordEmail;