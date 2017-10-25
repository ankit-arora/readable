import React, { Component } from 'react';
import { connect } from 'react-redux';
import sortBy from 'sort-by';
import SweetAlert from 'sweetalert2-react';
import Post from './Post';
import {
    deletePost
} from '../actions';

class Posts extends Component {
    state = {
        sortKey: '-voteScore',
        showPostDeleteAlert: false,
        deletePostId: ''
    };

    handleDeletePost(postId) {
        this.setState({
            showPostDeleteAlert: true,
            deletePostId: postId
        });
    }

    handleSort(sortKey) {
        this.setState({
            sortKey
        });
    }

    render() {
        let { posts } = this.props;
        const { sortKey } = this.state;
        posts = posts.sort(sortBy(sortKey));

        return (
            <div>
                <SweetAlert
                    show={this.state.showPostDeleteAlert}
                    title="Delete Post?"
                    text="Do you want to delete this post?"
                    showCancelButton
                    onConfirm={() => {
                        const { deletePostId } = this.state;
                        this.props.deletePost({
                            id: deletePostId
                        });
                        this.setState({
                            showPostDeleteAlert: false,
                            deletePostId: ''
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            showPostDeleteAlert: false,
                            deletePostId: ''
                        });
                    }}
                />
                <div className='col-md-10'>
                    <div className='row'>
                        <div
                            className='sortText col-md-4'
                        >
                            Sort posts by
                        </div>
                        <select
                            value={sortKey}
                            onChange={event => this.handleSort(event.target.value)}
                            className="my-form-control col-md-3"
                        >
                            <option value='-voteScore'>Maximum to Minimum Votes</option>
                            <option value='voteScore'>Minimum to Maximum Votes</option>
                            <option value='-timestamp'>Newest to Oldest</option>
                            <option value='timestamp'>Oldest to Newest</option>
                        </select>
                    </div>
                    <div
                        className='row MT-20'
                    >
                        {posts.map((p, i) =>
                            (<Post
                                key={i}
                                post={p}
                                handleDeletePost={(postId) => this.handleDeletePost(postId)}
                            />)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deletePost: (post) => dispatch(deletePost(post))
    };
}

export default connect(null, mapDispatchToProps)(Posts);
