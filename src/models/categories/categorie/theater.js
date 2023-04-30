const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const CategorieController = require("../categorie_controller");

const theaterSchema = new mongoose.Schema(CategorieController.theater())

const Theater = mongoose.model("theater", theaterSchema);

module.exports = Theater;