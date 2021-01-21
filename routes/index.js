const router = require('express').Router();
const authGuard = require('../guards/guards')

router.use('/todos', require('./todo'));
// router.use('/auth', require('./auth'))
module.exports = router;