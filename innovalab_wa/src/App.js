import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
<<<<<<< HEAD

import Landing from "./components/landing/Landing";
=======
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
>>>>>>> 984207714ecb4c8a7bb28d467b873e495f227460
import CreateChallenge from './components/createChallenge/CreateChallenge';
import './App.css';

function App() {
  return (
<<<<<<< HEAD
    <Router>
      <div className="App">
        <Switch>
=======
    <Router >
      <div className="App">
        <Switch>
          <Route path="/home" component={Home} />
>>>>>>> 984207714ecb4c8a7bb28d467b873e495f227460
          <Route path="/create-challenge" component={CreateChallenge} />
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
