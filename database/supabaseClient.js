//set up the database connection client using supabase
require("dotenv").config()

const { createClient } = require("@supabase/supabase-js")

//create the client connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
)

module.exports = supabase
