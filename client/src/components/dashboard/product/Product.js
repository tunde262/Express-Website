import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteProduct } from '../../../actions/companyActions';

import classes from './Product.module.css';

class Product extends Component {
    onDeleteClick(id) {
        this.props.deleteProduct(id);
    }

  render() {
    const product = this.props.product.map(prod => (
        <tr key={prod._id}>
            <td>{prod.name}</td>
            <td>{prod.qty}</td>
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
                    <th>Product Name</th>
                    <th colspan="2">Qty</th>
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
