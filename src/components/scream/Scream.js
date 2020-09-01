import React, { Component, Fragment } from 'react'

export class ScreamSkeleton extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export class Scream extends Component {
    render() {
        const {
            classes,
            scream:{
                body, createAt, userImage, handle, screamId, likeCount, commentCount
            }, 
            // user:{
            //     authenticated,
            //     credentials: {handle}
            // }
        } = this.props;

        return (
            <Fragment>
            {/* <div> {handle}  </div> */}
            <div> {screamId}</div>
            {/* <div> {createAt} </div> */}

            </Fragment>
        )
    }
}


export default {Scream, ScreamSkeleton}
