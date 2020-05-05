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
            file: '',
            name: '',
            description: '',
            price: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fileChanged = this.fileChanged.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        let data = new FormData();
        data.append('file', this.state.file);
        data.append('name', this.state.name);
        data.append('description', this.state.description);
        data.append('price', this.state.price);

        // const prodData = {
        //     file: this.state.file,
        //     name: this.state.name,
        //     description: this.state.description,
        //     price: this.state.price
        // };

        this.props.addProduct(data, this.props.history);
    }

    fileChanged(e) {
        const f = e.target.files[0];
        this.setState({
            file: f
        });
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
                    <input 
                        type="file" 
                        name="file" 
                        id="file" 
                        onChange={this.fileChanged}
                    />
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
                    <label>Description
                        <input 
                            type="text"
                            name="description" 
                            className={classes.input_line}
                            value={this.state.description}
                            onChange={this.onChange}
                        />
                    </label>
                    <label>Price
                        <input 
                            type="text" 
                            name="price"
                            className={classnames(`${classes.input_line}`, {
                                [classes.is_invalid]: errors.price
                            })}
                            value={this.state.price}
                            onChange={this.onChange}
                        />
                        {errors.price && (<small className={classes.invalid_feedback}>{errors.price}</small>)}
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
