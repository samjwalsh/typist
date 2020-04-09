const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Stats = require('../models/statsModel');

dotenv.config({ path: './config.env' });

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connected'));

const gamemodes = ['wordCount_10', 'wordCount_25', 'wordCount_50', 'wordCount_100', 'wordCount_250', 'timed_15', 'timed_30', 'timed_60', 'timed_120', 'timed_240'];

// let results = new Array();

gamemodes.forEach(async (name) => {
    Stats.create({
        testType: name,
        results: {},
    });
});

//Stats.create();
