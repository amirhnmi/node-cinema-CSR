const express = require("express");
const router = express.Router()

const controller = require("./controller");
const validation = require("./validation");


router.get("/",
    controller.gettheater
)

router.get("/:id",
    controller.getonetheater
)

router.post("/",
    validation.theaterValidator(),
    controller.validate,
    controller.posttheater
)
router.post("/upload",
    controller.theaterimageupload
)

router.put("/:id",
    validation.theaterValidator(),
    controller.validate,
    controller.puttheater
)

router.delete("/:id",
    controller.deletetheater
)

module.exports = router;