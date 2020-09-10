import React, { Component, Fragment } from 'react'
import { Typography, Tooltip, IconButton, Avatar, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

import anon_img from '../../statics/anon.png';

import EditProfile from './EditProfile';
import EditProfileButton from './EditProfileButton';

import LocationOn from '@material-ui/icons/LocationOn';
import WebIcon from '@material-ui/icons/Language';
import PersonIcon from '@material-ui/icons/Person';
import { uploadImage } from '../../redux/actions/userActions';

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    ...theme.spreadThis,
    profile_icon: {
        margin: '0px 9px -6px 0px'
    },
    buttons: {
        margin: '30px auto 25px  auto'
    },
    name_text: {
        textAlign: 'center'
    }
});

class PersonalProfile extends Component {
    render() {
        const {
            classes,
            user: { handle, createAt, imageUrl, bio, website, location },
        } = this.props;

        return (
            <Fragment>
                <div className={classes.logo_image} >
                    <div className={classes.polaroid}>
                        <Avatar src={imageUrl} className={classes.logo_image} />
                        {this.fileInput}
                        <EditProfileButton
                            tip='Edit profile picture'
                            onClick={this.handleEditPicture}
                            btnClassName='button'
                            style={{
                                position: 'relative',
                                marginTop: '-74%',
                                left: '71%'
                            }}
                        >
                            <EditIcon color='primary' />
                        </EditProfileButton>
                    </div>
                </div>
                <Typography variant='body1' className={classes.name_text}>
                    {handle}
                </Typography>
                {location && <Typography variant='body1' className={classes.profile_text}>
                    <LocationOn className={classes.profile_icon} /> {location}
                </Typography>}
                {website && <Typography variant='body1' className={classes.profile_text}>
                    <WebIcon className={classes.profile_icon} /> <a href={website}> {website} </a>
                </Typography>}
                {bio && <Typography variant='body1' className={classes.profile_text}>
                    <PersonIcon className={classes.profile_icon} /> {bio}
                </Typography>}
                <EditProfile />
            </Fragment>
        )
    }
}

class _SearchPersonalProfile extends Component {
    render() {
        const {
            classes,
            user: { handle, createAt, imageUrl, bio, website, location },
        } = this.props;

        return (
            <Grid item sm={3} xs={6} >
                <Card style={{ marginLeft: '10px', height: '20rem' }}>
                    <div className={classes.logo_image} >
                        <div className={classes.polaroid}>
                            <Avatar src={imageUrl} className={classes.logo_image} />
                        </div>
                    </div>
                    <Typography variant='body1' className={classes.name_text}>
                        {handle}
                    </Typography>
                    {location && <Typography variant='body1' className={classes.profile_text}>
                        <LocationOn className={classes.profile_icon} /> {location}
                    </Typography>}
                    {website && <Typography variant='body1' className={classes.profile_text}>
                        <WebIcon className={classes.profile_icon} /> <a href={website}> {website} </a>
                    </Typography>}
                    {bio && <Typography variant='body1' className={classes.profile_text}>
                        <PersonIcon className={classes.profile_icon} /> {bio}
                    </Typography>}
                </Card>
            </Grid>
        )
    }
}

export class Profile extends Component {
    constructor() {
        super();
        this.imageInput = React.createRef();
        this.fileInput = <input
            type='file'
            hidden='hidden'
            ref={this.imageInput}
            onChange={this.handleImageChange}
        />;
        this.handleEditPicture = this.handleEditPicture.bind(this);

    }

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('photo', image, image.name);
        this.props.uploadImage(formData);
    }

    handleEditPicture() {
        this.imageInput.current.click();
    }

    render() {
        const {
            classes,
            user: {
                credentials: { handle, createAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;

        let profile;

        if (authenticated) {
            profile = <PersonalProfile user={this.props.user.credentials} classes={classes} />
        } else {
            profile =
                <Fragment>
                    <div className={classes.logo_image} >
                        <div className={classes.polaroid}>
                            <img src={anon_img} className={classes.logo_image} />
                        </div>
                    </div>

                    <Typography variant="body2" align="center">
                        No profile found, please login again
                    </Typography>
                    <Grid item xs={12} className={classes.buttons}>
                        <Grid container justify="center" spacing={3}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to="/login"
                                >
                                    Login
                        </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to="/signup"
                                >
                                    Signup
                        </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Fragment>
        }
        return (
            <Paper style={{ position: 'fixed', width: '31%' }}>
                {profile}
            </Paper>
        )
    }
}


Profile.propTypes = {
    user: PropTypes.object.isRequired,
    // openDialog: PropTypes.bool
};

const mapActionToProps = {
    uploadImage
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapStateToPropsPersonalProfile = (state) => ({
});


const SearchPersonalProfile = connect(mapStateToPropsPersonalProfile, mapActionToProps)(withStyles(styles)(_SearchPersonalProfile));

export {
    SearchPersonalProfile
}
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Profile));