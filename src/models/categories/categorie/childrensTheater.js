const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const CategorieController = require("../categorie_controller");

const childrenstheaterSchema = new mongoose.Schema(CategorieController.childrenstheater())
// mongoose.plugin(timestamp);

const ChildrensTheater = mongoose.model("childrenstheater", childrenstheaterSchema);

module.exports = ChildrensTheater;