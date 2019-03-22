const Validator = require('validator');
const isEmpty = require('./is-empty'); 

module.exports = function validateProductInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.qty = !isEmpty(data.qty) ? data.qty : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Product Name is required';
    }

    if(Validator.isEmpty(data.qty)) {
        errors.qty = 'Qty field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}