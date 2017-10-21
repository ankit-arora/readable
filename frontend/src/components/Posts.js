import React, { Component } from 'react';
import sortBy from 'sort-by';
import Post from './Post';

class Posts extends Component {
    state = {
      sortKey: '-voteScore'
    };

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
            <div className='col-md-10'>
                <div className='row'>
                    <div
                        style={{
                            textAlign: 'right',
                            verticalAlign: 'middle',
                            paddingTop: '10px',
                            paddingRight: '6px',
                            fontSize: '1.1em'
                        }}
                        className='titleText col-md-4'
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
                    className='row' style={{
                    marginTop: '20px'
                }}
                >
                    {posts.map((p, i) =>
                        <Post key={i} post={p} />)}
                </div>
            </div>
        );
    }
}

export default Posts;
