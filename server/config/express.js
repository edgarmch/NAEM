var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    logger = require('morgan');

module.exports = function(app, config){
    function compile(str, path){
        return stylus(str).set('filename', path);
    }
    
var config = require('./config');


    if ('development' == config.env) {
    //  app.configure(function(){  
      app.set('views', config.rootPath + '/server/views');  
      app.set('view engine', 'jade');
      app.use(logger('dev'));
      app.use(bodyParser());
      app.use(favicon(__dirname + '/public/favicon.ico'));//revisar favicon v.4 express
      app.use(stylus.middleware(
          {
              src: config.rootPath + '/public',
              compile: compile
          }
      ));
      app.use(express.static(config.rootPath + '/public'));
    }
}
