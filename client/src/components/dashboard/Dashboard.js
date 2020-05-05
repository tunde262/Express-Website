import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentCompany, deleteAccount } from '../../actions/companyActions';
import { getCurrentFulfiller, deleteFulfillerAccount } from '../../actions/fulfillerActions';

import Spinner from '../common/Spinner';
import Product from './product/Product';
import NoProfile from './no-profile/NoProfile';
import Navbar from './navbar/Navbar';
import Map from './map/Map';
import FulfillerProfile from './fulfiller-profile/FulfillerProfile';

import classes from './Dashboard.module.css';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentCompany();
        this.props.getCurrentFulfiller();
    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    }
    onDeleteFulfillerClick(e) {
        this.props.deleteFulfillerAccount();
    }

  render() {
    const { company, loading } = this.props.company;
    const { fulfiller, loading2 } = this.props.fulfiller;

    let dashboardContent;

    if(company === null || loading || fulfiller === null || loading2) {
        dashboardContent = <Spinner />;
    } else {
        // Check if logged in user has any company data or fulfiller data
        if(Object.keys(company).length > 0) {
            dashboardContent = (
                <div className={classes.container}>
                    <Navbar />
                    <div className={classes.splitScreen}>
                        <Product product={company.products} />
                        <Map />
                    </div>
                    <div className={classes.profileEdit}><Link to="edit-company">Edit Account</Link></div>
                    <div onClick={this.onDeleteClick.bind(this)} className={classes.profileDelete}>Delete Account</div>
                </div>
            );
        } else if(Object.keys(fulfiller).length > 0) {
            dashboardContent = (
                <div className={classes.container}>
                    <Navbar />
                    <div style={{ marginTop: '48px' }}>
                        <FulfillerProfile />
                    </div>
                    <div className={classes.profileEdit}><Link to="edit-fulfiller">Edit Account</Link></div>
                    <div onClick={this.onDeleteFulfillerClick.bind(this)} className={classes.profileDelete}>Delete Account</div>
                </div>
            );
        } else {
            // User is logged in but has no profile
            dashboardContent = (
                <div>
                    <NoProfile />
                </div>
            ); 
        }
    }

    return (
      <div>
        {dashboardContent}
      </div>
    )
  }
}

Dashboard.propTypes = {
    getCurrentCompany: PropTypes.func.isRequired,
    getCurrentFulfiller: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,
    fulfiller: PropTypes.object.isRequired,
    deleteFulfillerAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    company: state.company,
    fulfiller: state.fulfiller,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentCompany, getCurrentFulfiller, deleteAccount, deleteFulfillerAccount })(Dashboard);
