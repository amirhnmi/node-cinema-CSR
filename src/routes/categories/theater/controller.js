const controller = require("../../controller");
const mongoose = require("mongoose");
const multer = require("multer")
const upload = require("../../../upload/theaterUploadFile")

module.exports = new (class extends controller{

    async gettheater(req,res){
        const theater_movies = await this.Theater.find()
        this.response({
            res, message: "ok", data: theater_movies
        })
    }

    async getonetheater(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res,code:400 ,message: "آی دی نامعتبر است"
            })
        }
        const theater_movie = await this.Theater.findById(req.params.id)

        if(!theater_movie){
            return this.response({
                res, code:404, message: "فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message:"ok", data:theater_movie
        })

    }

    async posttheater(req,res){
        const { movie_name, title, description, image ,director, actors, producer, production_date, release_date } = req.body;
        let newtheater_movie= await this.Theater({
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

        newtheater_movie = await newtheater_movie.save()

        this.response({
            res, message:"ok", data:newtheater_movie
        })

    }

    async theaterimageupload(req,res){
        upload(req,res, (err)=>{
            if(err instanceof multer.MulterError){
                return res.status(500).json(err)
            }else if(err){
                return res.status(500).json(err)
            }

            return res.status(200).json(req.file)
        })
    }

    async puttheater(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message:"آی دی نامعتبر است"
            })
        }

        const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body
        const theater_movie=await this.Theater.findByIdAndUpdate(req.params.id, {
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

        if(!theater_movie){
            return this.response({
                res, code:400, message: "فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message: "ok", data:theater_movie
        })

    }

    async deletetheater(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message:"آی دی نامعتبر است"
            })
        }

        const theater_movie = await this.Theater.findByIdAndRemove(req.params.id)

        if(!theater_movie){
            return this.response({
                res, code:404, message:"فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message: "ok", data: theater_movie
        })

    }

})();