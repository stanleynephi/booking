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

module.exports = shopmodel
