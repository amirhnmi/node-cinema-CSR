const express = require("express");
const router = express.Router()

const controller = require("./controller");
const validation = require("./validation");

router.get("/",
    controller.getartandexprience
)

router.get("/:id",
    controller.getoneartandexprience
)

router.post("/",
    validation.artandexprienceValidator(),
    controller.validate,
    controller.postartandexprience
)
router.post("/upload",
    controller.artandexprienceimageupload
)


router.put("/:id",
    validation.artandexprienceValidator(),
    controller.validate,
    controller.putartandexprience
)

router.delete("/:id",
    controller.deleteartandexprience
)

module.exports = router;