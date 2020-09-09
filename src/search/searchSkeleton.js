import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const styles = (theme) => ({

});
export class SearchSkeleton extends Component {
    render() {

        return (
            <div>
                I am a scary skeleton
            </div>
        )
    }
}

SearchSkeleton.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapActiontoProps = {
}
const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user,
    searching: state.data.searching,
    search_res: state.data.search_res,
    data: state.date
});



export default connect(mapStateToProps, mapActiontoProps)(withStyles(styles)(SearchSkeleton));