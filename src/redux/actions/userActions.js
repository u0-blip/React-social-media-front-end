import axios from 'axios';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER, LOADING_USER, MARK_NOTIFICATIONS_READ, SET_ERRORS, LOADING_UI, CLEAR_ERRORS } from '../types'



export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/user/signup', newUserData)
        .then((res) => {
            setAuthenticatedUser(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/user/login', userData)
        .then((res) => {
            setAuthenticatedUser(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};


export const setAuthenticatedUser = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToekn', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .get('/user')
        .then((res) => {
            dispatch(setUser(res.data))
        })
        .catch((err) => {
            const FBIdToken = localStorage.getItem("FBIdToekn");
            if (FBIdToken && err.response.data.code == 'auth/id-token-expired') {
                alert('Your login token has expired, please login again!');
            } else {
                console.log(err);
            }
        });
}

const setUser = (data) => (dispatch) => {
    dispatch({
        type: SET_USER,
        payload: data
    });
}

export const uploadImage = (imageForm) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .post(imageForm, { headers: imageForm.getHeaders() })
}