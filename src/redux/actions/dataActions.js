import axios from 'axios';
import { LOADING_DATA, SET_SCREAMS, LOADING_UI, SET_ERRORS, CLEAR_ERRORS, UNSET_SCREAM, TGGL_LIKE_SCREAM, SET_SCREAM, SUBMIT_COMMENT } from '../types'

export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/screams')
        .then((res) => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            });
        });
};

export const getScream = (screamId) => (dispatch) => {
    axios
        .get(`/scream/${screamId}`)
        .then((res) => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_SCREAM,
                payload: []
            });
        });
};

export const postScream = (post) => (dispatch) => {
    if (post.body.trim().length === 0) {
        dispatch({
            type: SET_ERRORS,
            payload: { post: 'Cannot make blank post.' }
        });
        return
    }
    dispatch({ type: LOADING_UI });
    axios
        .post('/scream', post)
        .then(() => {
            dispatch({ type: CLEAR_ERRORS });
            dispatch(getScreams())
        })
        .catch((err) => {
            console.log(err);
        })

}

export const deleteScream = (postId) => (dispatch) => {
    axios
        .delete(`/scream/${postId}`)
        .then(() => {
            dispatch({
                type: UNSET_SCREAM,
                payload: postId
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

export const handleLike = (liked, screamId, handle) => (dispatch) => {
    let action;
    if (!liked) {
        action = 'like';
    } else {
        action = 'unlike';
    }
    axios
        .get(`/scream/${screamId}/${action}`)
        .then(() => {
            dispatch({
                type: TGGL_LIKE_SCREAM,
                payload: {
                    liked, screamId, handle
                }
            });
        })
        .catch((err) => {
            console.log(err)
        })
}

export const postComment = (comment, screamId, credentials) => (dispatch) => {
    const handle = credentials.handle;
    const imageUrl = credentials.imageUrl;

    if (comment.comment.trim().length === 0) {
        dispatch({
            type: SET_ERRORS,
            payload: { post: 'Cannot make blank post.' }
        });
        return
    }

    axios
        .post(`/scream/${screamId}/comment`, comment)
        .then(() => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: {
                    body: comment.comment,
                    screamId,
                    handle,
                    imageUrl
                }
            });
        })
        .catch((err) => {
            console.log(err)
        })
}


export const handleShare = () => (dispatch) => {

}