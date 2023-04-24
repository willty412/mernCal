const Task = require('../models/taskModel');
const mongoose = require('mongoose');

const getTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "Task not found"})
    }

    const task = await Task.findById(id)
    if(!task){
        res.status(404).json({error: "Task not found"})
    }
    res.status(200).json(task)
}

module.exports = {
    getTask
}