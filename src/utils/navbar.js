import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { connect } from 'react-redux';
import Notifications from './Notifications';
import SearchBar from '../search/searchBar';
import HomeIcon from '@material-ui/icons/Home';

export class Navbar extends Component {
  render() {

    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Button color="inherit" component={Link} to="/">
            <HomeIcon />
          </Button>
          <SearchBar />
          <div style={{ width: '30px' }}>
            {this.props.authenticated && <Notifications />}
          </div>
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