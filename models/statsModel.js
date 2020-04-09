const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    testType: {
        type: String,
        required: true,
    },
    results: {
        type: Object,
    },
});

const Stats = mongoose.model('stats', statsSchema);

module.exports = Stats;
