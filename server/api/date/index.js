'use strict';

var express = require('express');
var controller = require('./date.controller.js');

var router = express.Router();

router.get('/days-ago/:days.:ext', controller.daysAgo);

module.exports = router;
