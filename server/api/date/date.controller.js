/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

//var _ = require('lodash');
var moment = require('moment');
var json2csv = require('json2csv');
var EasyXml = require('easyxml');

var serializer = new EasyXml({
  singularizeChildren: true,
  allowAttributes: true,
  rootElement: 'response',
  dateFormat: 'ISO',
  indent: 2,
  manifest: true
});

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

function getDataList(start, end, req){
  var count = req.query.count || 1;
  var list = [];

  while ( count > 0 ) {
    //convert to ms for moment
    var rand = getRandomInt(start, end) * 1000;
    var data = getDataFromDate(rand);

    console.log('start: %d end: %d: rand: %d', start, end, rand);

    list.push(data);
    count--;
  }

  return list;
}

function renderResponse(list, req, res){
  var ext = req.params.ext || 'json';

  if ( ext === 'xml' ) {
    res.set('Content-Type', 'text/xml');
    res.send(serializer.render(JSON.parse(JSON.stringify(list))));
  }
  else if ( ext === 'csv' ) {
    json2csv({ data: list, fields: Object.keys(list[0])}, function(err, csv) {
      if (err) return handleError(res, err);
      res.set('Content-type', 'text/plain');
      res.send(csv);
    });
  }
  else {
    res.json(list);
  }
}

// Get list of videos
exports.daysAgo = function(req, res) {
  var days = parseInt(req.params.days);
  var start = moment().unix(); //seconds
  var end = moment(start * 1000).subtract(days, 'd').unix(); //ms as input
  var list = getDataList(start, end, req);

  renderResponse(list, req, res);
};

function handleError(res, err) {
  return res.send(500, err);
}
