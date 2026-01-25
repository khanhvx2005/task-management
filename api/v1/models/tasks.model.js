const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema(
    {
        title: String,
        status: String,
        content: String,
        timeStart: Date,
        timeFinish: Date,
        createdBy: String,
        listUser: Array,
        taskParentId: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    }, { timestamps: true });
const Task = mongoose.model('Product', tasksSchema, "tasks");
module.exports = Task;