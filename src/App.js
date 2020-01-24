import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AdminRoute from './components/utilities/routes/AdminRoute';
import SharedRoute from './components/utilities/routes/SharedRoute';
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import AdminProfile from './components/adminProfile/AdminProfile';
import EditAlly from './components/ally/EditAlly';
import EditAllyResources from './components/ally/EditAllyResources';
import AllyProfile from './components/ally/AllyProfile';
import PageNotFound from './components/pageNotFound/PageNotFound';

import './App.css';

class App extends React.Component {

   render() {

      return (
         <Router >
            <div className="App">
               <ToastContainer enableMultiContainer containerId={'A'} />
               <Switch>
                  <Route path="/pageNotFound" component={PageNotFound} />
                  <AdminRoute path="/ally/edit/:idAlly/resources" component={EditAllyResources} />
                  <AdminRoute path="/ally/edit/:idAlly" component={EditAlly} />
                  <SharedRoute path="/home" component={Home} />
                  <AdminRoute path="/adminProfile" component={AdminProfile} />
                  <Route path="/ally/profile" component={AllyProfile} />
                  <Route path="/" component={Landing} />
               </Switch>
            </div>
         </Router>
      );
   }
}

export default App;
