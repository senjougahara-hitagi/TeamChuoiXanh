'use strict';

var Test = require('./test.model');

module.exports = {
  findAll : function(req, res){
    Test.find().exec(function(err, data){
      res.json(data);
    });
  },

  add: function(req, res) {
    Test.create(req.body, function(err, data){
      console.log(err);
      if (err) {
        res.json({message: 'Fail'});
      }
      res.json({message: 'Success'});
    });
  }
}
