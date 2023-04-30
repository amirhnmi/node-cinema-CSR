const autoBind= require("auto-bind")
const {validationResult} = require("express-validator");

const User = require("../models/user")

const ArtAndExprience = require("../models/categories/categorie/artAndExprience");
const ChildrensTheater = require("../models/categories/categorie/childrensTheater");
const ComedyTheater = require("../models/categories/categorie/comedyTheater")
const Screening = require("../models/categories/categorie/screening")
const Theater = require("../models/categories/categorie/theater")

const News = require("../models/news")
const SalesTable = require("../models/salestable")

module.exports = class {
    constructor(){
        autoBind(this)
        this.User = User;

        this.ArtAndExprience = ArtAndExprience;
        this.ChildrensTheater = ChildrensTheater;
        this.ComedyTheater = ComedyTheater;
        this.Screening = Screening;
        this.Theater = Theater;

        this.News = News;
        this.SalesTable = SalesTable;

    }

    validationBody(req,res){
        const result = validationResult(req)
        if(!result.isEmpty()){
            const errors= result.array();
            const messages= [];
            errors.forEach((err)=> messages.push(err.msg))
            res.status(400).json({
                message: "validation error",
                data: messages
            })
            return false;
        }
        return true;
    }

    validate(req,res,next){
        if(!this.validationBody(req,res)){
            return;
        }
        next();
    }

    response({res,message,code=200,data={}}){
        res.status(code).json({
            message: message,
            data : data
        });
    }
}