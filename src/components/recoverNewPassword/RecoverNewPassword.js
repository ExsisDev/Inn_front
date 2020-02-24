import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import './RecoverNewPassword.css';

class RecoverNewPassword extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoadingView: true,
         isValidToken: false,
         error: null,
         redirect: false
      }
      this.newPassword = React.createRef();
      this.confirmationPassword = React.createRef();
      this.toastConfiguration = {
         position: "top-right",
         autoClose: 4000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         closeButton: false,
         containerId: 'A'
      }
   }

   componentDidMount() {
      this.checkToken();
   }

   checkToken = () => {
      const { idUser, token } = this.props.match.params;
      const url = `${process.env.REACT_APP_BACK_URL}/login/recoverPassword/${idUser}/${token}`;
      
      axios.get(url)
      .then( () => {
         this.setState({isLoadingView: false, isValidToken: true});
      }).catch( error => {
         this.setState({isLoadingView: false, isValidToken: false});
      })
   }

   handleSubmit = (event) => {
      event.preventDefault();
      const url = `${process.env.REACT_APP_BACK_URL}/login/recoverPassword`;
      const id_user = this.props.match.params.idUser;
      const recovery_token = this.props.match.params.token;
      const new_password = this.newPassword.current.value;
      const confirm_new_password = this.confirmationPassword.current.value;
      
      this.setState({error: null});
      if(new_password.length < 7 || new_password.length > 8) {
         let error = "La contraseña debe tener mínimo 7 y máximo 8 caracteres";
         this.setState({error})
         return;
      }
      if(new_password !== confirm_new_password) {
         let error = "Las contraseñas deben coincidir";
         this.setState({error})
         return;
      }
      axios.put(url,{id_user, recovery_token,  new_password, confirm_new_password})
         .then( res => {
            this.notifySuccess("Contraseña recuperada exitosamente.");
            this.setState({redirect: true});
         }).catch( error => {
            if (error.response){               
               this.notifyError(error.response.data);
            }else{
               this.notifyError("Un error ha ocurrido. Por favor intenta nuevamente.")
            }
         });
   }
   /**
	 * Toast de información
	 */
   notify = (infoMessage) => {
      return toast.info(infoMessage, this.toastConfiguration);
   }
   /**
	 * Toast de éxito
	 */
   notifySuccess = (successMessage) => {
      return toast.success(successMessage, this.toastConfiguration);
   }
   /**
	 * Toast de error
	 */
   notifyError = (errorMessage) => {
      return toast.error(errorMessage, this.toastConfiguration);
   }

   render() {
      if (this.state.isLoadingView) {
         return (
            <div className="d-flex justify-content-center flex-grow-1">
               <ReactLoading className="d-flex align-items-center allChallengesSvgContainer" type={"spokes"} color={"#fff"} />
            </div>
         );
      }
      if( !this.state.isLoadingView && !this.state.isValidToken){
         return (
            <div>
               <h4>El token no es válido</h4>
            </div>
         );
      }
      if(this.state.redirect){
         return <Redirect to="/login" />;
      }
      return (
         <div>
            <Form onSubmit={this.handleSubmit}>
               <Form.Label className="mb-4"> Recuperar Contraseña </Form.Label>
               {this.state.error && <p className="recoverNewPasswordErrorMessage">{this.state.error}</p>}
               <Form.Group controlId="formBasicEmail">
                  <Form.Control className="formInput mb-4" type="password" placeholder="Nueva contraseña" ref={this.newPassword} required />
               </Form.Group>
               <Form.Group controlId="formBasicEmail">
                  <Form.Control className="formInput" type="password" placeholder="Confirmar nueva contraseña" ref={this.confirmationPassword} required/>
               </Form.Group>
               <Button className="sendButton mt-3 mb-4" variant="warning" type="submit">
                  Aceptar
            </Button>
            </Form>
         </div>
      );
   }

}

export default RecoverNewPassword;