// relative import
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const expressSession = require("express-session");
const port = process.env.PORT || 5000;
require("dotenv").config();

//dependencies imports
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const client = require("./elasticSearch/connection");
const indexSettings = require("./elasticSearch/mappings_and_settings");

const dbURL = process.env.DATABASE_URL || "https://localhost:8000";
// console.log(dbURL);
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(port, () => console.log("Server started on port 5000"))
  )
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   expressSession({ secret: "secret", resave: false, saveUninitialized: false })
// );

client.ping(
  {
    requestTimeout: 30000,
  },
  function (error) {
    if (error) {
      console.error("Elasticsearch cluster is down!");
    } else {
      console.log("Everything is ok");
      app.listen(7000, () => console.log("Server started on port 7000"));
    }
  }
);

// Check if the index named post exists or not if not create it with mapping and analyzer settings
client.indices.exists(
  {
    index: "post",
  },
  (err, res, status) => {
    if (res) {
      console.log("index already exists");
    } else {
      client.indices.create(
        {
          index: "post",
          body: indexSettings,
        },
        (err, res, status) => {
          if (err) {
            console.log(err);
          } else {
            console.log("created a new index", res);
          }
        }
      );
    }
  }
);

app.use("/user", userRoutes);
app.use("/post", postRoutes);
