var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),
    session      = require('express-session');


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
  app.use(cookieParser());
  app.use(session({secret: 'master of masters'}));
  app.use(passport.initialize());    
  app.use(passport.session());    
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
    
var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String
});
    
var User = mongoose.model('User', userSchema);
    
User.find({}).exec(function(err, collection){
    if(collection.length === 0){
        User.create({firstName:'Joe', lastName:'Eames', username:'joe'});
        User.create({firstName:'John', lastName:'Papa', username:'john'});
        User.create({firstName:'Don', lastName:'Wahlin', username:'don'});
    
    }  
});

passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({username:username}).exec(function(err, user){
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }                                       
        })
    }        
));

passport.serializeUser(function(user, done){
    if(user){
        done(null, user, _id);
    }
});

passport.deserializeUser(function(id, done){
    User.findOne({_id:id}).exec(function(err, user){    
    if(user){
        return done(null, user);
    }else{
        return done(null, false);
    }
    });
});
/*
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
});
*/
app.get('/partials/:partialPath', function(req, res){//config para angular de jade
    res.render('partials/' + req.params.partialPath);
});

app.post('/login', function(req, res, next){
         var auth = passport.authenticate('local', function(err, user){
         if(err) {return next(err);}
         if(!user){ res.send({success:false})}
          req.login(user, function(err){
          res.send({success:true, user:user}); 
          })
    })
         auth(req, res, next);
});

app.get('*', function(req, res){//atrapar todas las llamadas a index
    res.render('index');
});

var port= 3030;
app.listen(port);
console.log('Listening on ' + port + '...');
