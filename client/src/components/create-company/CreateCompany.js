import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createCompany } from '../../actions/companyActions';

import classes from './CreateCompany.module.css';


class CreateCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            website: '',
            role: '',
            location: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const companyData = {
            name: this.state.name,
            website: this.state.website,
            role: this.state.role,
            location: this.state.location
        }

        this.props.createCompany(companyData, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

  render() {
    const { errors } = this.state;

    // Select options for role
    const options = [
        { label: 'Whats Your Role In The Company', value: 0 },
        { label: 'Owner/CEO', value: 'Owner/CEO'},
        { label: 'Manager', value: 'Manager'},
        { label: 'Mid-Low Level employee', value: 'Employee'},
        { label: 'Other', value: 'Other'}
    ];

    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));

    // Select options for location
    const options2 = [
        { label: 'Where Are You Located', value: 0 },
        { label: 'Alabama', value: 'Alabama'},
        { label: 'Alaska', value: 'Alaska'},
        { label: 'Arizona', value: 'Arizona'},
        { label: 'Arkansas', value: 'Arkansas'},
        { label: 'California', value: 'California'},
        { label: 'Colorado', value: 'Colorado'},
        { label: 'Connecticut', value: 'Connecticut'},
        { label: 'Delaware', value: 'Delaware'},
        { label: 'Florida', value: 'Florida'},
        { label: 'Georgia', value: 'Georgia'},
        { label: 'Hawaii', value: 'Hawaii'},
        { label: 'Idaho', value: 'Idaho'},
        { label: 'Illinois', value: 'Illinois'},
        { label: 'Indiana', value: 'Indiana'},
        { label: 'Iowa', value: 'Iowa'},
        { label: 'Kansas', value: 'Kansas'},
        { label: 'Louisiana', value: 'Louisiana'},
        { label: 'Maine', value: 'Maine'},
        { label: 'Maryland', value: 'Maryland'},
        { label: 'Massachusetts', value: 'Massachusetts'},
        { label: 'Michigan', value: 'Michigan'},
        { label: 'Minnesota', value: 'Minnesota'},
        { label: 'Mississippi', value: 'Alabama'},
        { label: 'Missouri', value: 'Missouri'},
        { label: 'Montana', value: 'Montana'},
        { label: 'Nebraska', value: 'Nebraska'},
        { label: 'Nevada', value: 'Nevada'},
        { label: 'New Hampchire', value: 'New Hampchire'},
        { label: 'New Jersey', value: 'New Jersey'},
        { label: 'New Mexico', value: 'New Mexico'},
        { label: 'New York', value: 'New York'},
        { label: 'North Carolina', value: 'North Carolina'},
        { label: 'North Dakota', value: 'North Dakota'},
        { label: 'Ohio', value: 'Ohio'},
        { label: 'Oklahoma', value: 'Oklahoma'},
        { label: 'Oregon', value: 'Oregon'},
        { label: 'Pennsylvania', value: 'Pennsylvania'},
        { label: 'Rhode Island', value: 'Rhode Island'},
        { label: 'South Carolina', value: 'South Carolina'},
        { label: 'South Dakota', value: 'South Dakota'},
        { label: 'Tennessee', value: 'Tennessee'},
        { label: 'Texas', value: 'Texas'},
        { label: 'Utah', value: 'Utah'},
        { label: 'Vermont', value: 'Vermont'},
        { label: 'Virginia ', value: 'Virginia '},
        { label: 'Washington', value: 'Washington'},
        { label: 'West Virginia', value: 'West Virginia'},
        { label: 'Wisconsin', value: 'Wisconsin'},
        { label: 'Wyoming', value: 'Wyoming'},
    ];

    const selectOptions2 = options2.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));

    return (
        <div style={{ textAlign: 'center' }}>
            <div className={classes.goBack}><Link to="/dashboard">Go Back</Link></div>
            <h1>Register Your Company</h1>
            <h2>Your one step closer to having instant delivery for your customers!</h2>
            <div className={classes.container}>
                <form onSubmit={this.onSubmit}>
                    <label 
                        className={classnames(null, {
                            [classes.is_invalid]: errors.name
                        })}>Company Name
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
                        })}>Company Website
                        <input 
                            type="text"
                            name="website" 
                            className={classnames(`${classes.input_line}`, {
                                [classes.is_invalid]: errors.website
                            })}
                            value={this.state.website}
                            onChange={this.onChange}
                        />
                        {errors.website && (<small className={classes.invalid_feedback}>{errors.website}</small>)}
                    </label>
                    <label
                        className={classnames(null, {
                            [classes.is_invalid]: errors.password
                        })}>Role
                        <select  
                            name="role"
                            className={classnames(`${classes.input_line}`, {
                                [classes.is_invalid]: errors.password
                            })}
                            value={this.state.role}
                            onChange={this.onChange}
                        >{selectOptions}</select>
                        {errors.role && (<small className={classes.invalid_feedback}>{errors.role}</small>)}
                    </label>
                    <label
                        className={classnames(null, {
                            [classes.is_invalid]: errors.password
                        })}>location
                        <select  
                            name="location"
                            className={classnames(`${classes.input_line}`, {
                                [classes.is_invalid]: errors.location
                            })}
                            value={this.state.location}
                            onChange={this.onChange}
                        >{selectOptions2}</select>
                        {errors.location && (<small className={classes.invalid_feedback}>{errors.location}</small>)}
                    </label>
                    <input type="submit" value="Sign Up" />
                </form>
            </div>
        </div>
    )
  }
}

CreateCompany.propTypes = {
    company: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    company: state.company,
    errors: state.errors
});

export default connect(mapStateToProps, { createCompany })(withRouter(CreateCompany));
