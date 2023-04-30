const controller = require("../../controller");
const mongoose = require("mongoose")
const multer= require("multer");
const upload = require("../../../upload/screeningUploadFile")

module.exports = new (class extends controller{

    async getscreening(req,res){
        const screening_movies = await this.Screening.find()
        this.response({
            res, message: "ok", data: screening_movies
        })
    }

    async getonescreening(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res,code:400 ,message: "آی دی نامعتبر است"
            })
        }
        const screening_movie = await this.Screening.findById(req.params.id)

        if(!screening_movie){
            return this.response({
                res, code:404, message: "فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message:"ok", data:screening_movie
        })

    }

    async postscreening(req,res){
        const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
        let newscreening_movie= await this.Screening({
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

        newscreening_movie = await newscreening_movie.save()

        this.response({
            res, message:"ok", data:newscreening_movie
        })

    }

    async screeningimageupload(req,res){
        upload(req,res, (err)=>{
            if(err instanceof multer.MulterError){
                return res.status(500).json(err)
            }else if(err){
                return res.status(500).json(err)
            }

            return res.status(200).json(req.file)
        })
    }

    async putscreening(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message:"آی دی نامعتبر است"
            })
        }

        const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body
        const screening_movie=await this.Screening.findByIdAndUpdate(req.params.id, {
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

        if(!screening_movie){
            return this.response({
                res, code:400, message: "فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message: "ok", data:screening_movie
        })

    }

    async deletescreening(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message:"آی دی نامعتبر است"
            })
        }

        const screening_movie = await this.Screening.findByIdAndRemove(req.params.id)

        if(!screening_movie){
            return this.response({
                res, code:404, message:"فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message: "ok", data: screening_movie
        })

    }

})();