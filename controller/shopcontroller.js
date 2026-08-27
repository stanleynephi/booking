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
    res.status(500).json({
      success: false,
      message: "Failed to retrieve shop information.",
    })
  }
}

//controller to get the shops based on the id
async function getShopById(req, res) {
  //try catch request to handle errors based when getting the shop id
  try {
    //get the shop id
    const { id } = req.params
    //pass the id to the shop model to get the information about the specific shop
    const shop = await model.shopinformationID(id)
    //error handler for when there are not shops...
    if (!shop) return res.status(404).json({ error: "Shop not found" })
    //return the data in a json format
    res.json(shop)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve shop information.",
    })
  }
}

//controller to add new shop data to the database
async function addNewShop(req, res) {
  //try catch error handler
  try {
    //get the owners id to be passed
    const owner_id = req.owner.id
    //get the infromation to be passed from the forms
    const { name, category, description, location, phone } = req.body
    //put it together and then compile it to the shopData
    const shopData = {
      owner_id,
      name,
      category,
      description,
      location,
      phone,
    }
    //send data to the database to be processed.
    const shop = await model.addnewshop(shopData)
  } catch (error) {
    //return error in a more secure way not console log
    throw new Error(`Failed to retrieve shop information: ${error.message}`)
  }
}

//get the shop data based on the ownerid controller
async function getShopByOwnerID(req, res) {
  //try catch error handler
  try {
    //get the owner id from the session
    const owner_id = req.owner.id
    //passs this to the model allowing the database be queried based on the ownerid
    const shop = await model.getshopbyOwner_ID(owner_id)
    //condition to check of there is a shop or not.. if there is a shop returned process it in a json
    if (!shop || shop.length === 0)
      return res.status(404).json({ error: "Shop not found" })
    //return the data in a json format
    res.json(shop)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve shop informations",
    })
  }
}

//delete shop based on the shop id
async function deleteShop(req, res) {
  try {
    //get the shop id from the route
    const owner_id = req.owner.id
    const { id } = req.params
    //pass the shop id to the model
    const deleted = await model.deleteShop(id, owner_id)
    //check for deleted shops
    if (!deleted) {
      return res
        .status(404)
        .json({ error: "Shop not found or not owned by you" })
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete shop",
    })
  }
}

module.exports = {
  getAllShop,
  getShopById,
  addNewShop,
  getShopByOwnerID,
  deleteShop,
}
