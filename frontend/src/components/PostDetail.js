import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';
import {
    getPosts,
    deletePost,
    getCommentsForPost,
    changePostVote,
    addPostNoServerUpdate
} from '../actions';

class PostDetail extends Component {
    state = {
        showDeleteAlert: false
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

    render() {
        const { postId } = this.props.match.params;
        const { posts, comments } = this.props;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
        const mmm = months[d.getMonth()];
        const yyyy = d.getFullYear();
        const day = d.getDay();
        const editPath = `/post/edit/${postId}`;
        const commentsForPost = comments.filter(c => postId === c.parentId);
        let commentsLine = 'comments';
        if (commentsForPost.length === 1) {
            commentsLine = 'comment';
        }
        return (
            <div>
                <SweetAlert
                    show={this.state.showDeleteAlert}
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
                        this.setState({ showDeleteAlert: false });
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
                                -by {post.author} on {mmm} {day}, {yyyy} in {post.category}
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
                                        showDeleteAlert: true
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

                <div className='row' style={{ marginTop: '5px' }}>
                    <div className='col-md-10'>
                        <textarea className='form-control' />
                    </div>
                </div>

                <div className='row' style={{ marginTop: '15px' }}>
                    <div className='col-md-10'>
                        <button className='btn' style={{ float: 'right' }}>
                            Add Comment
                        </button>
                    </div>
                </div>
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
        getCommentsForPost: (postId) => dispatch(getCommentsForPost(postId)),
        getPosts: () => dispatch(getPosts()),
        deletePost: (post) => dispatch(deletePost(post)),
        changePostVote: (postId, voteDirection) => dispatch(changePostVote(postId, voteDirection)),
        addPostNoServerUpdate: (post) => dispatch(addPostNoServerUpdate(post))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
