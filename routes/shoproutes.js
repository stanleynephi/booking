//index this file gets all the available shops and clients

const express = require("express")
const router = express.Router()
const error = require("../utils/index")
const controller = require("../controller/shopcontroller")
const authenticate = require("../utils/middleware")
const validationRules = require("../utils/shopvalidation")

//router.get.. fetch all the shop data from the data
//prorcess.. when route is hit, firt check if authenticated before hiting the controller
router.get("/allshops", authenticate.requireAuth, controller.getAllShop)

//get shop by id
router.get("/getshop/:id", authenticate.requireAuth, controller.getShopById)

//post to add new shope data to the system
//update this route late to allow users with owners status or admin status can add new shops or delete shops from the system
router.post(
  "/newshop",
  authenticate.requireAuth,
  validationRules.createShops(),
  validataionRules.validate,
  controller.addNewShop,
)

//export the router module to the index.js
module.exports = router
