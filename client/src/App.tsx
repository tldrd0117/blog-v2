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
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import PostWrite from './pages/PostWrite';
import PostView from './pages/PostView';
import { useStore } from './stores';
import { throttle } from './utils/throttle';

function App() {
  const { scrollStore } = useStore()
  window.onscroll = function(){
    throttle(()=>{
      //throttling 으로 변경 예정
      scrollStore.scroll(window.pageYOffset)
    }, 100)
  }
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
