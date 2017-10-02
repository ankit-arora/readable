import { combineReducers } from 'redux';
import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT
} from '../actions/index';

function post(state = {}, action) {
    const { payload } = action;
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                [payload.post.id]: payload.post
            };
        case EDIT_POST:
            return {
                ...state,
                [payload.post.id]: payload.post
            };
        case DELETE_POST:
            return {
                ...state,
                [payload.post.id]: null
            };
        default:
            return state;
    }
}

function comment(state = {}, action) {
    const { payload } = action;
    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                [payload.comment.id]: payload.comment
            };
        case EDIT_COMMENT:
            return {
                ...state,
                [payload.comment.id]: payload.comment
            };
        case DELETE_COMMENT:
            return {
                ...state,
                [payload.comment.id]: null
            };
        default:
            return state;
    }
}

export default combineReducers({
    post,
    comment
});
