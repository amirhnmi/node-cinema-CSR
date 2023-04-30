const controller = require("../controller");
const mongoose = require("mongoose")
const multer = require("multer")
const upload = require("../../upload/salestable")

module.exports = new (class extends controller{

    async getsalestable(req,res){
        const tsalestable = await this.SalesTable.find()
        this.response({
            res, message: "ok", data: tsalestable
        })
    }

    async getonesalestable(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res,code:400 ,message: "آی دی نامعتبر است"
            })
        }
        const salestable = await this.SalesTable.findById(req.params.id)

        if(!salestable){
            return this.response({
                res, code:404, message: "فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message:"ok", data:salestable
        })

    }

    async postsalestable(req,res){
        const { movie_name,image, director, last_update, price} = req.body;        
        let newsalestable= await this.SalesTable({
            movie_name,
            image,
            director,
            price,
            last_update,
        })

        newsalestable = await newsalestable.save()

        this.response({
            res, message:"ok", data:newsalestable
        })

    }
    async salestableimageupload(req,res){
        upload(req,res, (err)=>{
            if(err instanceof multer.MulterError){
                return res.status(500).json(err)
            }else if(err){
                return res.status(500).json(err)
            }

            return res.status(200).json(req.file)
        })
    }

    async putsalestable(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message:"آی دی نامعتبر است"
            })
        }

        const { movie_name,image, director, last_update, price} = req.body
        const salestable=await this.SalesTable.findByIdAndUpdate(req.params.id, {
            movie_name,
            director,
            image,
            price,
            last_update,
        },{new: true});

        if(!salestable){
            return this.response({
                res, code:400, message: "فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message: "ok", data:salestable
        })

    }

    async deletesalestable(req,res){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return this.response({
                res, code:400, message:"آی دی نامعتبر است"
            })
        }

        const salestable = await this.SalesTable.findByIdAndRemove(req.params.id)

        if(!salestable){
            return this.response({
                res, code:404, message:"فیلمی با این آی دی یافت نشد"
            })
        }

        this.response({
            res, message: "ok", data: salestable
        })

    }

})();