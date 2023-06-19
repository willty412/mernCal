/*
Tyler Williams
CPS420
Spring 2023
*/

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
//const workoutRoutes = require('./routes/workouts');
const taskRoutes = require('./routes/tasks');
const { error } = require('console');

//express app
const app = express();

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
//app.use('/api/workouts', workoutRoutes)
app.use('/api/tasks', taskRoutes)

//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port ', process.env.PORT)
    })
    })
    .catch(error => {
        console.log(error)
    })




process.env
