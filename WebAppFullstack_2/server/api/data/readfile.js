var fs = require('fs');
module.exports = function(file, callback) {
   fs.readFile(file, callback);
 }
