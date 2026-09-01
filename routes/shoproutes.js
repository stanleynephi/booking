/**this routes is for owners part...
 *get the shop based on the owners id, delete, update and create new shops..
 *this is for the owners part of the webservice
 */

const express = require("express")
const router = express.Router()
const error = require("../utils/index")
const controller = require("../controller/shopcontroller")
const authenticate = require("../utils/middleware")
const validationRules = require("../utils/shopvalidation")

//get shop by id
router.get("/getshop", controller.getShopByOwnerID)

// //post to add new shope data to the system
// router.post(
//   "/newshop",
//   validationRules.createShops(),
//   validationRules.validate,
//   controller.addNewShop,
// )

router.delete("/deleteshop", controller.deleteShop)

//export the router module to the index.js
module.exports = router
