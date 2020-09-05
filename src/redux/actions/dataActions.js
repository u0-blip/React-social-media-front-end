import axios from 'axios';
import { LOADING_DATA, SET_SCREAMS, LOADING_UI, SET_ERRORS, CLEAR_ERRORS, UNSET_SCREAM } from '../types'

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