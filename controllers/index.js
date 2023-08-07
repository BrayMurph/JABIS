const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
// const homeRoutes = require('./home-routes'); 
// const authRoutes = require('./authController');
// const signupRoutes = require('./signupController');

router.use('/api', apiRoutes);
// router.use('/', homeRoutes);
// router.use('/auth', authRoutes);
// router.use('/signup', signupRoutes);

module.exports = router;
