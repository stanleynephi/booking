// //controller to get the shops based on the id
// async function getShopById(req, res) {
//   //try catch request to handle errors based when getting the shop id
//   try {
//     //get the shop id
//     const { id } = req.params
//     //pass the id to the shop model to get the information about the specific shop
//     const shop = await model.shopinformationID(id)
//     //error handler for when there are not shops...
//     if (!shop) return res.status(404).json({ error: "Shop not found" })
//     //return the data in a json format
//     res.json(shop)
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve shop information.",
//     })
//   }
// }

// //controller get all shops
// async function getAllShop(req, res) {
//   try {
//     //make the database query to the model..
//     const shops = await model.shopinformation()

//     //check the length of the data returned and handle the error
//     if (shops.length === 0) {
//       return res.status(404).json({
//         message: "No shops found",
//       })
//     }

//     //else return data in json format
//     return res.status(200).json({
//       success: true,
//       data: shops,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to retrieve shop information.",
//     })
//   }
// }
