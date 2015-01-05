'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

//application root
app.set('root', path.resolve(__dirname, '..'));

app.use(express.static(app.get('root') + '/client/public'));

//configuration and routes
require('./config/express')(app);
require('./routes')(app);


app.get('/', function(req, res){
  var file = path.resolve(app.get('root'), 'client/public/docs/README.html');

  fs.readFile(file, function(err, doc){
    res.render('index', { doc: doc });
  });
});


var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
