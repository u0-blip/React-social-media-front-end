import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


import PropTypes from 'prop-types';

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';

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

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MenuItem, Menu } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { deleteScream, handleLike, handleComment, handleShare } from '../../redux/actions/dataActions';

// export class ScreamDialog extends Component {
//     render() {
//         return (
//             <div>
//                 <Typography>
//                     {this.props.handle}
//                 </Typography>
//             </div>
//         )
//     }
// }


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
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

}));

const Scream = function (props) {
    const classes = useStyles();
    dayjs.extend(relativeTime)


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
                    <MenuItem onClick={handleClose}>
                        {user.credentials.handle == handle && <DeleteIcon aria-label="delete" onClick={handleDelete} />}
                        {user.credentials.handle != handle && <DeleteForeverIcon aria-label="delete" />}
                    </MenuItem>
                </Menu>
            </Fragment>
        ) : (<div></div>)

    console.log('scream update')
    return (
        <Card className={classes.root}>
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
                <IconButton aria-label="comment" onClick={() => props.handleComment()}>
                    <MessageIcon /> {commentCount}
                </IconButton>
                <IconButton aria-label="share" onClick={() => props.handleShare()}>
                    <ShareIcon /> 0
                </IconButton>
            </CardActions>
        </Card>
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
    handleComment,
    handleShare
}
const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, mapActiontoProps)(Scream);
