import React from 'react';
import logo from './logo.svg';
import './App.css';
import "moment/locale/ko"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import User from './pages/User';
import PostWrite from './pages/PostWrite';
import PostView from './pages/PostView';
import { useStore } from './hooks';
import { throttle } from './utils/throttle';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/signin">
          <User/>
        </Route>
        <Route path="/write/:postId">
          <PostWrite/>
        </Route>
        <Route path="/write">
          <PostWrite/>
        </Route>
        <Route path="/view/:postId">
          <PostView/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
