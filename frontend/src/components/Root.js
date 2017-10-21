import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getPosts } from '../actions';
import CategoriesLeftNav from './CategoriesLeftNav';
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
        const { categories } = this.props;
        let { posts } = this.props;
        const { categoryPath } = this.props.match.params;
        if (posts.length === 0 || categories.length === 0) {
            return (
                <div>
                    Loading
                </div>
            );
        }
        if (typeof categoryPath !== 'undefined') {
            const selectedCategory = categories.filter(c => c.path === categoryPath)[0].name;
            posts = posts.filter(p => p.category === selectedCategory);
        }
        return (
            <div className='row page'>
                <CategoriesLeftNav categories={categories} selectedCategory={categoryPath} />
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
    return {
        posts: postsArray,
        categories
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);
