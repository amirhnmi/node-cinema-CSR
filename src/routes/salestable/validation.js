const {check} = require("express-validator");

module.exports = new class {

    salestableValidator(){
        return [
            check("movie_name").notEmpty().withMessage("نام فیلم نمیتواند خالی باشد"),
            check("director").notEmpty().withMessage("نام کارگردان نمی تواند خالی باشد"),
            check("price").notEmpty().withMessage("مبلغ فروش نمیتواند خالی باشد"),
            check("last_update").notEmpty().withMessage("اخرین بروزرسانی نمی تواند خالی باشد"),

        ]
    }
};