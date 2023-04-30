const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const CategorieController = require("../categorie_controller");;

const comedyTheaterSchema = new mongoose.Schema(CategorieController.comedytheater())
// mongoose.plugin(timestamp);

const ComedyTheater = mongoose.model("ComedyTheater", comedyTheaterSchema);

module.exports = ComedyTheater;