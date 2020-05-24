const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    username: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    },
    category: {
        type: String, required: true
    },
    tags: {
        type: [String]
    },
    amount: {
        type: Number,
    },
    color: {
        type: String,
    }
}, {timestamps: true});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;