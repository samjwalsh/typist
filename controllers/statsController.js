const Stats = require('./../models/statsModel');

// TODO Sanitize wpm input so it is forsure only a number
// TODO put limit on number of tests that can be submitted a limit
exports.getStats = async (req, res, next) => {
    try {
        let testType = req.params.testType;

        const doc = await Stats.findOne({ testType });

        res.status(200).json({
            status: 'success',
            results: doc.results,
        });
    } catch (e) {
        console.log('--------------------------------------------------------');
        console.log(e);
        console.log('---------------------getStats Error---------------------');

        res.status(500).json({
            status: 'Someting went wrong',
        });
    }
};

exports.addResult = async (req, res, next) => {
    let wpm = Math.floor(req.body.wpm);
    let testType = req.params.testType;
    if (wpm > 0 && wpm <= 299) {
        const doc = await Stats.findOne({ testType });

        doc.results.set(wpm, doc.results[wpm] + 1);

        doc.save();

        res.status(200).json({
            status: 'success',
        });
    } else {
        res.status(400).json({
            status: 'fail',
            message: 'Speed is too fast',
        });
    }
};
