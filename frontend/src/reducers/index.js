/* eslint-disable no-case-declarations */
import { combineReducers } from 'redux';
import {
    GET_POSTS,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    GET_COMMENTS_FOR_POST,
    GET_CATEGORIES
} from '../actions/index';

function posts(state = {}, action) {
    const { payload } = action;
    switch (action.type) {
        case GET_POSTS:
            return payload.posts.reduce((obj, p) => {
                const newObj = obj;
                newObj[p.id] = p;
                return newObj;
            }, {});
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

function comments(state = {}, action) {
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
        case GET_COMMENTS_FOR_POST:
            const newComments = payload.comments.reduce((obj, c) => {
                const newObj = obj;
                newObj[c.id] = c;
                return newObj;
            }, {});
            return {
                ...state,
                ...newComments
            };
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

function categories(state = [], action) {
    const { payload } = action;
    switch (action.type) {
        case GET_CATEGORIES:
            return payload.categories;
        default:
            return state;
    }
}

export default combineReducers({
    posts,
    comments,
    categories
});
