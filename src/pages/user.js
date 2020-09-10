import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import Grid from '@material-ui/core/Grid';

// import ScreamSkeleton from '../util/ScreamSkeleton';
// import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/userActions';
import { getViewUser } from '../redux/actions/dataActions';
import { withStyles } from '@material-ui/core';


const styles = (theme) => ({
  ...theme.spreadThis,
});

class user extends Component {
  state = {
    screamIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) this.setState({ screamIdParam: screamId });

    this.props.getViewUser(handle)

  }

  render() {
    const { loading } = this.props.data;
    const screams = this.props.screams;

    const { screamIdParam } = this.state;

    const screamsMarkup = loading ? (
      // <ScreamSkeleton />
      <div />
    ) : screams === null ? (
      <p>No screams from this user</p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
            screams.map((scream) => {
              if (scream.screamId !== screamIdParam)
                return <Scream key={scream.screamId} scream={scream} />;
              else return <Scream key={scream.screamId} scream={scream} openDialog />;
            })
          );

    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.props.viewUser === null ? (
            // <ProfileSkeleton />
            <div />
          ) : (
              <Profile className={this.props.classes.profileClass} />
            )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  viewUser: state.data.viewUser,
  screams: state.data.viewScreams
});

export default connect(
  mapStateToProps,
  { getUserData, getViewUser }
)(withStyles(styles)(user));
