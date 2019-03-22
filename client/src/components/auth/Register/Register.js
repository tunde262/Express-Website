import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';

import classes from './Register.module.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    }

  render() {
    const { errors } = this.state;

    return (
        <div className={classes.container}>
            <h1>Sign Up</h1>
            <h2>Get started by creating an account!</h2>
            <form onSubmit={this.onSubmit}>
                <label 
                    className={classnames(null, {
                        [classes.is_invalid]: errors.name
                    })}>Name
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
                <label
                    className={classnames(null, {
                        [classes.is_invalid]: errors.email
                    })}>Email
                    <input 
                        type="text"
                        name="email" 
                        className={classnames(`${classes.input_line}`, {
                            [classes.is_invalid]: errors.email
                        })}
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    {errors.email && (<small className={classes.invalid_feedback}>{errors.email}</small>)}
                </label>
                <label
                    className={classnames(null, {
                        [classes.is_invalid]: errors.password
                    })}>Password
                    <input 
                        type="password" 
                        name="password"
                        className={classnames(`${classes.input_line}`, {
                            [classes.is_invalid]: errors.password
                        })}
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    {errors.password && (<small className={classes.invalid_feedback}>{errors.password}</small>)}
                </label>
                <label
                    className={classnames(null, {
                        [classes.is_invalid]: errors.password2
                    })}>Confirm Password
                    <input 
                        type="password" 
                        name="password2"
                        className={classnames(`${classes.input_line}`, {
                            [classes.is_invalid]: errors.password2
                        })}
                        value={this.state.password2}
                        onChange={this.onChange}
                    />
                    {errors.password2 && (<small className={classes.invalid_feedback}>{errors.password2}</small>)}
                </label>
                <input type="submit" value="Sign Up" />
                <Link to="/login">I already have an account</Link>
            </form>
        </div>
    )
  }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
