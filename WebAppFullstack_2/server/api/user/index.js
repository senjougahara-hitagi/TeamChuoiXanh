'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../auth/auth.service');

var router = express.Router();

router.get('/account/:account', controller.findByAccount);
router.get('/name/:name', controller.findByName);
router.get('/find', controller.find);
router.put('/edit',controller.edit);
router.delete('/delete/:username',controller.deleteUser);
router.post('/create',controller.addUser);

module.exports = router;
