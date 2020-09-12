import React, { Component } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


import PropTypes from 'prop-types';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';

// MUI components

import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { postScream } from '../../redux/actions/dataActions'

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

});

export class PostBox extends Component {
    constructor() {
        super();
        this.state = {
            post: '',
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const postData = {
            body: this.state.post,
            handle: this.props.user.handle,
            userImage: this.props.user.imageUrl
        };

        this.props.postScream(postData);
        this.setState({
            post: ''
        });
    }

    render() {
        dayjs.extend(relativeTime)

        const {
            classes,
            UI,
            user: {
                authenticated,
            }
        } = this.props;

        const loading = UI.loading;
        const errors = UI.errors;
        const error_state = errors != null && errors.post


        if (authenticated) {
            return (
                <Card className={classes.root}>
                    <CardContent>
                        <TextField
                            label="What's in your mind?"
                            variant="outlined"
                            name='post'
                            fullWidth
                            rows={4}
                            multiline
                            value={this.state.post}
                            helperText={error_state ? errors.post : ''}
                            error={error_state ? true : false}
                            onChange={this.handleChange}
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            disabled={loading}
                            onClick={this.handleSubmit}
                            style={{
                                float: 'right'
                            }}

                        >
                            {!loading ? 'post' : (
                                <CircularProgress size={22} />
                            )}
                        </Button>
                    </CardContent>

                </Card>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}


PostBox.propTypes = {
    user: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const mapActiontoProps = {
    postScream
}
const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
});

export default connect(mapStateToProps, mapActiontoProps)(withStyles(style)(PostBox));
