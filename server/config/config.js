var path = require('path');
var roothPath = path.normalize(__dirname + '/../../');
module.exports = {
  development: {
    db: 'mongodb://localhost/mean',                           
     roothPath: roothPath,
     port: process.env.PORT || 3030                           
  },
production: {
     roothPath: roothPath,
     port: process.env.PORT || 80
  }                            
}