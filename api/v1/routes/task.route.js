const express = require("express")
const router = express.Router()
const controller = require("../controllers/task.controller")
router.get('/tasks', controller.index)
router.get('/tasks/detail/:id', controller.detail)
module.exports = router;