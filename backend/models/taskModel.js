/*
Tyler Williams
CPS420
Spring 2023
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const taskSchema = new Schema({ 
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        completed: {
            type: Boolean,
            required: false
        },
}, {timestamps: true})

module.exports = mongoose.model('Task', taskSchema)