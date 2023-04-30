const {check} = require("express-validator");

module.exports = new class {

    screeningValidator(){
        return [
            check("movie_name").notEmpty().withMessage("نام فیلم نمیتواند خالی باشد"),
            check("title").notEmpty().withMessage("عنوان نمی تواند خالی باشد"),
            check("description").notEmpty().withMessage("توضیحات نمیتواند خالی باشد"),
            check("image").notEmpty().withMessage("تصویر نمی تواند خالی باشد"),
            check("director").notEmpty().withMessage("نام کارگردان نمی تواند خالی باشد"),
            check("actors").notEmpty().withMessage("نام بازیگر/بازیگران نمی تواند خالی باشد"),
            check("producer").notEmpty().withMessage("نام تهیه کننده نمی تواند خالی باشد"),
            check("production_date").notEmpty().withMessage("تاریخ تولید نمی تواند خالی باشد"),
            check("release_date").notEmpty().withMessage("تاریخ اکران نمی تواند خالی باشد"),
        ]
    }
};