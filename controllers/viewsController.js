exports.getTypingTest = (req, res) => {
    //console.log(req.cookies);
    res.status(200).render('typingTest', {
        theme: req.cookies.theme ? req.cookies.theme : 'dots',
    });
};
