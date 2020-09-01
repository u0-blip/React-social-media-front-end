import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';

import axios from 'axios';

import Navbar from './navbar';

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import User from './pages/user';


axios.defaults.baseURL =
  'http://localhost:5000/social-media-app-287512/asia-northeast1/api';


function App() {
  return (
      <Provider store={store}>
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
      </Provider>
  );
}

export default App;
