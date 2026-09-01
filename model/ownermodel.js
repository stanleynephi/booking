//create database connection and query database query..
/**get user information based on id. this will get the user information from the user table in the database */
const supabaseAdmin = require("../database/supabaseAdmin")
const supabase = require("../database/supabaseClient")
const clientmodel = {}

//get the user infomation based on the owner id
clientmodel.userinformation = async function (id) {
  try {
    //select every information from the database where the owner_id == id provided
    const { data, error } = await supabase
      .from("shop_owners")
      .select("*")
      .eq("id", id)

    if (error) {
      //throw or return error if there are any errors hit
      throw new Error(`Failed to retrieve user infromation:${error.message}`)
    }

    //if there are no data or information return nothing
    if (!data || data.length === 0) {
      return []
    }

    return data
  } catch (error) {
    throw error
  }
}

//delete the owners account and the shops details
clientmodel.deleteclient = async function (id) {
  //delete all shops in the database where the id is equal to the user id provided
  const { error: dbError } = await supabase
    .from("shops_owners")
    .delete()
    .eq("id", id)

  if (dbError) throw dbError

  return data && data.length > 0
}

//delete the user authentication from the supabase authentication process
clientmodel.authdeletion = async function (id) {
  //delete the authentication information from the database
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id)

  if (authError) throw authError

  return true
}

module.exports = clientmodel
