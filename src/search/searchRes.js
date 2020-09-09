import React, { Component, Fragment } from 'react'
import { withStyles, Card, Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import SearchSkeleton from './searchSkeleton';
import { connect } from 'react-redux';
import { Post, User } from './ResUtil';
import { SearchScream } from '../components/scream/Scream';
import { SearchPersonalProfile } from '../components/profile/Profile';

const styles = (theme) => ({

});


export class SearchRes extends Component {
    render() {
        let { searching, search_res } = this.props;
        if (!searching) {
            return (
                // search res include, posts, users
                <Grid container>
                    <Grid item sm={10} xs={11} style={{ margin: 'auto' }}>
                        <Grid container spacing={1} direction='column'>
                            <Typography variant='h6'>
                                Posts
                    </Typography>
                            <Grid container>
                                {search_res.posts.map((post) => <SearchScream scream={post} key={post.id} />)}
                            </Grid>
                            <Typography variant='h6'>
                                Users
                    </Typography>
                            <Grid container spacing={1} >
                                {search_res.users.map((user) => <SearchPersonalProfile user={user} key={user.userId} />)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )
        } else {
            return <SearchSkeleton />
        }
    }
}

SearchRes.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapActiontoProps = {
}
const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user,
    searching: state.data.searching,
    search_res: state.data.search_res,
    data: state.date
});



export default connect(mapStateToProps, mapActiontoProps)(withStyles(styles)(SearchRes));