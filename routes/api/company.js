const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateCompanyInput = require('../../validation/company');
const validateProductInput = require('../../validation/product');

// Load Company Model
const Company = require('../../models/Company');
//Load User Model
const User = require('../../models/User');

// @route GET api/company/test
// @desc Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

// @route GET api/company
// @desc Get current users profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Company.findOne({ user: req.user.id }) //find profile with the same id as the id of the user in the token
        .populate('user', ['name', 'email'])
        .then(company => {
            if(!company) {
                errors.nocompany = 'There is no company for this user'
                return res.status(404).json(errors);
            }
            res.json(company);
        })
        .catch(err => res.status(404).json(err));
});

// @route POST api/company
// @desc Create or edit user company
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid} = validateCompanyInput(req.body);

    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    //  Get fields
    const companyFields = {};
    companyFields.user = req.user.id;
    if(req.body.name) companyFields.name = req.body.name;
    if(req.body.website) companyFields.website = req.body.website;
    if(req.body.role) companyFields.role = req.body.role;
    if(req.body.location) companyFields.location = req.body.location;

    Company.findOne({ user: req.user.id })
        .then(company => {
            if(company) {
                // Update
                Company.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: companyFields }, 
                    { new: true}
                )
                .then(company => res.json(company));
            } else {
                // Create

                // Check if company name exists
                Company.findOne({ name: companyFields.name })
                    .then(company => {
                        if(company) {
                            errors.name = 'There is another company already registered with that name';
                            res.status(400).json(errors);
                        }

                        // Save Profile
                        new Company(companyFields).save().then(company => res.json(company));
                    });
            }
        })
});

// @route POST api/company/product
// @desc Add product to company
// @access Private
router.post('/product', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid} = validateProductInput(req.body);

    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    } 
    Company.findOne({ user: req.user.id })
        .then(company => {
            const newProd = {
                name: req.body.name,
                qty: req.body.qty
            }

            // Add to prod array
            company.product.unshift(newProd);

            company.save().then(company => res.json(company));
        })
});

// @route DELETE api/company/product/:exp_id
// @desc Delete product from profile
// @access Private
router.delete('/product/:prod_id', passport.authenticate('jwt', { session: false }), (req, res) => {
   
    Company.findOne({ user: req.user.id })
        .then(company => {
            // Get remove index
            const removeIndex = company.product
                .map(item => item.id)
                .indexOf(req.params.prod_id);

            // Splice out of array
            company.product.splice(removeIndex, 1);

            //save
            company.save().then(company => res.json(company));
        })
        .catch(err => res.status(404).json(err));
});

// @route DELETE api/company
// @desc Delete user and company
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Company.findOneAndRemove({ user: req.user.id })
        .then(() => {
            User.findOneAndRemove({ _id: req.user.id })
                .then(() => res.json({ success: true }));
        })
});

module.exports = router;