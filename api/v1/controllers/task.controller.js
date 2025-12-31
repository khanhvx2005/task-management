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
    // Logic tìm kiếm

    let keyword = "";
    if (req.query.keyword) {
        keyword = req.query.keyword;
        const reg = new RegExp(req.query.keyword, "i");
        find.title = reg;
    }
    //End Logic tìm kiếm
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
// [PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        await Task.updateOne({ _id: id }, { status: status })
        res.json({
            code: 200,
            messeage: "Cập nhập thành công"
        })
    } catch (error) {
        res.json({
            code: 400,
            messeage: "Không tồn tại"
        })
    }

}