const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CompanySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    product: [
        {
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = Company = mongoose.model('company', CompanySchema);