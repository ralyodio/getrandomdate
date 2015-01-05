# getRandomDate

Get a random date for a given time-frame in JSON, XML, or CSV format.

- <http://getrandomdate.com>

## install

If you want to run the app locally on your own server, you can install it:

    git clone git@github.com:chovy/getrandomdate.git
    cd getrandomdate
    npm install
    node ./server/index.js
    
Github repo: <http://github.com/chovy/getrandomdate>

## endpoints

### /days-ago/:days

Change format by adding extension `.json`, `.xml`, or `.csv`

Generate a random date from the last 7 days:

    GET /days-ago/7.json
    GET /days-ago/7.xml
    GET /days-ago/7.csv
    
Generate 10 random dates:

    GET /days-ago/7.json?count=10


- [/days-ago/7.json](/days-ago/7.json)
- [/days-ago/7.json?count=10](/days-ago/7.json?count=10)

<!--
### /hours-ago/:hours

    GET /hours-ago/4

Gets a random date from the last 4 hours.

- <http://getrandomdate.com/hours-ago/4>

### /seconds-ago/:seconds

    GET /seconds-ago/90

Gets a random date from the last 90 seconds.

- <http://getrandomdate.com/seconds-ago/90>

### /from/:date1/to/:date2

    GET /from/2010/to/2014
  
Gets a random date between the two dates.

- <http://getrandomdate.com/from/2010/to/2014>

### /days-ago/:days/:format

    GET /days-ago/7/unix
    GET /days-ago/7/unix?count=10
    
Get a CSV list of unix timestamps, with optional `count=x` parameter.

- <http://getrandomdate.com/days-ago/7/unix>
- <http://getrandomdate.com/days-ago/7/unix?count=10>

-->

## example usage:

    var request = require('request');
    var url = 'http://getrandomdate.com/days-ago/7.json';
    
    request(url, {json: true}, function(err, res, body){
        console.log(body);
    });
