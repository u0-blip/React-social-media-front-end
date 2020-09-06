import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


import PropTypes from 'prop-types';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';

// MUI components

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MessageIcon from '@material-ui/icons/Message';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { TextField, InputAdornment } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { postComment } from '../../redux/actions/dataActions'
import AccountCircle from '@material-ui/icons/AccountCircle';

const style = (theme) => ({
    ...theme.spreadThis,
    root: {
        maxWidth: '80%',
        marginLeft: '10%'

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

    commentButton: {
        maxHeight: '28px',
        margin: '10px 2px 10px auto'
    }
});

export class CommentBox extends Component {
    constructor() {
        super();
        this.state = {
            post: '',
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.UI.errors });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const postData = {
            comment: this.state.comment,
        };

        this.props.postComment(postData, this.props.screamId, this.props.user.credentials);
        this.setState({
            comment: ''
        });
    }

    render() {
        dayjs.extend(relativeTime)

        const {
            classes,
            UI,
            user: {
                authenticated,
                credentials: {
                    imageUrl
                }
            }
        } = this.props;

        const loading = UI.loading;
        const error_state = this.state.errors != null && this.state.errors.comment

        if (authenticated) {
            return (
                <Fragment>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Avatar className={classes.commentThumb} src={imageUrl} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                        className={classes.commentButton}
                                        disabled={loading}
                                        onClick={this.handleSubmit}

                                    >
                                        {!loading ? 'Comment' : (
                                            <CircularProgress size={22} />
                                        )}
                                    </Button>
                                </InputAdornment>
                            )
                        }}
                        name='comment'
                        fullWidth
                        value={this.state.comment}
                        helperText={error_state ? this.state.errors.comment : ''}
                        error={error_state ? true : false}
                        onChange={this.handleChange}
                    />

                </Fragment>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}


CommentBox.propTypes = {
    user: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const mapActiontoProps = {
    postComment
}
const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
});

export default connect(mapStateToProps, mapActiontoProps)(withStyles(style)(CommentBox));
