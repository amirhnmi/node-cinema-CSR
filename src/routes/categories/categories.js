const express = require("express");
const router = express.Router();
const artandexprienceRouter = require("./artandexprience/artAndExprience.js");
const childrenstheaterRouter = require("./childrenstheater/childrenstheater.js");
const comedytheaterRouter = require("./comedytheater/comedytheater.js");
const screeningRouter = require("./screening/screening.js");
const theaterRouter = require("./theater/theater.js");

router.use("/artandexprience", artandexprienceRouter);
router.use("/childrenstheater", childrenstheaterRouter);
router.use("/comedytheater", comedytheaterRouter);
router.use("/screening", screeningRouter);
router.use("/theater", theaterRouter);


module.exports = router;