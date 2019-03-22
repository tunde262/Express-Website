import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { addProduct } from '../../actions/companyActions';

import classes from '../create-company/CreateCompany.module.css';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            qty: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const prodData = {
            name: this.state.name,
            qty: this.state.qty
        };

        this.props.addProduct(prodData, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

  render() {
    const { errors } = this.state;

    return (
        <div style={{ textAlign: 'center' }}>
            <div className={classes.goBack}><Link to="/dashboard">Go Back</Link></div>
            <h1>Add Product</h1>
            <div className={classes.container}>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <label>Name
                        <input 
                            type="text"
                            name="name" 
                            className={classnames(`${classes.input_line}`, {
                                [classes.is_invalid]: errors.name
                            })}
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                        {errors.name && (<small className={classes.invalid_feedback}>{errors.name}</small>)}
                    </label>
                    <label>Qty
                        <input 
                            type="text" 
                            name="qty"
                            className={classnames(`${classes.input_line}`, {
                                [classes.is_invalid]: errors.qty
                            })}
                            value={this.state.qty}
                            onChange={this.onChange}
                        />
                        {errors.qty && (<small className={classes.invalid_feedback}>{errors.qty}</small>)}
                    </label>
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
        </div>
    )
  }
}

AddProduct.propTypes = {
    addProduct: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    company: state.company,
    errors: state.errors
});

export default connect(mapStateToProps, { addProduct })(withRouter(AddProduct));
