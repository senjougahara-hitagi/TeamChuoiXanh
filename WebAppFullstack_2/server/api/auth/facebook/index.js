'use strict';

var express = require('express');
var passport = require('passport');
var authService = require('../auth.service');

var router = express.Router();

router.post('/', passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }));
router.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success.html');
  });
module.exports = router;
