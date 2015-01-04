var moment = require('moment');
var express = require('express');
var cors = require('cors');
var app = express();
var json2csv = require('json2csv');

app.use(cors());

app.use(express.static('client/public'));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDataFromDate(rand) {
  return {
    unix: moment(rand).utc().unix(),
    format: moment(rand).utc().format(),
    fromNow: moment(rand).utc().fromNow(),
    utc: moment(rand).utc(),
    utcMs: moment(rand).utc().valueOf(),
    full: moment(rand).utc().format('MMMM Do YYYY, h:mm:ss a'),
    dayOfWeek: moment(rand).utc().format('dddd'),
    calendar: moment(rand).utc().calendar()
  };
}

app.get('/', function(req, res){
  res.redirect('/README.html');
});

app.get('/days-ago/:days', function(req, res) {
  var days = parseInt(req.params.days);

  //returns seconds
  var start = moment().unix();

  //needs ms as input
  var end = moment(start * 1000).subtract(days, 'd').unix();

  //convert to ms for moment
  var rand = getRandomInt(start, end) * 1000;

  console.log('start: %d end: %d: rand: %d', start, end, rand);

  var data = getDataFromDate(rand);

  res.send(data);
});

app.get('/days-ago/:days/:format', function(req, res) {
  var days = parseInt(req.params.days);
  var field = req.params.format || 'unix';
  var count = req.query.count || 1;

  //returns seconds
  var start = moment().unix();

  //needs ms as input
  var end = moment(start * 1000).subtract(days, 'd').unix();


  var list = [];

  while ( count > 0 ) {
    //convert to ms for moment
    var rand = getRandomInt(start, end) * 1000;
    var data = getDataFromDate(rand);

    console.log('start: %d end: %d: rand: %d', start, end, rand);

    list.push(data);
    count--;
  }

  json2csv({data: list, fields: [field]}, function(err, csv) {
    if (err) console.log(err);
    res.send(csv);
  });
});

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
