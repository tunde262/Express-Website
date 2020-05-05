const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
    variant: {
        type: Schema.Types.ObjectId,
        ref: 'variant'
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

module.exports = Item = mongoose.model('item', ItemSchema);