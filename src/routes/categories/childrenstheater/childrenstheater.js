const express = require("express");
const router = express.Router()

const controller = require("./controller");
const validation = require("./validation");

router.get("/",
    controller.getchildrenstheater
)

router.get("/:id",
    controller.getonechildrenstheater
)

router.post("/",
    validation.childrenstheaterValidator(),
    controller.validate,
    controller.postchildrenstheater
)

router.post("/upload",
    controller.childrenstheaterimageupload
)

router.put("/:id",
    validation.childrenstheaterValidator(),
    controller.validate,
    controller.putchildrenstheater
)

router.delete("/:id",
    controller.deletechildrenstheater
)

module.exports = router;