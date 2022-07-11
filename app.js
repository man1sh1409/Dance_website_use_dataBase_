const express = require("express");
const path = require("path");
const port = 8000;
const fs = require("fs");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use("/static", express.static("static"));
app.use(express.urlencoded());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// getting-started.js

mongoose.connect("mongodb://localhost/contactDance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("connection get established..");
});
//schema
const contactSchema = new mongoose.Schema({
  name: String,
  mobile: Number,
  email: String,
  password: String,
});
contactSchema.methods.speak = function () {
  //var greeting = this.name
  console.log("your  form have been submitted successfully");
};
//model
const contact = mongoose.model("contact", contactSchema);
//object
/*var object1= new contact({ name: 'manishkomal' });
console.log(object1.name); // 'manishkomal'

//saving into database
object1.save(function (err, object1) {
  if (err) return console.error(err);
  object1.speak();
});
*/
app.get("/", (req, res) => {
  res.render("index.pug");
});
app.get("/contact", (req, res) => {
  res.render("contact.pug");
});
app.post("/contact", (req, res) => {
  //res.render('contact.pug');
  //console.log(req.body());
  var data = new contact(req.body);
  console.log(data);
  data.save().then(() => {
      res.status(200).send("your from have been submitted successfully");
    })
    .catch(() => {
      res.status(400).send("data is not sent properly");
    });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
