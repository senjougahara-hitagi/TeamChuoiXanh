'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/all', controller.getAll);
router.post('/create', controller.create);

module.exports = router;
