const client = require("./connection.js");

client.indices.delete(
  {
    index: "post",
  },
  (err, result, status) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Post index deleted");
    }
  }
);
