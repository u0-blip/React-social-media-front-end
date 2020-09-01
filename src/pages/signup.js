import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AppIcon from '../statics/app.png'

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
    handleSubmit = (event) => {

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const {
            classes,
        } = this.props;
        const { errors } = this.state;

        return (
            <Grid container justify='center' className={classes.form}>
                <Grid item sm='6'>
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
                            fullWidth

                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle} />
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.button}
                        // disabled={loading}
                        >
                            Sign up
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

const mapActionsToProps = {

};

const mapStateToProps = (state) => ({

});

export default withStyles(styles)(Signup);