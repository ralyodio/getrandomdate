# getRandomDate

Get a random date between two dates in JSON format.

## install

If you want to run the app locally on your own server, you can install it:

    git clone git@github.com:chovy/getrandomdate.git
    npm install
    node ./server/index.js

## endpoints

### /days-ago/:days

    GET /days-ago/7

Gets a random date from the last 7 days.

- <http://getrandomdate.com/days-ago/7>



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
