const Validator = require('validator');
const isEmpty = require('./is-empty'); 

module.exports = function validateFulfillerInput(data) {
    let errors = {};

    data.address = !isEmpty(data.address) ? data.address : '';

    if(Validator.isEmpty(data.address)) {
        errors.address = 'Your full address is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}