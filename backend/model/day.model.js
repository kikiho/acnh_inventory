const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const daySchema = new Schema({
    date: {
        type: Date, required: true,
    },
    npcs: {
        type: [String]
    }
    
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;