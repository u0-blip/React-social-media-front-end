import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_SCREAM,
    SUBMIT_COMMENT,
    UNSET_SCREAM
} from '../types';

const initialState = {
    screams: [],
    scream: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            };
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            };
        case UNSET_SCREAM:
            for (var i in state.screams) {
                if (state.screams[i].screamId == action.payload) {
                    state.screams.splice(i, 1);
                }
            }
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}