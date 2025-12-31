const Task = require("../models/tasks.model")
// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    const sort = {

    }
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    const tasks = await Task.find(find).sort(sort)
    res.json(tasks)
}
// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            deleted: false
        })
        res.json(task)
    } catch (error) {
        res.json("Không tìm thấy")
    }

}