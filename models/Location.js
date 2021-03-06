const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    // CHANGE Does location contain only name of the city/county or it's full address
    name: {
        type: String,
        required: true
    },
    timeCreated: {
        type: Date,
        default: new Date()
    }
});

module.exports = Location = mongoose.model('locations', LocationSchema);