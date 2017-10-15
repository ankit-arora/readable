import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
    render() {
        const { posts } = this.props;
        return (
            <div className='col-10'>
                <div className='titleText'>All posts</div>
                <div className='row'>
                    {posts.map((p, i) => <Post key={i} post={p} />)}
                </div>
            </div>
        );
    }
}

export default Posts;
