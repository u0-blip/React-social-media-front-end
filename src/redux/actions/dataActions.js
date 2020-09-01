import axios from 'axios';
import {LOADING_DATA, SET_SCREAMS } from '../types'

export const getScreams = () => (dispatch)=>{
    dispatch({type:LOADING_DATA});
    axios
    .get('/screams')
    .then((res)=>{
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        });
    })
    .catch((err)=>{
        dispatch({
            type: SET_SCREAMS,
            payload: []
        });
    });
};
