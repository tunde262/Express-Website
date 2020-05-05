import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteProduct } from '../../../actions/companyActions';

import classes from './Product.module.css';

class Product extends Component {
    onDeleteClick(prod_id) {
        this.props.deleteProduct(prod_id);
    }

  render() {
    const product = this.props.product.map(prod => (
        <tr key={prod._id}>
            <td><img style={{width: '50px'}} src={`http://localhost:5000/api/company/image/${prod.image_name}`} alt="img" /></td>
            <td><Link to={`/` + prod._id}>{prod.name}</Link></td>
            <td>{prod.price}</td>
            <td><span className={classes.trash}><i className="fas fa-trash" onClick={this.onDeleteClick.bind(this, prod._id)}></i></span></td>
        </tr>
    ))
    return (
        <table>
            <thead>
                <tr>
                    <th colspan="3">
                        <Link className={classes.thText} to="/add-product">
                            Add Product
                        </Link>
                    </th>
                </tr>
                <tr>
                    <th>img</th>
                    <th>Product Name</th>
                    <th colspan="2">Price</th>
                </tr>
            </thead>
            <tbody>
                {product}
            </tbody>
        </table>
    )
  }
}

Product.propTypes = {
    deleteProduct: PropTypes.func.isRequired
}

export default connect(null, { deleteProduct })(Product);
