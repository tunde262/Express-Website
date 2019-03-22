const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Fulfiller 
const FulfillerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    address: {
        type: String,
        required: true
    },
    fulfilling: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ]
});

module.exports = Fulfiller = mongoose.model('fulfiller', FulfillerSchema);