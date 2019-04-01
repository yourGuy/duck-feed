"use strict";

var helper = require("./helper"),
  response = require("./response");

module.exports.saveFeed = (event, cb) => {
    helper
        .saveFeed(event.pathParameters)
        .then(result => {
            cb(null, response.create(200, {}));
        })
        .catch(err => {
            cb(
                null,
                response.create(500, {
                    err: err
                })
            );
        });
};