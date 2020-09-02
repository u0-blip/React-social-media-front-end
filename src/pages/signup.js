import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AppIcon from '../statics/app.png'

import PropTypes from 'prop-types'


import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});

export class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {
            classes,
            UI: { loading },
        } = this.props;

        const { errors } = this.state;

        return (
            <Grid container justify='center' className={classes.form}>
                <Grid item sm={6}>
                    <div className={classes.logo_image} >
                        <div className={classes.polaroid}>
                            <img src={AppIcon} className={classes.logo_image} />

                        </div>
                    </div>

                    <Typography variant='h5' className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            fullWidth

                            id='email'
                            name='email'
                            type='email'
                            label='Email'
                            className={classes.textField}
                            onChange={this.handleChange}
                            variant="outlined"

                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                        />
                        <TextField
                            fullWidth
                            id='password'
                            name='password'
                            type='password'
                            label='Password'
                            className={classes.textField}
                            onChange={this.handleChange}
                            variant="outlined"

                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password} />
                        <TextField
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                            label='Confirm Password'
                            className={classes.textField}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth

                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword} />
                        <TextField
                            id='handle'
                            name='handle'
                            type='text'
                            label='Handle'
                            className={classes.textField}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth

                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle} />
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            disabled={loading}
                        >
                            {!loading ? 'Sign up' : (
                                <CircularProgress size={22} />
                            )}
                        </Button>

                        <br />
                        <small>
                            Already have an account? Login <Link style={{ textDecoration: 'underline' }} to='/login'>here</Link>
                        </small>
                    </form>
                </Grid>

            </Grid >
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapActionsToProps = {
    signupUser,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));