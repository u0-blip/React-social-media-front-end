import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { connect } from 'react-redux';
import Notifications from './Notifications';

export class Navbar extends Component {
  render() {

    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Button color="inherit" component={Link} to="/">
            Home
            </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
            </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
            </Button>
          {this.props.authenticated && <Notifications />}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapActiontoProps = {

}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  authenticated: state.user.authenticated,

});

export default connect(mapStateToProps, mapActiontoProps)(Navbar);