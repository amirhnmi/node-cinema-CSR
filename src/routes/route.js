const express = require("express");
const router = express.Router()

const authRouter = require("./auth/auth.js")
const userRouter= require("./user/user.js")
const adminRouter= require("./admin/admin.js")
const categoriesRouter= require("./categories/categories")
const newsRouter= require("./news/news")
const salestableRouter= require("./salestable/salestable")

const {isLoggedIn, isAdmin }= require("../middleware/auth");
const error = require("../middleware/error")



router.use("/auth", authRouter);
router.use("/user",isLoggedIn ,userRouter);
router.use("/admin",isLoggedIn, isAdmin ,adminRouter);
router.use("/categories", categoriesRouter)
router.use("/news", newsRouter)
router.use("/salestable", salestableRouter)

router.use(error)

module.exports = router;