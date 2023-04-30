const mongoose = require("mongoose");

const satetableSchema= new mongoose.Schema({
    movie_name : {type:String, required:true},
    director: {type:String, required:true},
    image: {type:String, required:true},
    price: {type:String, required:true},
    last_update: {type:String, required:true}
})

const SalesTable = mongoose.model("salestable", satetableSchema)

module.exports = SalesTable;