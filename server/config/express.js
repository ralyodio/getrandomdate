'use strict';

var cors = require('cors');
var compression = require('compression');
var engine = require('ejs-locals');
var errorhandler = require('errorhandler');

module.exports = function(app){
  app.use(cors());
  app.use(compression());

  //setup view engine
  app.set('views', app.get('root') + '/server/views');
  app.set('view engine', 'ejs');
  app.engine('ejs', engine);

  // development only
  if ('development' === app.get('env')) {
    app.use(errorhandler({ dumpExceptions: true, showStack: true }));
  }

  // production only
  if ('production' == app.get('env')) {
    app.use(errorhandler());
  }
};
