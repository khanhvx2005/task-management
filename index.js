const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')

require("dotenv").config();
const database = require("./config/database.config")
database.connect()
const app = express()
app.use(cors())

const port = process.env.PORT
app.use(bodyParser.json())

const routesApiVer1 = require("./api/v1/routes/index.route")
routesApiVer1(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
