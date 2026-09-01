//set up admin rights... this allows to delete auth from supabase auth data
require("dotenv").config()
const { createClient } = require("@supabase/supabase-js")

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

module.exports = supabaseAdmin
