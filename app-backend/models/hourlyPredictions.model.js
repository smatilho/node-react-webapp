const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HourlyPredictions = new Schema({
    lotCategory: {
        type: String
    },
    lotName: {
        type: String
    },
    timeBlocks: {
        type: Array
    },
    averageSpots: {
        type: Array
    },
    totalSpots: {
        type: Number
    },
    lastUpdated: {
        type: String
    }
});

module.exports = mongoose.model('HourlyPredictions', HourlyPredictions);