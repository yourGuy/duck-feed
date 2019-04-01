"use strict";

const db = require("../database/dynamodb");
const DB_PREFIX = process.env.IS_OFFLINE ? "dev" : process.env.DB_PREFIX;


function saveFeed(data) {
    return db("put", {
        TableName: DB_PREFIX + "-duckFeed",
        Item: {
            id: guid(),
            ... data
        }
    });
}

const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
    );
}
}

module.exports = {
    saveFeed: saveFeed
};
