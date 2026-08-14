require("dotenv").config()

const supabase = require("./database/supabaseClient")

async function test() {
  const { data, error } = await supabase.from("shops").select("*")

  console.log("DATA:", data)
  console.log("ERROR:", error)
}

test()
