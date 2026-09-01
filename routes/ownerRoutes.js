//set up signup and login routes to allow show owners to signup and login into account
const express = require("express")
const router = express.Router()
const controller = require("../controller/ownerController")
//routes to get owner information
router.get("/profile", controller.getuserInformation)

//update owner data

//delete owner data
router.delete("/profile/delete", controller.deleteUser)

module.exports = router
