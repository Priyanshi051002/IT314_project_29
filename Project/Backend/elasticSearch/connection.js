var elasticsearch = require("elasticsearch");

var client = new elasticsearch.Client({
  hosts: [
    "https://elastic:YpQWbM81ZMyQKs5Ro6Q7UyLi@software-project.es.us-central1.gcp.cloud.es.io",
  ],
});

module.exports = client;
