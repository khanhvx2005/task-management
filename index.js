const express = require('express')
require("dotenv").config();
const database = require("./config/database.config")
database.connect()
const app = express()
const port = process.env.PORT
const route = require("./api/v1/routes/index.route")
route(app)

// app.get('/tasks/detail/:id', async (req, res) => {
//     const task = await Task.findOne({
//         _id: req.params.id,
//         deleted: false
//     })
//     res.json(task)
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
