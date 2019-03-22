import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createFulfiller, getCurrentFulfiller } from '../../actions/fulfillerActions';

import classes from '../create-company/CreateCompany.module.css';


class CreateFulfiller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentFulfiller();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        if(nextProps.fulfiller.fulfiller) {
            const fulfiller = nextProps.fulfiller.fulfiller;

            // Set component fields state
            this.setState({
                address: fulfiller.address,
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const fulfillerData = {
            address: this.state.address,
        }

        this.props.createFulfiller(fulfillerData, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

  render() {
    const { errors } = this.state;

    return (
        <div style={{ textAlign: 'center' }}>
            <div className={classes.goBack}><Link to="/dashboard">Go Back</Link></div>
            <h1>Edit Your Info</h1>
            <div className={classes.container}>
                <form onSubmit={this.onSubmit}>
                    <label>Address
                        <input 
                            type="text" 
                            name="address"
                            className={classnames(`${classes.input_line}`, {
                                [classes.is_invalid]: errors.address
                            })}
                            value={this.state.address}
                            onChange={this.onChange}
                        />
                        {errors.address && (<small className={classes.invalid_feedback}>{errors.address}</small>)}
                    </label>
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
        </div>
    );
  }
}

CreateFulfiller.propTypes = {
    createFulfiller: PropTypes.func.isRequired,
    getCurrentFulfiller: PropTypes.func.isRequired,
    fulfiller: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    fulfiller: state.fulfiller,
    errors: state.errors
});

export default connect(mapStateToProps, { createFulfiller, getCurrentFulfiller })(withRouter(CreateFulfiller));
