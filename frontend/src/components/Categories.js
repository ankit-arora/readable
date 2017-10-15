import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Categories extends Component {
    render() {
        const { categories } = this.props;
        return (
            <div className='col-md-2'>
                <div className='titleText'>Categories</div>
                {
                    categories.map((c, i) => {
                        const linkPath = `/${c.path}`;
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

export default Categories;
