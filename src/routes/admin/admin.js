const express = require("express");
const router = express.Router()

const controller = require("./controller");

router.post("/dashboard",
    controller.dashboard
)

module.exports = router;