const express = require("express");
const router = express.Router()

const controller = require("./controller");

router.post("/usertoken",
    controller.usertoken
)

module.exports = router;