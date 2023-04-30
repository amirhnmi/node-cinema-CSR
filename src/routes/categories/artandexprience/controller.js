const mongoose = require("mongoose")
const controller = require("../../controller");
const multer= require("multer");
const upload = require("../../../upload/artAndExprienceUploadFile")

module.exports = new (class extends controller {

    async getartandexprience(req, res) {
        const artandexprience_movies = await this.ArtAndExprience.find();
        this.response({
            res, message: "ok", data:artandexprience_movies
        })
    }

    async getoneartandexprience(req, res) {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message: "آی دی نامعتبر است"
            })
        }
        const artandexprience_movie= await this.ArtAndExprience.findById(req.params.id);

        if(!artandexprience_movie){
            return this.response({
                res, code:404,message: "فیلمی با این آی دی یافت نشد"
            })
        }
        
        this.response({
            res,
            data: artandexprience_movie,
            message: "ok"
        })
    }

    async postartandexprience(req, res) {
        const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body
        let newartandexprience_movie = new this.ArtAndExprience({
            movie_name,
            title,
            description,
            image,
            director,
            actors,
            producer,
            production_date,
            release_date,
        })

        newartandexprience_movie = await newartandexprience_movie.save();
        this.response({
            res,
            data: newartandexprience_movie,
            message: "ok"
        })
    }

    async artandexprienceimageupload(req,res){
        upload(req,res, (err)=>{
            if(err instanceof multer.MulterError){
                return res.status(500).json(err)
            }else if(err){
                return res.status(500).json(err)
            }

            return res.status(200).json(req.file)
        })
    }


    async putartandexprience(req, res) {
        
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message: "آی دی نامعتبر است"
            })
        }

        const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body
        const artandexprience_movie=await this.ArtAndExprience.findByIdAndUpdate(req.params.id, {
            movie_name,
            title,
            description,
            image,
            director,
            actors,
            producer,
            production_date,
            release_date,
        },{new: true});

        if(!artandexprience_movie){
            return this.response({
                res,code:404,
            message: "فیلمی با این آی دی یافت نشد"}
        )}

        this.response({
            res, data:artandexprience_movie, message:"ok"
        })
    }

    async deleteartandexprience(req, res) {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message: "آی دی نامعتبر است"
            })
        }
        const artandexprience_movie =await this.ArtAndExprience.findByIdAndRemove(req.params.id);

        if(!artandexprience_movie){
            return this.response({
                res,code:404,
            message: "فیلمی با این آی دی یافت نشد"}
        )}
        res.json({
            data: artandexprience_movie,
            message: "ok"
        })
    }

})();