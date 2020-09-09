import React, { Component, Fragment } from 'react'
import { withStyles, Card, Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import SearchSkeleton from './searchSkeleton';
import { connect } from 'react-redux';
import { Post, User } from './ResUtil';
import { SearchScream } from '../components/scream/Scream';
import { SearchPersonalProfile } from '../components/profile/Profile';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';


const styles = (theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});


export class SearchRes extends Component {
    state = {
        post_expanded: false,
        user_expanded: false,
    }
    handlePostExpandClick = () => {
        this.setState({ post_expanded: !this.state.post_expanded });
    };
    handleUserExpandClick = () => {
        this.setState({ user_expanded: !this.state.user_expanded });
    };
    render() {
        let { searching, search_res, classes } = this.props;
        let post_display_num = [2, 2];
        let post_display_len = post_display_num[0] * post_display_num[1];
        let user_display_num = [2, 4];
        let user_display_len = user_display_num[0] * user_display_num[1];

        const { post_expanded, user_expanded } = this.state;

        if (!searching) {
            let total_len = search_res.posts.length;
            let post_expand = (total_len > post_display_len &&
                <Fragment>
                    <Grid item sm={12} xs={12}>
                        <div style={{ width: '100%' }}>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: post_expanded,
                                })}
                                // hidden={!post_expanded}
                                onClick={this.handlePostExpandClick}
                                aria-expanded={post_expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </div>
                    </Grid>
                    <Collapse style={{ width: '100%' }}
                        in={post_expanded} timeout="auto" unmountOnExit>
                        <Grid container alignItems="flex-start">
                            {search_res.posts.slice(post_display_len, total_len).map((post) => <SearchScream scream={post} key={post.id} />)}
                        </Grid>
                    </Collapse>
                </Fragment>
            )

            total_len = search_res.users.length;
            let user_expand = (total_len > user_display_len &&
                <Fragment>
                    <Grid item sm={12} xs={12}>
                        <div style={{ width: '100%' }}>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: user_expanded,
                                })}
                                // hidden={!user_expanded}
                                onClick={this.handleUserExpandClick}
                                aria-expanded={user_expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </div>
                    </Grid>
                    <Collapse style={{ width: '100%' }}
                        in={user_expanded} timeout="auto" unmountOnExit>
                        <Grid container alignItems="flex-start">
                            {search_res.users.slice(user_display_len, total_len).map((user) => <SearchPersonalProfile user={user} key={user.userId} />)}
                        </Grid>
                    </Collapse>
                </Fragment>
            )

            return (
                // search res include, posts, users
                <Grid container>
                    <Grid item sm={10} xs={11} style={{ margin: 'auto' }}>
                        <Grid container spacing={1} direction='column'>
                            <Typography variant='h6'>
                                Posts
                            </Typography>
                            <Grid container>
                                {search_res.posts.slice(0, post_display_len).map((post) => <SearchScream scream={post} key={post.id} />)}
                                {post_expand}
                            </Grid>
                            <Typography variant='h6'>
                                Users
                            </Typography>
                            <Grid container spacing={1} >
                                {search_res.users.slice(0, user_display_len).map((user) => <SearchPersonalProfile user={user} key={user.userId} />)}
                                {user_expand}
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