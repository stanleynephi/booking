//index this file gets all the available shops and clients

const express = require("express")
const router = express.Router()

//router.get.. fetch all the shop data from the data
router.get("/all", (req, res) => {
  res.send(
    "This is the get all router getting all the data from the api about all the avaiable shops",
  )
})

router.get("/signup", (req, res) => {
  res.send(
    "this post method is intended to help new shop and services signup to our platform",
  )
})

module.exports = router
