const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    image: {
        type: Schema.Types.ObjectId, // There is no need to create references here
        ref: 'uploads'
    },
    image_name: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Processing'
    },
    address: {
        type: String,
        default: '6100 Glenhollow Drive, Plano, TX 75093'
    }
});

module.exports = Product = mongoose.model('product', ProductSchema);