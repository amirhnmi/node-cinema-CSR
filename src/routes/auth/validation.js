const {check} = require("express-validator");

module.exports = new class {

    registerValidator(){
        return [
            check("email").isEmail().withMessage("ایمیل نادرست است"),
            check("username").notEmpty().withMessage("نام کاربری نمی تواند خالی باشد"),
            check("phone_number").notEmpty().withMessage("شماره تماس نمی تواند خالی باشد"),
            check("phone_number").notEmpty().withMessage("شماره تماس نمی تواند خالی باشد"),
            check("password").notEmpty().withMessage("کلمه عبور نمی تواند خالی باشد"),
        ]
    }

    loginValidator(){
        return [
            check("email").isEmail().withMessage("ایمیل نادرست است"),
            check("password").notEmpty().withMessage("کلمه عبور نمیتواند خالی باشد")
        ]
    }
};