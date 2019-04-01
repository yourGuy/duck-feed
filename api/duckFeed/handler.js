'use strict';

let duckFeed = require('./lib/duckFeed');


module.exports.saveFeed = (event, context, callback) => {
    duckFeed.saveFeed(event, callback);
};