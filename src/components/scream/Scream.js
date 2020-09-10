import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


import PropTypes from 'prop-types';

// MUI stuff

// MUI components

import { makeStyles } from '@material-ui/core/styles';
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
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MenuItem, Menu, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { deleteScream, handleLike, handleShare, getScream } from '../../redux/actions/dataActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentSection from './CommentSection';

const useStyles = makeStyles((theme) => ({
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
        color: 'grey',
        transform: 'scaleX(-1)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'scaleX(1)',
        color: '#383434',
    },
    scream: {
        margin: `${theme.spacing(1)}px auto`,
    }
}));


const Scream = function (props) {
    const classes = useStyles();
    dayjs.extend(relativeTime)

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        // get the data from the server
        props.getScream(props.screamId);
        setExpanded(!expanded);
    };

    const {
        scream: {
            body, createAt, userImage, handle, screamId, likeCount, commentCount
        },
        user,
        user: {
            authenticated,
            likes
        }
    } = props;


    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        props.deleteScream(screamId);
    }


    const action = authenticated ?
        (
            <Fragment>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                        },
                    }}
                >
                    {user.credentials.handle == handle &&
                        [
                            <MenuItem onClick={handleClose} key='delete'>
                                <Typography >Delete</Typography>
                                <DeleteIcon style={{ marginLeft: 'auto' }} aria-label="delete" onClick={handleDelete} />
                            </MenuItem>,
                            <MenuItem onClick={handleClose} key='Hide'>
                                <Typography >Hide</Typography>
                                <VisibilityOffIcon style={{ marginLeft: 'auto' }} aria-label="Hide" />
                            </MenuItem>
                        ]
                    }
                    {user.credentials.handle != handle &&
                        [<MenuItem onClick={handleClose} key='Hide'>
                            <Typography>Hide</Typography>
                            <VisibilityOffIcon aria-label="Hide" />
                        </MenuItem>]
                    }
                </Menu>
            </Fragment>
        ) : (<div></div>)

    return (
        <Card className={clsx(classes.root, classes.scream)}>
            <CardHeader
                avatar={
                    <Avatar alt={handle[0]} src={userImage} />
                }
                action={action}
                title={handle}
                subheader={dayjs(createAt).fromNow()}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="like" onClick={() => props.handleLike(props.liked, screamId, props.user.handle)}>
                    <FavoriteIcon
                        style={props.liked ? { color: red[500] } : {}}
                    /> {likeCount}
                </IconButton>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="comment">
                    <MessageIcon className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })} /> {commentCount}
                </IconButton>
                <IconButton aria-label="share" onClick={() => props.handleShare()}>
                    <ShareIcon /> 0
                </IconButton>
            </CardActions>
            <CommentSection expanded={expanded} screamId={props.screamId} />
        </Card>
    );
}

const _SearchScream = function (props) {
    const classes = useStyles();
    dayjs.extend(relativeTime)

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        // get the data from the server
        props.getScream(props.screamId);
        setExpanded(!expanded);
    };

    const {
        scream: {
            body, createAt, userImage, handle, screamId, likeCount, commentCount
        },
        user,
        user: {
            authenticated,
            likes
        }
    } = props;


    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        props.deleteScream(screamId);
    }


    const action = authenticated ?
        (
            <Fragment>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                        },
                    }}
                >
                    {user.credentials.handle == handle &&
                        [
                            <MenuItem onClick={handleClose} key='delete'>
                                <Typography >Delete</Typography>
                                <DeleteIcon style={{ marginLeft: 'auto' }} aria-label="delete" onClick={handleDelete} />
                            </MenuItem>,
                            <MenuItem onClick={handleClose} key='Hide'>
                                <Typography >Hide</Typography>
                                <VisibilityOffIcon style={{ marginLeft: 'auto' }} aria-label="Hide" />
                            </MenuItem>
                        ]
                    }
                    {user.credentials.handle != handle &&
                        [<MenuItem onClick={handleClose} key='Hide'>
                            <Typography>Hide</Typography>
                            <VisibilityOffIcon aria-label="Hide" />
                        </MenuItem>]
                    }
                </Menu>
            </Fragment>
        ) : (<div></div>)

    return (
        <Grid item sm={6} xs={12} style={{ marginLeft: '0px' }} className={clsx(classes.root, classes.scream)}>
            <Card style={{ marginLeft: '10px' }}>
                <CardHeader
                    avatar={
                        <Avatar alt={handle[0]} src={userImage} />
                    }
                    action={action}
                    title={handle}
                    subheader={dayjs(createAt).fromNow()}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {body}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton style={{ width: '20%' }} aria-label="like" onClick={() => props.handleLike(props.liked, screamId, props.user.handle)}>
                        <FavoriteIcon
                            style={props.liked ? { color: red[500] } : {}}
                        /> {likeCount}
                    </IconButton>
                    <IconButton
                        style={{ width: '20%' }}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="comment">
                        <MessageIcon className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })} /> {commentCount}
                    </IconButton>
                    <IconButton
                        style={{ width: '20%' }}
                        aria-label="share"
                        onClick={() => props.handleShare()}>
                        <ShareIcon /> 0
                </IconButton>
                </CardActions>
                <CommentSection expanded={expanded} screamId={props.screamId} />

            </Card>
        </Grid>

    );
}


Scream.propTypes = {
    // user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const mapActiontoProps = {
    deleteScream,
    handleLike,
    handleShare,
    getScream
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data,
});

const SearchScream = connect(mapStateToProps, mapActiontoProps)(_SearchScream)

export default connect(mapStateToProps, mapActiontoProps)(Scream);

export {
    useStyles,
    SearchScream,
}