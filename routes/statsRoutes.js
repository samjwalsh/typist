const express = require('express');
const statsController = require('../controllers/statsController');

const router = express.Router();

router.post('/:testType', statsController.addResult);
router.get('/:testType', statsController.getStats);

module.exports = router;
