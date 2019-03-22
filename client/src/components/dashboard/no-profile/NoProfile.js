import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './NoProfile.module.css';

class NoProfile extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div className={classes.container}>
        <h2>Welcome {user.name}, what would you like to do?</h2>
        <div>
            <Link to="/create-fulfiller"><div className={classes.largeButton}>Become a fulfiller</div></Link>
            <Link to="/create-company"><div className={classes.largeButton}>Register your Company</div></Link>
        </div>
      </div>
    )
  }
}

NoProfile.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(NoProfile);
