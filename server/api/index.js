const express = require('express');
const router = express.Router();

router.use('/schools', require('./schools'))
router.use('/students', require('./students'))
router.use('/auth', require('./auth'));

module.exports = router;