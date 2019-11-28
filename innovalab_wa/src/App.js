import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";

import './App.css';

function App() {
  return (
    <Router >
      <div className="App">      
        <Route path="/home" component={Home}/>
        <Route path="/" exact component={Landing}/>
      </div>
    </Router>

  );
}

export default App;
