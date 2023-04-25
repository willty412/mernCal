const express = require('express');
const {
    getTask,
    createTask,
    getTasks
} = require('../controllers/taskController');
const router = express.Router();

router.get('/', getTasks);

router.get('/:id', getTask);

router.post('/', createTask);

module.exports = router;