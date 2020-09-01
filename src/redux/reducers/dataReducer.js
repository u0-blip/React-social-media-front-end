import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_SCREAM,
    SUBMIT_COMMENT
  } from '../types';

const initialState = {
    screams: [],
    scream: [],
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_SCREAMS:
            return{
                ...state,
                screams: action.payload,
                loading:false
            };
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            };
        default:
            return state
    }
}