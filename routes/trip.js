var express = require('express');
var router = express.Router();
const tripController = require('../controller/trip.controller');

/* POST home page. */
router.post('/',tripController.startTrip);

module.exports = router;
