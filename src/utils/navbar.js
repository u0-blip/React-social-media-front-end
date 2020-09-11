import React, { Component } from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { connect } from 'react-redux';
import Notifications from './Notifications';
import SearchBar from '../search/searchBar';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import IconButton from '@material-ui/core/IconButton';

export class Navbar extends Component {
  render() {

    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Button color="inherit" component={Link} to="/">
            <HomeIcon />
          </Button>
          <SearchBar />

          <div width='30px'>
            <Notifications />
            <IconButton
              aria-label="games"
              component={Link}
              to="/games"
            >
              <SportsEsportsIcon />
            </IconButton>
            <Button
              variant="contained"
              component={Link}
              to="/login"
            >
              Login
                        </Button>
            <Button
              variant="contained"
              component={Link}
              to="/signup"
            >
              Signup
                        </Button>
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