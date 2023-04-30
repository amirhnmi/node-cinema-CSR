const {check} = require("express-validator");

module.exports = new class {

    newsValidator(){
        return [
            check("title").notEmpty().withMessage("عنوان نمی تواند خالی باشد"),
            check("description").notEmpty().withMessage("توضیحات نمیتواند خالی باشد"),
            check("image").notEmpty().withMessage("تصویر نمی تواند خالی باشد"),
            check("news_date").notEmpty().withMessage("تاریخ خبر نمی تواند خالی باشد"),
            check("news_text").notEmpty().withMessage("متن خبر نمی تواند خالی باشد"),
            check("author").notEmpty().withMessage("نام نویسنده نمی تواند خالی باشد"),
            check("publish_date").notEmpty().withMessage("تاریخ انتشار خبر نمی تواند خالی باشد"),
        ]
    }
};
