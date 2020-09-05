import React, { Fragment, Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { updateInfo } from '../../redux/actions/userActions';

import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditProfileButton from './EditProfileButton';
import { logout } from '../../redux/actions/userActions';

class _EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            website: this.state.website || '',
            bio: this.state.Introduction || '',
            location: this.state.Location || '',
        };
        this.props.updateInfo(userData);
        this.handleClose();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        const {
            user: {
                credentials: { handle, createAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;

        return (
            <Fragment>
                <EditProfileButton
                    tip='Edit profile Information'
                    onClick={this.handleClickOpen}
                    variant="outlined"
                    btnClassName='button'
                    style={{
                        position: 'relative',
                        left: '71%'
                    }}
                >
                    <EditIcon color='primary' />
                </EditProfileButton>

                <EditProfileButton
                    tip='Logout'
                    onClick={this.props.logout}
                    variant="outlined"
                    btnClassName='button'
                    style={{
                        position: 'relative',
                        left: '70%'
                    }}
                >
                    <ExitToAppIcon color='primary' />
                </EditProfileButton>

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter you new detail.
              </DialogContentText>
                        <TextField
                            defaultValue={website}
                            onChange={this.handleChange}
                            autoFocus
                            margin="dense"
                            id="website"
                            label="website"
                            type="website"
                            value={this.state.website}
                            fullWidth
                        />
                        <TextField
                            defaultValue={location}
                            onChange={this.handleChange}
                            margin="dense"
                            id="Location"
                            label="Location"
                            type="Location"
                            value={this.state.Location}
                            fullWidth
                        />
                        <TextField
                            defaultValue={bio}
                            onChange={this.handleChange}
                            multiline
                            rows="3"
                            margin="dense"
                            id="Introduction"
                            label="Introduction"
                            type="Introduction"
                            value={this.state.Introduction}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
              </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Submit
              </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapActionToProps = {
    updateInfo,
    logout
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, mapActionToProps)(_EditProfile);