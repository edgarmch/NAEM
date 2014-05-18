var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    mongoose = require('mongoose'),
    logger = require('morgan');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
    return stylus(str).set('filename', path);
}

if ('development' == env) {
  app.set('views', __dirname + '/server/views');  
  app.set('view engine', 'jade');
  app.use(logger('dev'));
  app.use(bodyParser());
  app.use(favicon(__dirname + '/public/favicon.ico'));//revisar favicon v.4 express
  app.use(stylus.middleware({
      src: __dirname + '/public',
      compile: compile
  }));
  app.use(express.static(__dirname + '/public'));
}

mongoose.connect('mongodb://localhost/mean');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection failed...'));
db.once('open', function callback(){
    console.log('mean db opened');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function(req, res){//config para angular de jade
    res.render('partials/' + req.params.partialPath);
})

app.get('*', function(req, res){//atrapar todas las llamadas a index
    res.render('index', {
        mongoMessage: mongoMessage           
              });
});

var port= 3030;
app.listen(port);
console.log('Listening on ' + port + '...');
