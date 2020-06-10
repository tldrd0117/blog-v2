import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/signin">
          <Signin/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
