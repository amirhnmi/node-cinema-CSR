const express = require("express");
const router = express.Router()

const controller = require("./controller");
const validation = require("./validation");

router.get("/",
    controller.getscreening
)

router.get("/:id",
    controller.getonescreening
)

router.post("/",
    validation.screeningValidator(),
    controller.validate,
    controller.postscreening
)
router.post("/upload",
    controller.screeningimageupload
)

router.put("/:id",
    validation.screeningValidator(),
    controller.validate,
    controller.putscreening
)

router.delete("/:id",
    controller.deletescreening
)

module.exports = router;