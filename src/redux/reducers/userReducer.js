import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    TGGL_LIKE_SCREAM_data,
    MARK_NOTIFICATIONS_READ
} from '../types';


const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_USER:
            return {
                ...state,
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }

        case SET_UNAUTHENTICATED:
            return {
                ...state,
                authenticated: false,
                user: {}
            }
        case TGGL_LIKE_SCREAM_data:
            console.log('jackpot2')
            if (action.payload.liked) {
                for (var i in state.likes) {
                    if (state.likes[i].screamId === action.payload.screamId) {
                        console.log('splice')
                        state.likes.splice(i, 1)
                        break
                    }
                }
            } else {
                console.log('pushed')
                state.likes.push({
                    handle: action.payload.handle,
                    screamId: action.payload.screamId
                })
            }
            return {
                ...state
            }
        default:
            return state;
    }
}