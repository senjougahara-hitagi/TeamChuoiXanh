'use strict';

module.exports = {
  getAll : function(req, res){
    res.json('Get Thing');
  },

  create: function(req, res) {
    console.log(req.body);
    res.json('create new thing');
  }
}
