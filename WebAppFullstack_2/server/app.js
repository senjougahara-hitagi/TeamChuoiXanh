'use strict';

var express = require('express');
var config = require('./config/environment');
var http = require('http');

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);

// config routes
require('./routes')(app);

// config DB
// var mongoose = require('mongoose');
// //mongoose.connect('mongodb://admin:123456@ds151697.mlab.com:51697/techkids');
// mongoose.connect('mongodb://localhost/techkids');
//
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'DB connection error: '));
// db.once('open', function() {
//   console.log('DB connection success! ');
// });

// Start server
server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
