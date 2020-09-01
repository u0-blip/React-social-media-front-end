import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import Profile from '../components/profile/Profile'
import {Scream, ScreamSkeleton} from '../components/scream/Scream'
import {getScreams} from '../redux/actions/dataActions'

export class Home extends Component {
    componentDidMount(){
        this.props.getScreams();
    }

    render() {
        const {screams, loading} = this.props.data;
        let recentScreamsMarkup = !loading?(
            screams.map((scream)=><Scream key={scream.screamId} scream={scream}/>)
        ):(
            <ScreamSkeleton />
        )
        return (
            <Grid container spacing={5}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      data: state.data
    }
  }
  
const mapDispatchToProps = { getScreams }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
