import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../../actions/authActions';
import { clearCurrentCompany } from '../../../../actions/companyActions';
import { clearCurrentFulfiller } from '../../../../actions/fulfillerActions';

import classes from './SideDrawer.module.css';

class SideDrawer extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentFulfiller();
        this.props.clearCurrentCompany();
        this.props.logoutUser();
    }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
        <ul>
            <li>
                <a href="" onClick={this.onLogoutClick.bind(this)}>Logout</a>
            </li>
        </ul>
    );
    
    const guestLinks = (
        <ul>
            {/* <li><a href="/">How It Works</a></li>
            <li><a href="/">How you benefit</a></li>
            <li><a href="/">How we're different</a></li> */}
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
        </ul>
    );
    return (
        <nav className={classes.side_drawer}>
            {isAuthenticated ? authLinks : guestLinks}
        </nav>
    )
  }
}

SideDrawer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentCompany, clearCurrentFulfiller })(SideDrawer);