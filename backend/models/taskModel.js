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
            required: true
        },
}, {timestamps: true})

module.exports = mongoose.model('Task', taskSchema)