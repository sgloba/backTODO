const router = require('express').Router();

router.use('/todos', require('./todo'));

module.exports = router;