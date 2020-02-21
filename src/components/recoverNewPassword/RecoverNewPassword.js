import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import ReactLoading from 'react-loading';

import './RecoverNewPassword.css';

class RecoverNewPassword extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoadingView: true,
         isValidToken: false,
         error: {}
      }
      this.newPassword = React.creteRef();
      this.confirmationPassword = React.creteRef();
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
      const new_password = this.newPassword.current.value;
      const confirm_new_password = this.confirmationPassword.current.value;      
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
      return (
         <div>
            <Form >
               <Form.Label className="mb-4"> Recuperar Contraseña </Form.Label>
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