//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(process.env.PORT || port, () => {
  console.log(`Server app started on port:${process.env.PORT || port}`);
});

app.get("/", (req, res) => {
  res.render("simon");
});
