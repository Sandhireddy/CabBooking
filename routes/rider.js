var express = require('express');
var router = express.Router();
const riderController = require('../controller/rider.controller');

/* GET home page. */
router.get('/',riderController.testing);

/* POST Register page. */
router.post('/register',riderController.register);

module.exports = router;
