'use strict';

var express = require('express');
var controller = require('./data.controller');

var router = express.Router();

router.get('/shop', controller.getAll);
//router.post('/create', controller.create);

module.exports = router;
