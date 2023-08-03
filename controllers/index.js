
// const router = require('express').Router();
// const authController = require('./authController');
// const authRoute = require('./authController');

// const router = express.Router();

// module.exports = router;

const express = require('express');
const userRoutes = require('./api/user-routes');
const venueRoutes = require('./api/venue-controller'); 
const hotelRoutes = require('./api/hotel-controllers'); 

const router = express.Router();


router.use('/users', userRoutes);
router.use('/venues', venueRoutes);
router.use('/hotels', hotelRoutes);

module.exports = router;
