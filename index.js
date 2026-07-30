//set up the application index page
require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT

//import the router and then test it
const routes = require("./routes/routes")

//start the application home page
app.get("/", (req, res) => {
  res.send("This is the homepage of the api we are building..")
})

//start the first application routes to the shops
app.use("/shops", routes)

app.listen(port, () => {
  console.log(`Application is running on Port, ${port}`)
})
