import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getCommentsForPost,
    changePostVote,
    addPostNoServerUpdate
} from '../actions';
import { MONTHS } from '../utils/constants';

class Post extends Component {
    componentDidMount() {
        if (this.props.comments.filter(c => this.props.post.id === c.parentId).length === 0) {
            this.props.getCommentsForPost(this.props.post.id);
        }
    }

    render() {
        const { post, comments } = this.props;
        const commentsForPost = comments.filter(c => this.props.post.id === c.parentId);
        const { timestamp } = post;
        const d = new Date(timestamp);
        const mmm = MONTHS[d.getMonth()];
        const yyyy = d.getFullYear();
        const date = d.getDate();
        let commentsLine = 'comments';
        if (commentsForPost.length === 1) {
            commentsLine = 'comment';
        }
        const linkPath = `/post/show/${post.id}`;
        return (
            <div className="col-xs-2 col-md-3">
                <div className="thumbnail">
                    <div className="caption">
                        <h4 style={{ marginBottom: '1px' }}>
                            <Link to={linkPath}>{post.title}</Link>
                        </h4>
                        <p style={{ fontSize: '0.88em', color: 'gray' }}>
                            -by {post.author} on {mmm} {date}, {yyyy} in {post.category}
                        </p>
                        <p>{post.body}</p>
                    </div>
                    <div className='row'>
                        <div className='col-md-8'>
                            <p style={{ fontSize: '0.88em', color: 'gray', marginLeft: '9px' }}>
                                {commentsForPost.length} {commentsLine}
                            </p>
                        </div>
                        <div className='col-md-4' style={{ padding: '0px' }}>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ comments }) {
    const commentsArr = Object.keys(comments).reduce((arr, cId) => {
        const newArr = arr;
        newArr.push(comments[cId]);
        return newArr;
    }, []);

    return {
        comments: commentsArr
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCommentsForPost: (postId) => dispatch(getCommentsForPost(postId)),
        changePostVote: (postId, voteDirection) => dispatch(changePostVote(postId, voteDirection)),
        addPostNoServerUpdate: (post) => dispatch(addPostNoServerUpdate(post))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
