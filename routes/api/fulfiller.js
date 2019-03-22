const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateFulfillerInput = require('../../validation/fulfiller');

// Load FulfillerProfile Model
const Fulfiller = require('../../models/Fulfiller');
// Load User Profile
const User = require('../../models/User');

// @route GET api/fulfiller/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));

// @route GET api/fulfiller
// @desc Get current users fulfiller
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Fulfiller.findOne({ user: req.user.id }) //find profile with the same id as the id of the user in the token
        .populate('user', ['name', 'email'])
        .then(fulfiller => {
            if(!fulfiller) {
                errors.nofulfiller = 'There is no fulfiller profile for this user'
                return res.status(404).json(errors);
            }
            res.json(fulfiller);
        })
        .catch(err => res.status(404).json(err));
});

// @route POST api/fulfiller
// @desc Create or edit user fulfiller profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid} = validateFulfillerInput(req.body);

    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    //  Get fields
    const fulfillerFields = {};
    fulfillerFields.user = req.user.id;
    if(req.body.address) fulfillerFields.address = req.body.address;


    Fulfiller.findOne({ user: req.user.id })
        .then(fulfiller => {
            if(fulfiller) {
                // Update
                Fulfiller.findOneAndUpdate(
                    { user: req.user.id }, 
                    { $set: fulfillerFields }, 
                    { new: true}
                )
                .then(fulfiller => res.json(fulfiller));
            } else {
                // Create

                // Check if fulfiller address exists
                Fulfiller.findOne({ address: fulfillerFields.address })
                    .then(fulfiller => {
                        if(fulfiller) {
                            errors.address = 'There is another fulfiller already registered with this address';
                            res.status(400).json(errors);
                        }

                        // Save Fulfiller Profile
                        new Fulfiller(fulfillerFields).save().then(fulfiller => res.json(fulfiller));
                    });
            }
        })
});

// @route DELETE api/fulfiller
// @desc Delete user and fulfiller profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Fulfiller.findOneAndRemove({ user: req.user.id })
        .then(() => {
            User.findOneAndRemove({ _id: req.user.id })
                .then(() => res.json({ success: true }));
        })
});

module.exports = router;