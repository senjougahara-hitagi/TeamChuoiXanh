'use strict';
var readdata = require('./readfile');
module.exports = {
  getAll : function(req, res){
    readdata('shopData.json', (err, data)=>{
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  }
}
