import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../../actions/authActions';

import classes from './Login.module.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData);
    }

  render() {
    const { errors } = this.state;

    return (
        <div className={classes.container}>
            <h1>Sign In</h1>
            <form onSubmit={this.onSubmit}>
                <label>Email
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
                <label>Password
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
                <input type="submit" value="Sign Up" />
                <Link to="/register">Don't yet have an account?</Link>
            </form>
        </div>
    )
  }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
