import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import '../App.css';
import { addPost, editPost, deletePost, addComment } from '../actions';
import Root from './Root';

class App extends Component {
    // componentDidMount() {
    //     this.props.addPost({
    //         id: '6c84fb9012c411e1840d7b25c5ee775b',
    //         timestamp: 1506952539954,
    //         title: 'title',
    //         body: 'body',
    //         author: 'author',
    //         category: 'redux'
    //     });
    // }
    // render() {
    //     return (
    //         <div className="App">
    //             <div className="App-header">
    //                 <img src={logo} className="App-logo" alt="logo" />
    //                 <h2>Welcome to React</h2>
    //             </div>
    //             <p className="App-intro">
    //                 <button
    //                     onClick={() => this.props.editPost({
    //                         id: '6c84fb9012c411e1840d7b25c5ee775b',
    //                         title: 'new title',
    //                         body: 'body'
    //                     })}
    //                 >
    //                     Edit Post
    //                 </button>
    //                 <button
    //                     onClick={() => this.props.deletePost({
    //                         id: '6c84fb9012c411e1840d7b25c5ee775b'
    //                     })}
    //                 >
    //                     Delete Post
    //                 </button>
    //                 <button
    //                     onClick={() => this.props.addComment({
    //                         id: '6c84fb9012c411e1840d7b25c5ee777c',
    //                         timestamp: 1506952539958,
    //                         body: 'comment body',
    //                         author: 'comment author',
    //                         parentId: '6c84fb9012c411e1840d7b25c5ee775b'
    //                     })}
    //                 >
    //                     Add Comment
    //                 </button>
    //             </p>
    //         </div>
    //     );
    // }

    render() {
        return (
            <div className="app">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">
                                React Readable
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <Route exact path='/' component={Root} />
                </div>
            </div>
        );
    }
}

// id: Any unique ID. As with posts, UUID is probably the best here.
//     timestamp: timestamp. Get this however you want.
//     body: String
// author: String
// parentId: Should match a post id in the database.

function mapDispatchToProps(dispatch) {
    return {
        addPost: (post) => dispatch(addPost(post)),
        editPost: (newPost) => dispatch(editPost(newPost)),
        deletePost: (post) => dispatch(deletePost(post)),
        addComment: (comment) => dispatch(addComment(comment))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(App);
