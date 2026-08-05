//index this file gets all the available shops and clients

const express = require("express")
const router = express.Router()
const error = require("../utils/index")
const controller = require("../controller/shopcontroller")

//router.get.. fetch all the shop data from the data
router.get("/allshops", controller.getAllShop)

//get shop by id
router.get("/getshop/:id", (req, res) => {
  res.send("this get method gets all shop data based on the id provided")
})

//post to add new shope data to the system
router.post("/newshop", (req, res) => {
  res.send("adds new shop and shop data to the database")
})
//export the router module to the index.js
module.exports = router
