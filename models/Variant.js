const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VariantSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    qty: {
        type: Number,
        required: true
    },
    variants: {
        var1: {
            type: String
        },
        var2: {
            type: String
        },
        var3: {
            type: String
        },
        var4: {
            type: String
        }
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'item'
        }
    ]
});

module.exports = Variant = mongoose.model('variant', VariantSchema);