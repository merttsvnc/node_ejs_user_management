require("dotenv").config()
const express = require("express")
const expressLayout = require("express-ejs-layouts")
const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// Static file
app.use(express.static("public") )

// Template engine
app.use(expressLayout)
app.set("layout", "./layouts/main")
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.send("Hello world")
})

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()