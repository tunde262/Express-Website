import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { clearCurrentCompany } from '../../../actions/companyActions';
import { clearCurrentFulfiller } from '../../../actions/fulfillerActions';

import DrawerToggleButton from './SideDrawer/DrawerToggleButton';
import classes from './Navbar.module.css';
import logo from '../../../img/logo.png';

class Navbar extends Component {
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
                <li><a href="/">How It Works</a></li>
                <li><a href="/">How you benefit</a></li>
                <li><a href="/">How we're different</a></li>
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
            </ul>
        );

        const drawerToggleButton = <DrawerToggleButton click={this.props.drawerClickHandler} />

        return (
            <header className={classes.navbar}>
                <nav className={classes.navbar_navigation}>
                    <div className={classes.navbar_logo}><Link to="/"><img src={logo} alt="logo" style={{height: '40px'}} /></Link></div>
                    <div className={classes.spacer}></div>
                    <div className={classes.navbar_items}>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                    <div className={classes.navbar_toggle_button}>
                        {drawerToggleButton}
                    </div>
                </nav>
            </header>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentCompany, clearCurrentFulfiller })(Navbar);

