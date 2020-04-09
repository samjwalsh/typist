const Stats = require('./../models/statsModel');

// TODO Sanitize wpm input so it is forsure only a number
// TODO put limit on number of tests that can be submitted a limit
/*exports.addResult = async (req, res, next) => {
    try {
        let wpm = parseInt(req.body.wpm);
        console.log(wpm);
        if (wpm > 0 && wpm < 220) {
            wpm = Math.floor(wpm);
            console.log(req.params.testType);
            let stat = await Stats.updateOne({ testType: req.params.testType }, {results[wpm] : results[wpm] + 1});
            console.log(stat);
            await stat.save();
            res.status(200).json({
                status: 'success',
            });
        }
    } catch (e) {
        console.log(e);
    }
};
*/

exports.addResult = async (req, res, next) => {
    let wpm = Math.floor(req.body.wpm);
    if (wpm > 0 && wpm < 220) {
    }
};

exports.getStats = (req, res, next) => {
    next();
};
