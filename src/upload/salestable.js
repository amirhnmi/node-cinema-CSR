const multer= require("multer");
const mkdir = require("mkdirp")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    mkdir('./public/uploads/salestable').then(made=>{
        cb(null, './public/uploads/salestable')
    })
    
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage }).single("image")

module.exports= upload;