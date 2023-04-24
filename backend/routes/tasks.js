const express = require('');
const {
    getTask
} = require('../controllers/taskController');
const router = express.Router();

router.get('/:id', getTask);

module.exports = router;