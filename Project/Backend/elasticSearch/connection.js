var elasticsearch = require("elasticsearch");

var client = new elasticsearch.Client({
  hosts: [
    `${process.env.ELASTIC_URL}`,
  ],
});

module.exports = client;
