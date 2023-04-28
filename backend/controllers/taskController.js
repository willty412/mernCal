const Task = require('../models/taskModel');
const mongoose = require('mongoose');

const getTasks = async (req, res) => {
    const tasks = await Task.find({}).sort({createdAt: -1})
    res.status(200).json(tasks)
}

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



//create a task
const createTask = async (req, res) => {
    const { title, description, startDate, completed } = req.body

    //add doc to db
    try{
        const task = await Task.create({title, description, startDate, completed})
        res.status(200).json(task)
    }catch(error){
        res.status(400).json({error: error.message})
    }


}

const deleteTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "Task not found"})
    }

    const task = await Task.findByIdAndDelete(id)
    if(!task){
        res.status(404).json({error: "Task not found"})
    }

    res.status(200).json({message: "Task deleted successfully"})
}

const updateTask = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "Task not found"})
    }

    const workout = await Task.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        res.status(404).json({error: "Task not found"})
    }

    res.status(200).json(workout)
}

module.exports = {
    getTask,
    createTask,
    getTasks,
    deleteTask,
    updateTask
}