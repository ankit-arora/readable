import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import
{
    addPost,
    editPost,
    getPosts,
    getCategories
} from '../actions';

class PostEditCreate extends Component {
    state = {
        postError: false,
        postTitle: '',
        postBody: '',
        postUser: '',
        postCategory: ''
    };

    componentDidMount() {
        const { postId } = this.props.match.params;
        if (typeof postId !== 'undefined') {
            let fetchPosts = true;
            if (this.props.posts.length > 0) {
                const post = this.props.posts[postId];
                if (typeof post !== 'undefined') {
                    fetchPosts = false;
                }
            }
            if (fetchPosts) {
                this.props.getPosts();
            }
        } else {
            this.props.getCategories();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { posts } = nextProps;
        const { postId } = this.props.match.params;
        if (Object.keys(posts).length > 0 && typeof postId !== 'undefined') {
            const post = posts[postId];
            if (typeof post !== 'undefined') {
                this.setState({
                    postTitle: post.title,
                    postBody: post.body
                });
            } else {
                const { history } = this.props;
                history.push('/');
            }
        }
    }

    handlePostSubmit(event) {
        event.preventDefault();
        const { postId } = this.props.match.params;
        if (typeof postId !== 'undefined') {
            this.handleEditPostSubmit();
        } else {
            this.handleNewPostSubmit();
        }
    }

    handleNewPostSubmit() {
        const { postTitle, postBody, postUser, postCategory } = this.state;
        if (postTitle.trim() === '' || postBody.trim() === '' ||
            postUser.trim() === '' || postCategory.trim() === '') {
            this.setState({
                postError: true
            });
        } else {
            const timestamp = (new Date()).getTime();
            const id = uuid().replace(/-/gi, '');
            this.props.addPost({
                id,
                title: postTitle,
                body: postBody,
                timestamp,
                category: postCategory,
                author: postUser
            });
            const { history } = this.props;
            history.push('/');
        }
    }

    handleEditPostSubmit() {
        const { postTitle, postBody } = this.state;
        if (postTitle.trim() === '' || postBody.trim() === '') {
            this.setState({
                postError: true
            });
        } else {
            const { postId } = this.props.match.params;
            this.props.editPost({
                id: postId,
                title: postTitle,
                body: postBody
            });
            const { history } = this.props;
            history.push('/');
        }
    }

    render() {
        const { postId } = this.props.match.params;
        const { postError } = this.state;
        const newPostErrorClassDisplay = postError ? 'block' : 'none';
        const isCreate = typeof postId === 'undefined';
        const { categories } = this.props;
        return (
            <div>
                <div className='row'>
                    <div className='col-md-12'>
                        {isCreate ? 'Create Post' : 'Edit Post' }
                    </div>
                </div>
                <form onSubmit={event => this.handlePostSubmit(event)}>
                    <div className='row' style={{ marginTop: '15px' }}>
                        <div className='col-md-12'>
                            <input
                                placeholder='post title'
                                className='form-control'
                                value={this.state.postTitle}
                                onChange={event => this.setState({ postTitle: event.target.value })}
                            />
                        </div>
                    </div>
                    <div className='row' style={{ marginTop: '15px' }}>
                        <div className='col-md-12'>
                            <textarea
                                placeholder='post body'
                                className='form-control'
                                value={this.state.postBody}
                                onChange={event => this.setState({ postBody: event.target.value })}
                            />
                        </div>
                    </div>

                    {isCreate ?
                        <div className='row' style={{ marginTop: '15px' }}>
                            <div className='col-md-12'>
                                <select
                                    value={this.state.postCategory}
                                    onChange={event => this.setState({
                                        postCategory: event.target.value
                                    })}
                                    className="form-control"
                                >
                                    <option value=''>Select Category</option>
                                    {categories.map((c, i) =>
                                        <option key={i} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                        </div> : ''
                    }

                    {isCreate ?
                        <div className='row' style={{ marginTop: '15px' }}>
                            <div className='col-md-12'>
                                <input
                                    className='form-control'
                                    placeholder='your name'
                                    type='text'
                                    value={this.state.postUser}
                                    onChange={event =>
                                        this.setState({ postUser: event.target.value })}
                                />
                            </div>
                        </div> : ''
                    }

                    <div
                        className='row'
                        style={{ marginTop: '5px', display: newPostErrorClassDisplay }}
                    >
                        <div className='col-md-12'>
                            <div style={{ color: 'red', float: 'right', width: '28%' }}>
                                Invalid or missing post info.
                            </div>
                        </div>
                    </div>

                    <div className='row' style={{ marginTop: '15px', float: 'right' }}>
                        <div className='col-md-12'>
                            <input className='btn' type='submit' value='Save Post' />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ posts, categories }) {
    return {
        posts,
        categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: newPost => dispatch(addPost(newPost)),
        editPost: post => dispatch(editPost(post)),
        getPosts: () => dispatch(getPosts()),
        getCategories: () => dispatch(getCategories())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditCreate);
