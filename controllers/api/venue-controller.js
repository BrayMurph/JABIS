const express = require('express');
const router = express.Router();

const { ensureAuthenticated, fetchVenueData } = require('../authController');




router.get('/api/Venues', async (req, res) => {
  try {
    const venueData = await fetchVenueData();
    
    res.json(venueData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
