const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const apiRoutes = require('./api-routes');

router.use('/users', userRoutes);
router.use('/search', apiRoutes);

module.exports = router;