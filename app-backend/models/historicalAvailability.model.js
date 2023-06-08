const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HistoricalAvailability = new Schema({
    lotName: {
        type: String
    },
    openSpots: {
        type: Array
    },
    date: {
        type: String
    },
    day: {
        type: String
    }
});

module.exports = mongoose.model('HistoricalAvailability', HistoricalAvailability);