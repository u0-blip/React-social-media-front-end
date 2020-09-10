import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { getScream } from '../../redux/actions/dataActions';
import CommentBox from './CommentBox';
import { InputAdornment, Avatar, Grid, Card, CardHeader, Paper } from '@material-ui/core';

import axios from 'axios';
import { error_handle } from '../../redux/actions/dataActions';

const useStyles = makeStyles((theme) => ({
    ...theme.spreadThis,
    commentBox: {
        margin: '10px 2px 10px auto'
    },

    comment: {
        maxWidth: '800px',
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));

export class Comment extends Component {

    render() {
        const classes = this.props.classes
        return (
            <Fragment>
                <Grid item container direction='row' spacing={0}>
                    <Grid item xs={1}>
                        <Avatar style={{ marginTop: '7px' }} className={classes.commentThumb} src={this.props.comment.imageUrl} />
                    </Grid>
                    <Grid item xs={10}>
                        <Card>
                            <CardContent style={{ padding: '3px' }}>
                                <Typography style={{ marginBottom: '6px', marginTop: '-7px' }} variant='h6'>
                                    {this.props.comment.handle}
                                </Typography>
                                <Typography>
                                    {this.props.comment.body}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Fragment >
        )
    }
}

const CommentSection = function (props) {
    const classes = useStyles();

    const max_comments_shown = 5;

    const content = (props.expanded) ? (
        <Fragment>
            <hr />
            <div className={classes.comment}>
                <Grid container spacing={3}>
                    {props.comments[props.screamId] && props.comments[props.screamId].map((comment, i) =>
                        <Comment key={comment.id} comment={comment} classes={classes} />)}
                    <Grid item xs={12}>
                        <CommentBox screamId={props.screamId} />
                    </Grid>
                </Grid>

            </div>
        </Fragment>
    ) : (<div />);

    return (
        <Collapse in={props.expanded} timeout="auto" unmountOnExit>
            {content}
        </Collapse>
    )
}

CommentSection.propTypes = {
    user: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired,
    likes: PropTypes.object.isRequired,
};

const mapActiontoProps = {
    getScream
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data,
    comments: state.data.comments,
    likes: state.data.likes
});

export default connect(mapStateToProps, mapActiontoProps)(CommentSection);