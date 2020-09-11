import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';
import IconButton from '@material-ui/core/IconButton';
import { ScreamActions } from './Scream';

const styles = (theme) => ({
  ...theme.spreadThis,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '25%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
});

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { handle, screamId } = this.props;
    const newPath = `/users/${handle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${handle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        handle
      },
      scream,
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
        <Grid container spacing={5}>
          <Grid item sm={4}>
            <Grid container justify='center' direction='row'>
              <Grid item>
                <img src={userImage} alt="Profile" className={classes.profileImage} />

              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={8}>
            <Link
              to={`/users/${handle}`}
            >
              <Typography
                color="primary"
                variant="body1">
                {handle}

              </Typography>
            </Link>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="caption" color="textSecondary">
              {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body1">{body}</Typography>
            <div style={{ marginBottom: 'auto' }}>
              <ScreamActions scream={scream} />
            </div>
          </Grid>
        </Grid>
      );

    return (
      <Fragment>
        <Typography
          variant="body1"
          color="textSecondary"
          onClick={this.handleOpen}
          tip="Expand scream"
          style={{ marginLeft: '20px' }}
          tipClassName={classes.expandButton} >
          {body}
        </Typography>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <IconButton
            tip="Close"
            onClick={this.handleClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

const mapActionsToProps = {
  getScream,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
