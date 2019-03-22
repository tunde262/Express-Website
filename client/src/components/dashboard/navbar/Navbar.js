import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Navbar.module.css';

class Navbar extends Component {
    render() {
        const { company } = this.props.company;

        const companyLinks = (
            <ul>
                <li className={classes.active}><a href="/">Variants</a></li>
                <li><a href="/">Products</a></li>
                <li><a href="/">Ordered</a></li>
                <li><a href="/">Delivered</a></li>
            </ul>
        );
        
        const fulfillerLinks = (
            <ul>
                <li className={classes.active}><a href="/">Your Inventory</a></li>
                <li><a href="/">Pending Delivery</a></li>
                <li><a href="/">Recents</a></li>
            </ul>
        );

        return (
            <div className={classes.navbar}>
                <nav className={classes.navbar_navigation}>
                    <div className={classes.navbar_items}>
                        {Object.keys(company).length > 0 ? companyLinks : fulfillerLinks}
                    </div>
                </nav>
            </div>
        )
    }
}

Navbar.propTypes = {
    company: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    company: state.company
});

export default connect(mapStateToProps)(Navbar);

