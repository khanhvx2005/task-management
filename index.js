const express = require('express')
const bodyParser = require('body-parser')

require("dotenv").config();
const database = require("./config/database.config")
database.connect()
const app = express()
const port = process.env.PORT
app.use(bodyParser.json())

const route = require("./api/v1/routes/index.route")
route(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
