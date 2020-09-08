import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';



const styles = (theme) => ({

});



class _User extends Component {
    render() {
        const { user } = this.props;
        // const time = dayjs(user.createAt).fromNow();

        return (<Grid container direction='column'>
            <Grid item>
                <Typography
                    component={Link}
                    style={{ color: 'black' }}
                    variant="body1"
                    to={`/users/${user.userId}`}
                >
                    <strong> {user.sender}</strong>
                    {user.handle}
                </Typography>
            </Grid>
            <Grid item>

                <Typography
                    style={{ color: 'black' }}
                    variant='caption'>
                    {/* {typeof (user.createAt) == 'string' && dayjs(user.createAt).fromNow()} */}
                </Typography>
            </Grid>
        </Grid>)
    }
}


_User.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapActiontoProps = {

}

const mapStateToProps = (state) => ({
    UI: state.UI,
    searching: state.data.searching,
    search_res: state.data.search_res,
    data: state.date
});


const User = connect(mapStateToProps, mapActiontoProps)(withStyles(styles)(_User))

export {
    User
};