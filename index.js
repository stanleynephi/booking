//set up the application index page
require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT

//databse url to test the database connection
const supabase = require("./database/supabaseClient")

//import the router and then test it
const routes = require("./routes/routes")

//start the application home page
app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("shops").select("*")
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

//start the first application routes to the shops
app.use("/shops", routes)

app.listen(port, () => {
  console.log(`Application is running on Port, ${port}`)
})
