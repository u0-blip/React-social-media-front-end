import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import Profile from '../components/profile/Profile'
import Scream from '../components/scream/Scream'
import { ScreamSkeleton } from '../components/scream/ScreamSkeleton'
import { getScreams } from '../redux/actions/dataActions';
import { getUserData } from '../redux/actions/userActions';
import axios from 'axios';

export class Home extends Component {
    componentDidMount() {
        if (!this.props.user.autherticated) {
            const FBIdToken = localStorage.getItem("FBIdToekn");
            axios.defaults.headers.common['Authorization'] = FBIdToken;
            this.props.getUserData();
        }
        this.props.getScreams();
    }
    render() {
        const { screams, loading } = this.props.data;
        let recentScreamsMarkup = !loading ? (
            screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
        ) : (
                <ScreamSkeleton />
            )
        return (
            <Grid container spacing={0}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12} className='profile' >
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
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
)(Home)
