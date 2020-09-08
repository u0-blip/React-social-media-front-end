import React, { Component, Fragment } from 'react'
import { withStyles, Card, Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import SearchSkeleton from './searchSkeleton';
import { connect } from 'react-redux';
import { Post, User } from './ResUtil';
import Scream from '../components/scream/Scream';
import { PersonalProfile } from '../components/profile/Profile';

const styles = (theme) => ({

});


export class SearchRes extends Component {
    render() {
        let { searching, search_res } = this.props;
        if (!searching) {
            return (
                // search res include, posts, users
                <Grid container sm={9} xs={11} style={{ margin: 'auto' }} spacing={1} direction='column'>
                    <Typography variant='h6'>
                        Posts
                    </Typography>
                    {search_res.posts.map((post) => <Scream scream={post} key={post.id} />)}
                    <Typography variant='h6'>
                        Users
                    </Typography>
                    <Card>
                        {search_res.users.map((user) => <PersonalProfile user={user} key={user.userId} />)}
                    </Card>
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