const express = require("express");
const router = express.Router()

const controller = require("./controller");
const validation = require("./validation");

router.post("/register",
    validation.registerValidator(),
    controller.validate,
    controller.register
)

router.post(
    "/login",
    validation.loginValidator(),
    controller.validate,
    controller.login
)

router.post(
    "/forget_password",
    validation.forgetPasswordValidator(),
    controller.validate,
    controller.forgetPassword
)

router.post(
    "/password_reset",
    validation.passwordResetValidator(),
    controller.validate,
    controller.passwordReset
)

module.exports = router;