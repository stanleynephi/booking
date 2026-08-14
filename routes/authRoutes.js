//get the controller function from the authController and then assign them to routes
const express = require("express")
const controller = require("../controller/authController")
const router = express.Router()

//get router
router.get("/google", controller.googleLogin)
router.get("/callback", controller.oauthCallback)

module.exports = router
