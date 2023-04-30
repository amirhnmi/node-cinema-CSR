const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const CategorieController = require("../categorie_controller");

const screeningSchema = new mongoose.Schema(CategorieController.screening())
// mongoose.plugin(timestamp);

const Screening = mongoose.model("screening", screeningSchema);

module.exports = Screening;