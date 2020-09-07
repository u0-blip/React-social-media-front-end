import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MenuItem, Menu, IconButton, Badge, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import dayjs from 'dayjs';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from 'react-router-dom';
import { markNotificationsSeen, markNotificationsOpen } from './redux/actions/userActions';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = (theme) => ({
    ...theme.spreadThis,
    not_verb_icon: {
        position: 'absolute',
        marginTop: '-18px',
        marginLeft: '32px',
        color: 'gray',
    }
});

export class Notifications extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    state = {
        anchorEl: false,
    }

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }
    handleClose() {
        this.setState({ anchorEl: null });
    }
    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter((not) => !not.seen)
            .map((not) => not.notification_id);
        this.props.markNotificationsSeen(unreadNotificationsIds);
    };

    render() {
        const notifications = this.props.notifications;
        const ITEM_HEIGHT = 70;
        const classes = this.props.classes;

        let notificationsIcon;
        if (notifications && notifications.length > 0) {
            notifications.filter((not) => not.seen === false).length > 0
                ? (notificationsIcon = (
                    <Badge
                        badgeContent={
                            notifications.filter((not) => not.seen === false).length
                        }
                        color="secondary"
                    >
                        <NotificationsIcon />
                    </Badge>
                ))
                : (notificationsIcon = <NotificationsIcon />);
        } else {
            notificationsIcon = <NotificationsIcon />;
        }
        let notificationsMarkup =
            notifications && notifications.length > 0 ? (
                notifications.map((not) => {
                    const verb = not.type === 'like' ? 'liked' : 'commented on';
                    const time = dayjs(not.createAt).fromNow();
                    const readColor = not.opened ? '#fff' : 'gainsboro';

                    const icon =
                        not.type === 'like' ? (
                            <FavoriteIcon
                                className={classes.not_verb_icon} />
                        ) : (
                                <ChatIcon className={classes.not_verb_icon} />
                            );
                    const notText = ' ' + verb + ' your scream ';
                    return (
                        <MenuItem key={not.createAt} button={false} style={{ background: readColor }}>
                            <div>
                                <Avatar className={classes.notThumb} src={not.imageUrl} />
                                {icon}
                            </div>
                            <Grid container direction='column'>
                                <Grid item>
                                    <Typography
                                        component={Link}
                                        onClick={() => { this.props.markNotificationsOpen([not.notification_id]) }}
                                        style={{ color: 'black' }}
                                        variant="body1"
                                        to={`/users/${not.recipient}/scream/${not.screamId}`}
                                        style={{ width: '270px' }}
                                    >
                                        <strong> {not.sender}</strong>
                                        {notText}
                                    </Typography>
                                    <DeleteIcon style={{ float: 'right', color: 'black' }} aria-label="delete" />
                                </Grid>
                                <Grid item>

                                    <Typography
                                        style={{ color: 'black' }}
                                        variant='caption'>
                                        {time}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    );
                })
            ) : (
                    <MenuItem style={{ color: 'GrayText' }} onClick={this.handleClose}>
                        You have no notifications yet
                    </MenuItem>
                );
        return (
            <Fragment>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    {notificationsIcon}
                </IconButton>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}

                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                        },
                    }}
                >
                    {notificationsMarkup}

                </Menu>
            </Fragment>
        )
    }
}

const mapActiontoProps = {
    markNotificationsSeen,
    markNotificationsOpen
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data,
    authenticated: state.user.authenticated,
    notifications: state.user.notifications,
});

export default connect(mapStateToProps, mapActiontoProps)(withStyles(styles)(Notifications));