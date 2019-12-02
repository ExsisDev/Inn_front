import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import PageNotFound from './components/pageNotFound/PageNotFound';

import './App.css';

class App extends React.Component {

   render() {

      return (
         <Router >
            <div className="App">
               <Switch>
                  <Route path="/pageNotFound" component={PageNotFound} />
                  <Route path="/home" component={Home} />
                  <Route path="/" component={Landing} />
               </Switch>
            </div>
         </Router>
      );
   }
}

export default App;
