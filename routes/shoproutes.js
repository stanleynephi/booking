//index this file gets all the available shops and clients

const express = require("express")
const router = express.Router()
const error = require("../utils/index")
const controller = require("../controller/shopcontroller")
const authenticate = require("../utils/middleware")

//router.get.. fetch all the shop data from the data
//prorcess.. when route is hit, firt check if authenticated before hiting the controller
router.get("/allshops", authenticate.requireAuth, controller.getAllShop)

//get shop by id
router.get("/getshop/:id", controller.getShopById)

//post to add new shope data to the system
router.post("/newshop", (req, res) => {
  res.send("adds new shop and shop data to the database")
})
//export the router module to the index.js
module.exports = router
