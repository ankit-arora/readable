import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import uuid from 'uuid';
import sortBy from 'sort-by';
import {
    getPosts,
    deletePost,
    getCommentsForPost,
    changePostVote,
    addPostNoServerUpdate,
    addComment,
    deleteComment
} from '../actions';
import Comment from './Comment';
import { MONTHS } from '../utils/constants';

class PostDetail extends Component {
    state = {
        showPostDeleteAlert: false,
        showCommentDeleteAlert: false,
        commentIdToDelete: '',
        newCommentBody: '',
        newCommentUser: '',
        newCommentError: false
    };

    componentDidMount() {
        const { postId } = this.props.match.params;
        if (Object.keys(this.props.posts).length === 0) {
            this.props.getPosts();
        }
        if (this.props.comments.filter(c => postId === c.parentId).length === 0) {
            this.props.getCommentsForPost(postId);
        }
    }

    handleNewCommentSubmit(event) {
        event.preventDefault();
        const { newCommentBody, newCommentUser } = this.state;
        if (newCommentBody.trim() === '' || newCommentUser.trim() === '') {
            this.setState({
                newCommentError: true
            });
        } else {
            const { postId } = this.props.match.params;
            this.props.addComment({
                id: uuid().replace(/-/gi, ''),
                body: newCommentBody,
                author: newCommentUser,
                timestamp: (new Date()).getTime(),
                parentId: postId
            });
            this.setState({
                newCommentBody: '',
                newCommentUser: '',
                newCommentError: false
            });
        }
    }

    deleteComment(commentId) {
        this.setState({
            commentIdToDelete: commentId,
            showCommentDeleteAlert: true
        });
    }

    render() {
        const { postId } = this.props.match.params;
        const { posts, comments } = this.props;
        const { newCommentBody, newCommentUser, newCommentError } = this.state;

        if (Object.keys(posts).length === 0) {
            return (
                <div>
                    Loading
                </div>
            );
        }

        const post = posts[postId];
        const { timestamp } = post;
        const d = new Date(timestamp);
        const mmm = MONTHS[d.getMonth()];
        const yyyy = d.getFullYear();
        const date = d.getDate();
        const editPath = `/post/edit/${postId}`;
        const commentsForPost = comments.filter(c =>
            postId === c.parentId).sort(sortBy('-voteScore'));
        let commentsLine = 'comments';
        if (commentsForPost.length === 1) {
            commentsLine = 'comment';
        }
        const newCommentErrorClassDisplay = newCommentError ? 'block' : 'none';
        return (
            <div>
                <SweetAlert
                    show={this.state.showPostDeleteAlert}
                    title="Delete Post?"
                    text="Do you want to delete this post?"
                    showCancelButton
                    onConfirm={() => {
                        this.props.deletePost(post);
                        const { history } = this.props;
                        history.push('/');
                    }}
                    onCancel={() => {
                        console.log('cancel');
                        this.setState({ showPostDeleteAlert: false });
                    }}
                />
                <SweetAlert
                    show={this.state.showCommentDeleteAlert}
                    title="Delete Comment?"
                    text="Do you want to delete this comment?"
                    showCancelButton
                    onConfirm={() => {
                        this.props.deleteComment(this.state.commentIdToDelete);
                        this.setState({
                            commentIdToDelete: '',
                            showCommentDeleteAlert: false
                        });
                    }}
                    onCancel={() => {
                        console.log('cancel');
                        this.setState({
                            commentIdToDelete: '',
                            showCommentDeleteAlert: false
                        });
                    }}
                />
                <div className='row'>
                    <div className='col-md-10'>
                        <h2>{post.title}</h2>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4' style={{ textAlign: 'left' }}>
                        <h4>
                            <p style={{ fontSize: '0.88em', color: 'gray' }}>
                                -by {post.author} on {mmm} {date}, {yyyy} in {post.category}
                            </p>
                        </h4>
                    </div>
                    <div className='col-md-2'>
                        <h4>
                            <button
                                className='voteButton'
                                onClick={() => {
                                    this.props.changePostVote(post.id, 'upVote');
                                    const newPost = post;
                                    newPost.voteScore += 1;
                                    this.props.addPostNoServerUpdate(newPost);
                                }}
                            >
                                <i className="fa fa-thumbs-up" aria-hidden="true" />
                            </button>
                            <button
                                className='voteButton'
                                onClick={() => {
                                    this.props.changePostVote(post.id, 'downVote');
                                    const newPost = post;
                                    newPost.voteScore -= 1;
                                    this.props.addPostNoServerUpdate(newPost);
                                }}
                            >
                                <i className="fa fa-thumbs-down" aria-hidden="true" />
                            </button>
                            <span style={{ marginLeft: '5px' }}>{post.voteScore}</span>
                            <Link to={editPath} style={{ marginLeft: '15px' }}>
                                <i className="fa fa-pencil-square-o" aria-hidden="true" />
                            </Link>
                            <button
                                className='deletePostButton'
                                style={{ marginLeft: '10px' }}
                                onClick={() => {
                                    // this.deletePost(post);
                                    this.setState({
                                        showPostDeleteAlert: true
                                    });
                                }}
                            >
                                <i className="fa fa-trash-o" aria-hidden="true" />
                            </button>
                        </h4>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-10'>
                        <h4>{posts[postId].body}</h4>
                    </div>
                </div>

                <div className='row' style={{ marginTop: '5px' }}>
                    <div
                        className='col-md-2'
                        style={{ fontSize: '1.0em', color: 'gray' }}
                    >
                        {commentsForPost.length} {commentsLine}
                    </div>
                </div>

                <hr style={{ marginTop: '0px' }} />

                {commentsForPost.map(comment => (
                    <Comment
                        key={comment.id} comment={comment}
                        deleteComment={commentId => this.deleteComment(commentId)}
                    />
                ))}

                <form onSubmit={event => this.handleNewCommentSubmit(event)}>
                    <div className='row' style={{ marginTop: '5px' }}>
                        <div className='col-md-12'>
                            <textarea
                                onChange={event => this.setState({
                                    newCommentBody: event.target.value
                                })}
                                placeholder='comment body' className='form-control'
                                value={newCommentBody}
                            />
                        </div>
                    </div>

                    <div className='row' style={{ marginTop: '5px' }}>
                        <div className='col-md-12'>
                            <input
                                onChange={event => this.setState({
                                    newCommentUser: event.target.value
                                })}
                                placeholder='your name'
                                type='text'
                                style={{ float: 'right', width: '30%' }}
                                className='form-control'
                                value={newCommentUser}
                            />
                        </div>
                    </div>

                    <div
                        className='row'
                        style={{ marginTop: '5px', display: newCommentErrorClassDisplay }}
                    >
                        <div className='col-md-12'>
                            <div style={{ color: 'red', float: 'right', width: '28%' }}>
                                Invalid or missing comment body or username.
                            </div>
                        </div>
                    </div>

                    <div className='row' style={{ marginTop: '15px' }}>
                        <div className='col-md-12'>
                            <input
                                type='submit'
                                value='Add New Comment'
                                className='btn'
                                style={{ float: 'right', outline: 'none' }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ posts, comments }) {
    const commentsArr = Object.keys(comments).reduce((arr, cId) => {
        const newArr = arr;
        newArr.push(comments[cId]);
        return newArr;
    }, []);

    return {
        posts,
        comments: commentsArr
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCommentsForPost: postId => dispatch(getCommentsForPost(postId)),
        getPosts: () => dispatch(getPosts()),
        deletePost: post => dispatch(deletePost(post)),
        changePostVote: (postId, voteDirection) => dispatch(changePostVote(postId, voteDirection)),
        addPostNoServerUpdate: post => dispatch(addPostNoServerUpdate(post)),
        addComment: comment => dispatch(addComment(comment)),
        deleteComment: commentId => dispatch(deleteComment(commentId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
