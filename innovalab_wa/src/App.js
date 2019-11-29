import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import CreateChallenge from './components/createChallenge/CreateChallenge';
import './App.css';

function App() {
  return (
    <Router >
      <div className="App">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/create-challenge" component={CreateChallenge} />
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
