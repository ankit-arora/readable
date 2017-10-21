import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoriesLeftNav extends Component {
    render() {
        const { categories, selectedCategory } = this.props;
        return (
            <div className='col-md-2'>
                <div className='titleText'>Categories</div>
                {
                    categories.map((c, i) => {
                        const linkPath = `/category/${c.path}`;
                        if (typeof selectedCategory !== 'undefined' &&
                            selectedCategory === c.path) {
                            return (
                                <Link
                                    key={i} to={linkPath}
                                      className='category label label-primary'
                                >
                                    {c.name}
                                </Link>
                            );
                        }
                        return (
                            <Link key={i} to={linkPath} className='category label label-default'>
                                {c.name}
                            </Link>
                        );
                    })
                }
            </div>
        );
    }
}

export default CategoriesLeftNav;
