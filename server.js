const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const request = require("request");
mongoose.set("strictQuery", true);
const https = require("https");
const { fileURLtopath } = require("url");
const path = require("path");
const { jar } = require("request");
const { ftruncateSync, readSync } = require("fs");
const app = express();
app.set("viewengine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.post("/index", function (req, res) {
  console.log("Hello World");
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const conn = mongoose
    .connect("mongodb://localhost:27017/Portfolio")
    .then(() => console.log("connected"))
    .catch((e) => console.log(e));
  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  console.log("Hello world again");
  db.on("connected", function () {
    console.log("Connection Successful!");
    // define Schema
    const contactsSchema = new mongoose.Schema({
      name: String,
      email_id: String,
      message: String,
    });
    const contacts = mongoose.model("contacts", contactsSchema);
    const newcontact = new contacts({
      name: name,
      email_id: email,
      message: message,
    });
    // save model to database
    newcontact.save();
  });
  console.log("Hello again");
  res.render(__dirname + "/views/index.ejs", { name: name });
});
app.listen(3000, () => console.log(`Server is listening on port 3000`));
