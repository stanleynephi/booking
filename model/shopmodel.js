//database query.. Get all data from the database
const supabase = require("../database/supabaseClient")
const shopmodel = {}

//create the slugify function.. takes the name of the company, trips all the spaces and return the data
function slugify(name) {
  //return the name all the spaces are stripped
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

//create a unique slug that does not exist in the database..
async function uniqueSlug(baseSlug) {
  let slug = baseSlug
  let counter = 1

  //make a databae query to get the shops that has the same name as the slug..
  while (true) {
    const { data } = await supabase
      .from("shops")
      .select("id")
      .eq("slug", slug)
      .maybeSingle()

    //error handler to check if there are such slugs in the data...
    if (!data) return slug
    slug = `${baseSlug}-${counter}`
    counter++
  }
}

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
    const { owner_id, name, category, description, location, phone } = shopData
    //create the slug based on the name given
    const baseSlug = slugify(name)
    const slug = await uniqueSlug(baseSlug)
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

//get the shops data using the owner id provided
shopmodel.getshopbyOwner_ID = async function (ownerID) {
  try {
    //pass the ownerID as the parameter to query the shop database to find shops owned by a company
    const { data, error } = await supabase
      .from("shops")
      .select("*")
      .eq("owner_id", ownerID)
      .single()

    //error handler
    if (error) {
      //handle the error thrown in the database
      throw new Error(`Failed to retrieve shop information: ${error.message}`)
    }

    if (!data || data.length === 0) {
      return []
    }

    return data
  } catch (error) {
    throw error
  }
}

//delete shop data from the database
shopmodel.deleteShop = async function (id, ownerID) {
  try {
    //delete the shop data from the database based on the shop id provided..
    const { data, error } = await supabase
      .from("shops")
      .delete()
      .eq("id", id)
      .eq("owner_id", ownerID)
      .select()

    //error handler
    if (error) throw error

    //nothing matched — either the shop doesn't exist or isn't owned by this user
    if (!data || data.length === 0) {
      return null
    }

    return data[0]
  } catch (error) {
    throw error
  }
}

//module export
shop.module.exports = shopmodel
