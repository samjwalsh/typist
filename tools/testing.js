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

const test = async () => {
    const doc = await Stats.findOne({ testType: 'wordCount_10' });
    let wpm = 6;

    doc.results.set(6, doc.results[wpm] + 1);

    doc.save();

    console.log(doc);

    //const doc1 = await Stats.updateOne({ testType: 'wordCount_10', results }, { $set: { 'results.$[].value': 6 } });
};

test();
