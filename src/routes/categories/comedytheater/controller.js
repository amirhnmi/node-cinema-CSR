const mongoose = require("mongoose")
const controller = require("../../controller");
const multer= require("multer");
const upload = require("../../../upload/comedyTheaterUploadFile")

module.exports = new (class extends controller{

    async getcomedytheater(req,res){
        const comedytheater_movies = await this.ComedyTheater.find()
        this.response({
            res, message: "ok", data: comedytheater_movies
        })
    }

    async getonecomedytheater(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res,code:400 ,message: "آی دی نامعتبر است"
            })
        }
        const comedytheater_movie = await this.ComedyTheater.findById(req.params.id)

        if(!comedytheater_movie){
            return this.response({
                res, code:404, message: "فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message:"ok", data:comedytheater_movie
        })

    }

    async postcomedytheater(req,res){
        const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
        let newcomedytheater_movie= await this.ComedyTheater({
            movie_name,
            title,
            description,
            image,
            director,
            actors,
            producer,
            production_date,
            release_date
        })

        newcomedytheater_movie = await newcomedytheater_movie.save()

        this.response({
            res, message:"ok", data:newcomedytheater_movie
        })

    }

    async comedytheaterimageupload(req,res){
        upload(req,res, (err)=>{
            if(err instanceof multer.MulterError){
                return res.status(500).json(err)
            }else if(err){
                return res.status(500).json(err)
            }

            return res.status(200).json(req.file)
        })
    }

    async putcomedytheater(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message:"آی دی نامعتبر است"
            })
        }

        const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body
        const comedytheater_movie=await this.ComedyTheater.findByIdAndUpdate(req.params.id, {
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

        if(!comedytheater_movie){
            return this.response({
                res, code:400, message: "فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message: "ok", data:comedytheater_movie
        })

    }

    async deletecomedytheater(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message:"آی دی نامعتبر است"
            })
        }

        const comedytheater_movie = await this.ComedyTheater.findByIdAndRemove(req.params.id)

        if(!comedytheater_movie){
            return this.response({
                res, code:404, message:"فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message: "ok", data: comedytheater_movie
        })

    }


})();