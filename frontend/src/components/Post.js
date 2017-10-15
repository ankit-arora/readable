import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCommentsForPost, changePostVote } from '../actions';

class Post extends Component {
    state = {
        voteScore: 0
    };

    componentDidMount() {
        if (this.props.comments.filter(c => this.props.post.id === c.parentId).length === 0) {
            this.props.getCommentsForPost(this.props.post.id);
        }
        this.setState({
           voteScore: this.props.post.voteScore
        });
    }

    render() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const { post, comments } = this.props;
        const commentsForPost = comments.filter(c => this.props.post.id === c.parentId);
        const { timestamp } = post;
        const d = new Date(timestamp);
        const mmm = months[d.getMonth()];
        const yyyy = d.getFullYear();
        const day = d.getDay();
        const { voteScore } = this.state;
        let commentsLine = 'comments';
        if (commentsForPost.length === 1) {
            commentsLine = 'comment';
        }
        return (
            <div className="col-xs-2 col-md-3">
                <div className="thumbnail">
                    <div className="caption">
                        <h4 style={{ marginBottom: '1px' }}>{post.title}</h4>
                        <p style={{ fontSize: '0.88em', color: 'gray' }}>
                            -by {post.author} on {mmm} {day}, {yyyy} in {post.category}
                        </p>
                        <p>{post.body}</p>
                    </div>
                    <div className='row'>
                        <div className='col-md-8'>
                            <p style={{ fontSize: '0.88em', color: 'gray', marginLeft: '9px' }}>
                                {commentsForPost.length} {commentsLine}
                            </p>
                        </div>
                        <div className='col-md-4'>
                            <button
                                className='voteButton'
                                onClick={() => {
                                    this.props.changePostVote(post.id, 'downVote');
                                    this.setState({
                                        voteScore: post.voteScore - 1
                                    });
                                }}
                            >
                                <i className="fa fa-chevron-down" aria-hidden="true" />
                            </button>
                            <button
                                className='voteButton'
                                onClick={() => {
                                    this.props.changePostVote(post.id, 'upVote');
                                    this.setState({
                                        voteScore: post.voteScore + 1
                                    });
                                }}
                            >
                                <i className="fa fa-chevron-up" aria-hidden="true" />
                            </button>
                            <span style={{ marginLeft: '5px' }}>{voteScore}</span>
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
        changePostVote: (postId, voteDirection) => dispatch(changePostVote(postId, voteDirection))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
