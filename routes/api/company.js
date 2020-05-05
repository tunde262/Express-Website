const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
//gridfs
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');


// Load validation
const validateCompanyInput = require('../../validation/company');
const validateProductInput = require('../../validation/product');

// Load Company Model
const Company = require('../../models/Company');
//Load User Model
const User = require('../../models/User');
//Load Product Model
const Product = require('../../models/Product');

//Db Config
const db = require('../../config/keys').mongoURI;

// Create Mongo Connection
const conn = mongoose.createConnection(db);

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
})

// Create Storage engine
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

// @route GET api/company
// @desc Get current users profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Company.findOne({ user: req.user.id }) //find profile with the same id as the id of the user in the token
        .populate('user', ['name', 'email'])
        .populate('products', ['name', 'price', 'image', 'image_name'])
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
router.post('/product', upload.single('file'), passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid} = validateProductInput(req.body);

    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    } 
    console.log(req.file)

    // Add single product
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        // Grab the file id that was stored in the database by the storage engine as the reference to your file
        image: req.file.id,
        image_name: req.file.filename
    });
    console.log(newProduct)

    Company.findOne({ user: req.user.id }).then(company => {
        newProduct.user = company;
        newProduct.save();
        company.products.unshift(newProduct);
        company.save();
    });
    res.json(newProduct);
});

// @route DELETE api/company/product/:exp_id
// @desc Delete product from profile
// @access Private
router.delete('/product/:prod_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Product.findOneAndRemove({ _id: req.params.prod_id })
        .then(product => {
            Company.findOne({ user: req.user.id })
                .then(company => {
                    if(company.products.filter(product => product.toString() === req.params.prod_id).length === 0) {
                        return res.status(400).json({ noproduct: 'This product was never added' });
                    }

                    // Get remove index
                    const removeIndex = company.products
                        .map(product => product.toString())
                        .indexOf(req.params.prod_id);

                    // Splice out of array
                    company.products.splice(removeIndex, 1);

                    //save
                    company.save().then(company => res.json(company));
                })
                .catch(err => res.status(404).json(err));
        })
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

//@route GET /files
//@desc Display all image files in JSON
router.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if(!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        //Files exist
        return res.json(files);
    });
});

//@route GET /files/:filename
//@desc Display single image object
router.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        //File exists
        return res.json(file);
    });
});

//@route GET /image/:filename
//@desc Display Image
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        
        //Check if image
        if(file.contentType === 'image/jpeg' || file.contentType === 'img/png' || file.contentType === 'image/png') {
            //  Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});

//@route DELETE /files/:id
//@desc Delete image
router.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id }, (err) => {
        if (err) {
            return res.status(500).json({ success: false })
        }
        return res.json({ success: true });
    });
});

//@route GET /:prod_id
//@desc Get single product 
router.get('/:prod_id', (req, res) => {
    Product.findById(req.params.prod_id)
        .then(prod => {
            res.json(prod);
        })
        .catch(err => res.status(404).json({prod: 'This Product was never added'}));
});


module.exports = router;