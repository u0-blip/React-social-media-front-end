import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import Profile from '../components/profile/Profile'
import Scream from '../components/scream/Scream'
import { ScreamSkeleton } from '../components/scream/ScreamSkeleton'
import { getScreams } from '../redux/actions/dataActions';
import { getUserData } from '../redux/actions/userActions';
import axios from 'axios';
import Postbox from '../components/scream/postBox';
import { withStyles } from '@material-ui/core';


const styles = (theme) => ({
    ...theme.spreadThis,
});

export class Home extends Component {
    componentDidMount() {
        if (!this.props.user.autherticated) {
            const FBIdToken = localStorage.getItem("FBIdToken");
            axios.defaults.headers.common['Authorization'] = FBIdToken;
            this.props.getUserData();
        }
        this.props.getScreams();
    }
    render() {
        const { screams, loading } = this.props.data;
        let liked_id = []
        let liked_arr = []
        for (var i in this.props.likes) {
            liked_id.push(this.props.likes[i].screamId)
        }

        for (var i in screams) {
            if (liked_id.includes(screams[i].screamId)) {
                liked_arr.push(true);
            } else {
                liked_arr.push(false);
            }
        }

        let recentScreamsMarkup = !loading ? (
            screams.map((scream, i) =>
                <Scream key={scream.screamId} screamId={scream.screamId} scream={scream} liked={liked_arr[i]} />)
        ) : (
                <ScreamSkeleton />
            )

        return (
            <Grid container spacing={0}>
                <Grid item sm={8} xs={12}>
                    <Postbox history={this.props.history} />
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12} className='profile' >
                    <Profile className={this.props.classes.profileClass} />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        likes: state.user.likes,
        screams: state.data.screams,
        data: state.data,
        user: state.user
    }
}

const mapDispatchToProps = {
    getScreams,
    getUserData
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Home));
