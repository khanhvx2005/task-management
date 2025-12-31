const Task = require("../models/tasks.model")
const paginationHeplers = require("../../../helpers/pagination.helpers")
// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    let initPagination = {
        currentPage: 1,
        limitItems: 2
    }

    const countDocument = await Task.countDocuments(find);
    const objPagination = paginationHeplers(initPagination, req.query, countDocument)

    // end logic phân trang
    const sort = {

    }
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    const tasks = await Task.find(find).sort(sort).skip(objPagination.skip).limit(objPagination.limitItems)
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