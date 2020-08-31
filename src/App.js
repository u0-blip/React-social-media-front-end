import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {  } from '@material-ui/core';

import './App.css';

import Navbar from './navbar';

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import User from './pages/user';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/users/:handle' component={User}/>
            <Route exact path='/users/:handle/scream/:screamId' component={User}/>
          </Switch>
        </div>
        </Router>
    </div>
  );
}

export default App;
