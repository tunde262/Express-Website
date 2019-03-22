const Validator = require('validator');
const isEmpty = require('./is-empty'); 

module.exports = function validateCompanyInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.website = !isEmpty(data.website) ? data.website : '';
    data.role = !isEmpty(data.role) ? data.role : '';
    data.location = !isEmpty(data.location) ? data.location : '';

    if(!Validator.isLength(data.name, { min: 2, max: 40 })) {
        errors.name = 'Company name must be between 2 and 40 characters';
    }
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Company name is required';
    }

    if(Validator.isEmpty(data.website)) {
        errors.website = 'Website field is required';
    }

    if(Validator.isEmpty(data.role)) {
        errors.role = 'Role field is required';
    }

    if(Validator.isEmpty(data.location)) {
        errors.location = 'Location field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}