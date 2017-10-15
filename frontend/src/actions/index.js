import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const SORT_POST = 'SORT_POSTS';
export const SORT_COMMENTS = 'SORT_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_COMMENTS_FOR_POST = 'GET_COMMENTS_FOR_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const GET_CATEGORIES = 'GET_CATEGORIES';

const AUTH_TOKEN = 'testAuthToken';
const API_URL = 'http://localhost:3001';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Authorization = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function getCategories() {
    return dispatch => {
        axios.get('/categories')
            .then(resp => {
                dispatch({
                    type: GET_CATEGORIES,
                    payload: {
                        categories: resp.data.categories
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function getPosts() {
    return dispatch => {
        axios.get('/posts')
            .then(resp => {
                dispatch({
                    type: GET_POSTS,
                    payload: {
                        posts: resp.data
                    }
                });
            })
            .catch(error => console.log(error));
    };
}

export function changePostVote(postId, voteDirection) {
    return dispatch => {
        axios.post(`/posts/${postId}`, { option: voteDirection })
            .then(resp => {
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

export function addPost(post) {
    return dispatch => {
        axios.post('/posts', post)
            .then(resp => {
                // console.log(resp);
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
                // console.log(resp);
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
                // console.log(resp);
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

export function getCommentsForPost(postId) {
    return dispatch => {
        axios.get(`/posts/${postId}/comments`)
            .then(resp => {
                // console.log(resp);
                dispatch({
                    type: GET_COMMENTS_FOR_POST,
                    payload: {
                        comments: resp.data
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
                // console.log(resp);
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
                // console.log(resp);
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
                // console.log(resp);
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
