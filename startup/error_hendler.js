require("express-async-errors")
const winston = require("winston");

module.exports = function (){
    process.on("uncaughtException",(ex)=>{
        console.log("uncaughtException");
        winston.error(ex.message, ex)
        process.exit(1)
    });
    process.on("unhandledRejection",(ex)=>{
        console.log("unhandledRejection");
        winston.error(ex.message, ex)
        process.exit(1)
    });
    
    winston.add(new winston.transports.File({filename: "logfile.log"}))
}