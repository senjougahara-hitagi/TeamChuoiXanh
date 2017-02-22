var fs = require('fs');
module.exports = (file, callback) => {
   fs.readFile(file, callback);
 }
