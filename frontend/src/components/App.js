import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.css';
import '../App.css';
// import { addPost, editPost, deletePost, addComment } from '../actions';
import Root from './Root';
import PostDetail from './PostDetail';
import PostEditCreate from './PostEditCreate';

class App extends Component {
    render() {
        return (
            <div className="app">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">
                                Readable
                            </Link>
                        </div>
                        <nav className='collapse navbar-collapse' >
                            <ul className='nav navbar-nav navbar-right'>
                                <li>
                                    <Link to="/post/create">
                                        CREATE POST
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </nav>
                <div className="container">
                    <Route exact path='/' component={Root} />
                    <Route exact path='/category/:categoryPath' component={Root} />
                    <Route exact path='/post/show/:postId' component={PostDetail} />
                    <Route exact path='/post/edit/:postId' component={PostEditCreate} />
                    <Route exact path='/post/create' component={PostEditCreate} />
                </div>
            </div>
        );
    }
}

export default App;
