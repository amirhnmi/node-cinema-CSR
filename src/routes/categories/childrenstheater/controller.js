const { default: mongoose } = require("mongoose");
const controller = require("../../controller");
const multer= require("multer");
const upload = require("../../../upload/childrensTheaterUploadFile")

module.exports = new (class extends controller{

    async getchildrenstheater(req,res){
        const childrenstheater_movies = await this.ChildrensTheater.find()
        this.response({
            res, message: "ok", data: childrenstheater_movies
        })
    }

    async getonechildrenstheater(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res,code:400 ,message: "آی دی نامعتبر است"
            })
        }
        const childrenstheater_movie = await this.ChildrensTheater.findById(req.params.id)

        if(!childrenstheater_movie){
            return this.response({
                res, code:404, message: "فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message:"ok", data:childrenstheater_movie
        })

    }

    async postchildrenstheater(req,res){
        const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body;
        let newchildrenstheater_movie= await this.ChildrensTheater({
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

        newchildrenstheater_movie = await newchildrenstheater_movie.save()

        this.response({
            res, message:"ok", data:newchildrenstheater_movie
        })

    }

    async childrenstheaterimageupload(req,res){
        upload(req,res, (err)=>{
            if(err instanceof multer.MulterError){
                return res.status(500).json(err)
            }else if(err){
                return res.status(500).json(err)
            }

            return res.status(200).json(req.file)
        })
    }


    async putchildrenstheater(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message:"آی دی نامعتبر است"
            })
        }

        const { movie_name, title, description, image, director, actors, producer, production_date, release_date } = req.body
        const childrenstheater_movie=await this.ChildrensTheater.findByIdAndUpdate(req.params.id, {
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

        if(!childrenstheater_movie){
            return this.response({
                res, code:400, message: "فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message: "ok", data:childrenstheater_movie
        })

    }

    async deletechildrenstheater(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message:"آی دی نامعتبر است"
            })
        }

        const childrenstheater_movie = await this.ChildrensTheater.findByIdAndRemove(req.params.id)

        if(!childrenstheater_movie){
            return this.response({
                res, code:404, message:"فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message: "ok", data: childrenstheater_movie
        })

    }


})();