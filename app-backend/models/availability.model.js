const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Availability = new Schema({
    lotCategory: {
        type: String
    },
    lotName: {
        type: String
    },
    lotPermit: {
        type: String
    },
    openSpots: {
        type: Number
    },
    totalSpots: {
        type: Number
    },
    lastUpdated: {
        type: String
    }
});

module.exports = mongoose.model('Availability', Availability);