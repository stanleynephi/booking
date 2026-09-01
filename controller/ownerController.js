//this is the controller to handle the owner contents and information
/**handles getting shops belonging to the owner with the id provided from the session
 *get the user information in the database based on the id provided during the authentication
 */
const model = require("../model/ownerModel")

//get user information based on the user id
async function getuserInformation(req, res) {
  //trycatch for error handling
  try {
    //get user id from session
    const owner_id = req.owner.id
    if (!owner_id) {
      throw new Error("no owner id provided for referencing")
    }
    const userdata = await model.userinformation(owner_id)

    //check if there is data returned and then process the data returned...
    if (!userdata || userdata.length === 0) {
      return res.status(404).json({ error: "No user found under provided id" })
    }

    res.json(userdata)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user informations",
    })
  }
}

async function deleteUser(req, res) {
  try {
    //get the user id from the session
    const owner_id = req.owner.id

    if (!owner_id) {
      throw new Error("no user id provided for referencing")
    }

    const deleteUserInformation = await model.deleteclient(owner_id)

    //if the user deletes works then go ahead and delete the auth
    if (!deleteUserInformation) {
      //go ahead and delete the auth
      return res.status(404).json({ error: "Owner not found" })
    }

    await model.authdeletion(owner_id)

    res.clearCookie("sb-access-token")
    res.clearCookie("sb-refresh-token")

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getuserInformation,
  deleteUser,
}
