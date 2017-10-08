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
            if (!payload.post.deleted) {
                return state;
            }
            return Object.keys(state)
                .filter(pId => pId !== payload.post.id)
                .reduce((obj, pId) => {
                    const newObj = obj;
                    newObj[pId] = state[pId];
                    return newObj;
                }, {});
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
            if (!payload.comment.deleted) {
                return state;
            }
            return Object.keys(state)
                .filter(cId => cId !== payload.comment.id)
                .reduce((obj, cId) => {
                    const newObj = obj;
                    newObj[cId] = state[cId];
                    return newObj;
                }, {});
        case DELETE_POST:
            if (!payload.post.deleted) {
                return state;
            }
            return Object.keys(state)
                .filter(cId => state[cId].parentId !== payload.post.id)
                .reduce((obj, cId) => {
                    const newObj = obj;
                    newObj[cId] = state[cId];
                    return newObj;
                }, {});
        default:
            return state;
    }
}

export default combineReducers({
    post,
    comment
});
