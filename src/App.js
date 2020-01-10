import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AdminRoute from './components/utilities/routes/AdminRoute';
import SharedRoute from './components/utilities/routes/SharedRoute';
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import AdminProfile from './components/adminProfile/AdminProfile';
import EditAlly from './components/ally/EditAlly';
import EditResources from './components/ally/EditResources';
import PageNotFound from './components/pageNotFound/PageNotFound';

import './App.css';

class App extends React.Component {

   render() {

      return (
         <Router >
            <div className="App">
               <Switch>
                  <Route path="/pageNotFound" component={PageNotFound} />
                  <AdminRoute path="/ally/edit/:idAlly/resources" component={EditResources} />
                  <AdminRoute path="/ally/edit/:idAlly" component={EditAlly} />
                  <SharedRoute path="/home" component={Home} />
                  <AdminRoute path="/adminProfile" component={AdminProfile} />
                  <Route path="/" component={Landing} />
               </Switch>
            </div>
         </Router>
      );
   }
}

export default App;
