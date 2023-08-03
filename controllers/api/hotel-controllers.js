const express = require('express');
const router = express.Router();
const { ensureAuthenticated, fetchHotelData } = require('../authController');

router.get('./api.js', ensureAuthenticated, async (req, res) => {
  try {
    const hotelData = await fetchHotelData();
    res.json(hotelData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
