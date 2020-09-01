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

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
        // user:{
        //     authenticated,
        //     credentials: {handle}
        // }
    } = props;

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar alt={handle[0]} src={userImage} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={handle}
                subheader={dayjs(createAt).fromNow()}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="like">
                    <FavoriteIcon /> {likeCount}
                </IconButton>
                <IconButton aria-label="comment">
                    <MessageIcon /> {commentCount}
                </IconButton>
                <IconButton aria-label="share">
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

const mapStateToProps = (state) => ({
    // user: state.user
});

export default connect(mapStateToProps)(Scream);
