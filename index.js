//set up the application index page
require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT
const cookieParser = require("cookie-parser")
const authenticate = require("./utils/middleware")

//import the router and then test it
const routes = require("./routes/shoproutes")
const loginroutes = require("./routes/authRoutes")
const ownerroutes = require("./routes/ownerRoutes")

app.use(express.json())
// Parse HTML form submissions
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

//start the application home page...
app.get("/", async (req, res) => {
  res.send("This is the backend service for booking")
})

//start the first application routes to the shops
app.use("/api/auth", loginroutes)
app.use("/shops", authenticate.requireAuth, routes)
app.use("/owner", authenticate.requireAuth, ownerroutes)

app.listen(port, () => {
  console.log(`Application is running on Port, ${port}`)
})
