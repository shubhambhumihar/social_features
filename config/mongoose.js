const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codial_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error conecting to MONGODB"));

db.once("open", function () {
  console.log("Connected To MONGODB Database");
});

module.exports = db;
