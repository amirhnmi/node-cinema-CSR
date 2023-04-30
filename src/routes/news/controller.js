const controller = require("../controller");
const mongoose = require("mongoose");
const multer= require("multer");
const upload = require("../../upload/news")

module.exports = new (class extends controller{

    async getnews(req,res){
        const news = await this.News.find()
        this.response({
            res, message: "ok", data: news
        })
    }

    async getonenews(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res,code:400 ,message: "آی دی نامعتبر است"
            })
        }
        const news = await this.News.findById(req.params.id)

        if(!news){
            return this.response({
                res, code:404, message: "خبری با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message:"ok", data:news
        })

    }

    async postnews(req,res){
        const {title, description,news_text, image, author, news_date, publish_date} = req.body;
        let newnews= await this.News({
            title,
            description,
            news_text,
            image,
            author,
            news_date,
            publish_date
        })

        newnews = await newnews.save()

        this.response({
            res, message:"ok", data:newnews
        })

    }
    async newsimageupload(req,res){
        upload(req,res, (err)=>{
            if(err instanceof multer.MulterError){
                return res.status(500).json(err)
            }else if(err){
                return res.status(500).json(err)
            }

            return res.status(200).json(req.file)
        })
    }

    async putnews(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message:"آی دی نامعتبر است"
            })
        }

        const {title, description,news_text, image, author, news_date, publish_date} = req.body;        
        const news=await this.News.findByIdAndUpdate(req.params.id, {
            title,
            description,
            news_text,
            image,
            author,
            news_date,
            publish_date
        },{new: true});

        if(!news){
            return this.response({
                res, code:400, message: "خبری با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message: "ok", data:news
        })

    }

    async deletenews(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message:"آی دی نامعتبر است"
            })
        }

        const news = await this.News.findByIdAndRemove(req.params.id)

        if(!news){
            return this.response({
                res, code:404, message:"خبری با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message: "ok", data:news
        })

    }

})();