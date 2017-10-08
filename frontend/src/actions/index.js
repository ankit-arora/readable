import axios from 'axios';

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const SORT_POST = 'SORT_POSTS';
export const SORT_COMMENTS = 'SORT_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

const AUTH_TOKEN = 'testAuthToken';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common.Authorization = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function addPost(post) {
    return dispatch => {
        axios.post('/posts', post)
            .then(resp => {
                console.log(resp);
                dispatch({
                    type: ADD_POST,
                    payload: {
                        post: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function editPost({ id, title, body }) {
    return dispatch => {
        axios.put(`/posts/${id}`, { title, body })
            .then(resp => {
                console.log(resp);
                dispatch({
                    type: EDIT_POST,
                    payload: {
                        post: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function deletePost({ id }) {
    return dispatch => {
        axios.delete(`/posts/${id}`)
            .then(resp => {
                console.log(resp);
                dispatch({
                    type: DELETE_POST,
                    payload: {
                        post: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function addComment(comment) {
    return dispatch => {
        axios.post('/comments', comment)
            .then(resp => {
                console.log(resp);
                dispatch({
                    type: ADD_COMMENT,
                    payload: {
                        comment: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function editComment({ id, timestamp, body }) {
    return dispatch => {
        axios.put(`/comments/${id}`, { timestamp, body })
            .then(resp => {
                console.log(resp);
                dispatch({
                    type: EDIT_COMMENT,
                    payload: {
                        comment: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function deleteComment({ id }) {
    return dispatch => {
        axios.delete(`/comments/${id}`)
            .then(resp => {
                console.log(resp);
                dispatch({
                    type: DELETE_COMMENT,
                    payload: {
                        comment: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}
