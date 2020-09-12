import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AppIcon from '../statics/app.png'

import PropTypes from 'prop-types'


import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(userData, this.props.history);
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
                            <img alt='loginicon' src={AppIcon} className={classes.logo_image} />

                        </div>
                    </div>

                    <Typography variant='h5' className={classes.pageTitle}>
                        Login
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
                        {errors.general && (
                            <Typography>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            disabled={loading}
                        >
                            {!loading ? 'Login' : (
                                <CircularProgress size={22} />
                            )}
                        </Button>

                        <br />
                        <small>
                            Do not have an account? sign up <Link style={{ textDecoration: 'underline' }} to='/signup'>here</Link>
                        </small>
                    </form>
                </Grid>

            </Grid >
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
};

const mapActionsToProps = {
    loginUser,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));