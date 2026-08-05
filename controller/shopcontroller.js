//controller to estabalish database connection and send data to and from the database
const database = require("../database/supabaseClient")
const model = require("../model/shopmodel")

//controller get all shops
async function getAllShop(req, res) {
  try {
    //make the database query to the model..
    const shops = await model.shopinformation()

    //check the length of the data returned and handle the error
    if (shops.length === 0) {
      return res.status(404).json({
        message: "No shops found",
      })
    }

    //else return data in json format
    return res.status(200).json({
      success: true,
      data: shops,
    })
  } catch (error) {
    //return the error
    console.log(error)

    res.status(500).json({
      success: false,
      message: "Failed to retrieve shop information.",
    })
  }
}

//controller to get the shops based on the id
async function getShopById(req, res, next) {
  //try catch request to handle errors based when getting the shop id
  try {
    //get the shop id
    const shopID = req.params.id
    //pass the id to the shop model to get the information about the specific shop
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
}

module.exports = { getAllShop }
