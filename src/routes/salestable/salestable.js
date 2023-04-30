const express = require("express");
const router = express.Router()

const controller = require("./controller");
const validation = require("./validation");

router.get("/",
    controller.getsalestable
)

router.get("/:id",
    controller.getonesalestable
)

router.post("/",
    validation.salestableValidator(),
    controller.validate,
    controller.postsalestable
)
router.post("/upload",
    controller.salestableimageupload
)

router.put("/:id",
    validation.salestableValidator(),
    controller.validate,
    controller.putsalestable
)

router.delete("/:id",
    controller.deletesalestable
)

module.exports = router;