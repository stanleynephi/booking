//database query.. Get all data from the database
const supabase = require("../database/supabaseClient")
const shopmodel = {}

//read data from the shop database
shopmodel.shopinformation = async function () {
  const { data, error } = await supabase.from("shops").select("*")

  console.log("Supabase data:", data)
  console.log("Supabase error:", error)

  if (error) {
    console.error("Supabase error:", error.message)
    throw error
  }

  if (!data || data.length === 0) {
    console.log("No data returned")
    return []
  }

  return data
}

//read shop data based on the shop id provided
shopmodel.shopinformationID = async function (id) {
  try {
    const { data, error } = await supabase
      .from("shops")
      .select("*")
      .eq("id", id)
      .single()

    //error handler

    if (error) {
      //return error in a more secure way not console log
      throw new Error(`Failed to retrieve shop information: ${error.message}`)
    }

    //returned data error
    if (!data || data.length === 0) {
      return []
    }

    return data
  } catch (error) {
    throw error
  }
}

//add new shop data to database mode
shopmodel.addnewshop = async function (shopData) {
  try {
    //get the needed data and pass it to the database for it to be saved
    const { owner_id, slug, name, category, description, location, phone } =
      shopData
    //pass the data to the database and check for errors if any.
    const { data, error } = await supabase
      .from("shops")
      .insert([
        { owner_id, slug, name, category, description, location, phone },
      ])
      .select()

    //error handler for database query
    if (error) throw error
    return data[0]
  } catch (error) {
    throw new Error(`Failed database query: ${error.message}`)
  }
}

//module e
module.exports = shopmodel
