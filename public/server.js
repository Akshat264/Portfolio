const express = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/Portfolio";
const bodyParser = require("body-parser");
const request = require("request");
mongoose.set("strictQuery", true);
const https = require("https");
const { fileURLtopath } = require("url");
const path = require("path");
const { jar } = require("request");
const { ftruncateSync, readSync } = require("fs");
const app = express();
let database;
app.set("viewengine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.post("/index", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("Portfolio");
    dbo
      .collection("contacts")
      .insertOne(
        { name: name, email_id: email, message: message },
        function (err, result) {
          if (err) console.log(err);
          else console.log(result);
        }
      );
  });
  res.render(__dirname + "/views/index.ejs", { message: message });
});
app.listen(3000, () => console.log(`Server is listening on port 3000`));
