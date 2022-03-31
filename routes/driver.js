var express = require('express');
var router = express.Router();
const driverController = require('../controller/driver.controller');

/* GET users listing. */
router.get('/',driverController.testing);

/* POST Register page. */
router.post('/register',driverController.register);

module.exports = router;
