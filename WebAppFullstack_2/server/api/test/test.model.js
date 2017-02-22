'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var test = new Schema({
  title: {
    type: String,
    required: [true, 'Phai co title']
  },
  createdDate: {type: Date, default: Date.now},
  questions: [String],
  author: {
    type: String,
    required: [true, 'Phai co author']
  }
});

module.exports = mongoose.model('Test', test);
