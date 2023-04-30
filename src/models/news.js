const mongoose = require("mongoose")

const newsSchema= new mongoose.Schema({
    title: {type:String, required:true},
    image: {type:String, required:true},
    description: {type:String, required:true},
    news_text: {type:String, required:true},
    author: {type:String, require: true},
    news_date: {type:String, required:true},
    publish_date: {type:String,required:true}, 
})

const News = mongoose.model("News", newsSchema);

module.exports = News