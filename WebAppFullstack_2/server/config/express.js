'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./environment');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser')

module.exports = function(app) {
  var env = app.get('env');

  app.use(cookieParser('techkids', {maxAge: 120}));
  app.use(session({
    secret: 'techkids'
  }));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  var appPath = path.join(config.root, 'client');
  var bowers = path.join(config.root, 'bower_components');

  app.use(express.static(appPath));
  if (env === 'development') {
    app.use('/bower_components', express.static(bowers));
  }
}
