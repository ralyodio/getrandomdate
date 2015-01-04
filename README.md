# getrandomdate

Get a random date between two dates in JSON format.

## install

    git clone git@github.com:chovy/getrandomdate.git
    npm install
    node ./server/index.js

## /days-ago/:days

    GET /days-ago/7

Gets a random date from the last 7 days.

## /hours-ago/:hours

    GET /hours-ago/4

Gets a random date from the last 4 hours.

## /seconds-ago/:90

    GET /seconds-ago/90

Gets a random date from the last 90 seconds.


## /from/:date1/to/:date2

    GET /from/2010/to/2014
  
Gets a random date between the two dates.


## /days-ago/:days/:format

    GET /days-ago/7/unix
