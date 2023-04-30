const express = require("express");
const router = express.Router()

const controller = require("./controller");
const validation = require("./validation");

router.get("/",
    controller.getcomedytheater
)

router.get("/:id",
    controller.getonecomedytheater
)

router.post("/",
    validation.comedytheaterValidator(),
    controller.validate,
    controller.postcomedytheater
)
router.post("/upload",
    controller.comedytheaterimageupload
)

router.put("/:id",
    validation.comedytheaterValidator(),
    controller.validate,
    controller.putcomedytheater
)

router.delete("/:id",
    controller.deletecomedytheater
)

module.exports = router;