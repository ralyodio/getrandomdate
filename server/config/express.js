'use strict';

var cors = require('cors');
var compression = require('compression');
var engine = require('ejs-locals');

module.exports = function(app){
  app.use(cors());
  app.use(compression());

  //setup view engine
  app.set('views', app.get('root') + '/server/views');
  app.set('view engine', 'ejs');
  app.engine('ejs', engine);
};
