const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp")
const CategorieController = require("../categorie_controller")

const artAndExprienceSchema = new mongoose.Schema(CategorieController.artandexprience()) 
// mongoose.plugin(timestamp);

const ArtAndExprience = mongoose.model("artandexpriensce", artAndExprienceSchema);


module.exports = ArtAndExprience;