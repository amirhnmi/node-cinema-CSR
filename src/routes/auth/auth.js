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

module.exports = router;