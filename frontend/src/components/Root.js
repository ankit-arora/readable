import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getPosts } from '../actions';
import Categories from './Categories';
import Posts from './Posts';

class Root extends Component {
    componentDidMount() {
        if (this.props.categories.length === 0) {
            this.props.getCategories();
        }

        if (this.props.posts.length === 0) {
            this.props.getPosts();
        }
    }

    render() {
        const { posts, categories } = this.props;
        if (posts.length === 0 || categories.length === 0) {
            return (
                <div>
                    Loading
                </div>
            );
        }
        return (
            <div className='row page'>
                <Categories categories={categories} />
                <Posts posts={posts} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPosts: () => dispatch(getPosts()),
        getCategories: () => dispatch(getCategories())
    };
}

function mapStateToProps({ posts, categories }) {
    const postsArray = Object.keys(posts).reduce((arr, p) => {
        arr.push(posts[p]);
        return arr;
    }, []);
    // const categoriesFromPostsObj = postsArray.reduce((obj, p) => {
    //     const newObj = obj;
    //     newObj[p.category] = true;
    //     return newObj;
    // }, {});
    // const categories = Object.keys(categoriesFromPostsObj);
    // const filteredPostsByCategory = categories.reduce((obj, c) => {
    //     const newObj = obj;
    //     newObj[c] = postsArray.filter(p => p.category === c);
    //     return newObj;
    // }, {});
    return {
        posts: postsArray,
        categories
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);
