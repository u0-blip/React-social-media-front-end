import React from 'react'

import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MessageIcon from '@material-ui/icons/Message';
import LocationOn from '@material-ui/icons/LocationOn';
import WebIcon from '@material-ui/icons/Language';
import PersonIcon from '@material-ui/icons/Person';
import clsx from 'clsx';
import { useStyles } from '../components/scream/Scream';

export const SearchPostSkeleton = function (props) {

    const classes = useStyles();
    return (
        <Grid item sm={6} xs={12} style={{ marginLeft: '0px' }} className={clsx(classes.root, classes.scream)}>
            <Card style={{ marginLeft: '10px' }}>
                <CardHeader
                    avatar={
                        <Skeleton variant='circle' width={25} height={25} />
                    }
                    title={<Skeleton variant='text' width={'5rem'} />}
                    subheader={<Skeleton variant='text' width={'7rem'} />}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <Skeleton variant='text' />
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton style={{ width: '20%' }} aria-label="like" >
                        <FavoriteIcon
                        /> <Skeleton variant='text' width="2rem" />
                    </IconButton>
                    <IconButton
                        style={{ width: '20%' }}
                        aria-label="comment">
                        <MessageIcon /> <Skeleton variant='text' width="2rem" />
                    </IconButton>
                    <IconButton
                        style={{ width: '20%' }}
                        aria-label="share">
                        <ShareIcon /> <Skeleton variant='text' width="2rem" />
                    </IconButton>
                </CardActions>

            </Card>

        </Grid>
    )
}

export const SearchUserSkeleton = function (props) {
    const classes = useStyles();
    return (
        <Grid item sm={3} xs={6} >
            <Card style={{ marginLeft: '10px', height: '20rem' }}>
                <div className={classes.logo_image} >
                    <div className={classes.polaroid}>
                    </div>
                </div>
                <Grid container justify='center'>
                    <Skeleton variant='text' width={'3rem'} />
                </Grid>
                <Grid container justify='flex-start'>
                    <LocationOn className={classes.profile_icon} />
                    <Skeleton variant='text' width={'3rem'} />
                </Grid>
                <Grid container justify='flex-start'>
                    <WebIcon className={classes.profile_icon} />
                    <Skeleton variant='text' width={'3rem'} />
                </Grid>
                <Grid container justify='flex-start'>
                    <PersonIcon className={classes.profile_icon} />
                    <Skeleton variant='text' width={'3rem'} />
                </Grid>
            </Card>
        </Grid>
    )
}
