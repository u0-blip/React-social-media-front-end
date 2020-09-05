import {
    SET_SCREAMS,
    TGGL_LIKE_SCREAM_data,
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

function find(screamId, screams) {
    for (var s in screams) {
        if (screamId == screams[s].screamId) {
            return s;
        }
    }
    return -1;
}

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
        case TGGL_LIKE_SCREAM_data:
            console.log('jackpot1')
            const index = find(action.payload.screamId, state.screams);
            if (index != -1) {
                if (action.payload.liked) {
                    state.screams[index].likeCount -= 1;
                } else {
                    state.screams[index].likeCount += 1;
                }
            }
            return {
                ...state
            }
        default:
            return state
    }
}