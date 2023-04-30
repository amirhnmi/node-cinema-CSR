const express = require("express");
const router = express.Router()

const controller = require("./controller");
const validation = require("./validation");

router.get("/",
    controller.getnews
)

router.get("/:id",
    controller.getonenews
)

router.post("/",
    validation.newsValidator(),
    controller.validate,
    controller.postnews
)
router.post("/upload",
    controller.newsimageupload
)

router.put("/:id",
    validation.newsValidator(),
    controller.validate,
    controller.putnews
)

router.delete("/:id",
    controller.deletenews
)

module.exports = router;