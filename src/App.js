import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// MUI stuff
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

import axios from "axios";

import Navbar from "./utils/navbar";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthoRoute from './utils/AuthRoute';


import User from "./pages/user";
import SearchRes from './search/searchRes';
import GamesHome from './games/gamesHome';
import Games from './games/games';

axios.defaults.baseURL =
  "https://australia-southeast1-social-media-e38fc.cloudfunctions.net/api";
// 'http://localhost:5000/social-media-app-287512/us-central1/api/'

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthoRoute exact path="/login" component={Login} />
              <AuthoRoute exact path="/signup" component={Signup} />
              <Route exact path="/users/:handle" component={User} />
              <Route
                exact
                path="/users/:handle/scream/:screamId"
                component={User}
              />
              <Route path="/search/:query" component={SearchRes} />
              <Route path="/games" component={GamesHome} />
              <Route path="/games/:game" component={Games} />

            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
