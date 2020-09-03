import React, { Component, Fragment } from 'react'
import { Typography, Tooltip, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

import anon_img from '../../statics/anon.png';


import { uploadImage } from '../../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});

const EditProfileButton = ({ children, onClick, tip, btnClassName, tipClassName }) =>
    <Tooltip title={tip} className={tipClassName} placement='top'>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>



export class Profile extends Component {
    constructor() {
        super();
        this.fileRef = React.createRef();
        this.fileInput = <input
            type='file'
            hidden='hidden'
            ref="imageInput"
            onChange={this.handleImageChange}
        />;
    }

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('photo', image, image.name);
        this.props.uploadImage(formData);
    }
    handleEditPicture() {
        this.refs.fileUploader.click();

    }
    render() {
        const {
            classes,
        } = this.props;

        const user = this.props.user;

        let profile;

        if (user.authenticated) {
            profile =
                <Fragment>
                    <div className={classes.logo_image} >
                        <div className={classes.polaroid}>
                            <img src={user.credentials.imageUrl} className={classes.logo_image} />
                            {this.fileInput}
                            <EditProfileButton
                                tip='Edit profile picture'
                                onClick={this.handleEditPicture}
                                btnClassName='button'
                                htmlFor='imageInput'
                                ref={this.fileRef}
                            >
                                <EditIcon color='primary' />
                            </EditProfileButton>
                        </div>
                    </div>
                    <Typography>
                        Name: {user.credentials.handle}
                    </Typography>
                    {user.location && <Typography>
                        Location: {user.credentials.location}
                    </Typography>}
                    {user.introduction && <Typography>
                        Introduction: {user.credentials.bio}
                    </Typography>}
                </Fragment>
        } else {
            profile =
                <Fragment>
                    <div className={classes.logo_image} >
                        <div className={classes.polaroid}>
                            <img src={anon_img} className={classes.logo_image} />
                        </div>
                    </div>
                    <Typography>
                        Name: Anonymous
                </Typography>
                </Fragment>
        }
        return (
            <Paper>
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

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Profile));